import React, { createContext, useReducer, useContext } from "react";
import type { ReactNode } from "react";

export interface WindowData {
  id: string;
  title: string;
  content: ReactNode;
  zIndex: number;
  minimized?: boolean;
  maximized?: boolean;
}

type WindowAction =
  | { type: "OPEN_WINDOW"; payload: Omit<WindowData, "zIndex"> }
  | { type: "CLOSE_WINDOW"; payload: string }
  | { type: "FOCUS_WINDOW"; payload: string }
  | { type: "TOGGLE_MINIMIZE"; payload: string }
  | { type: "TOGGLE_MAXIMIZE"; payload: string };

interface WindowContextType {
  windows: WindowData[];
  dispatch: React.Dispatch<WindowAction>;
}

const WindowContext = createContext<WindowContextType | undefined>(undefined);

const getTopZIndex = (windows: WindowData[]) => {
  if (!Array.isArray(windows) || windows.length === 0) return 10;
  return Math.max(...windows.map((w) => w.zIndex)) + 1;
};

function windowReducer(
  state: WindowData[],
  action: WindowAction,
): WindowData[] {
  const safeState = Array.isArray(state) ? state : [];

  switch (action.type) {
    case "OPEN_WINDOW": {
      const existing = safeState.find((w) => w.id === action.payload.id);
      const nextZIndex = getTopZIndex(safeState);

      if (existing) {
        return safeState.map((w) =>
          w.id === action.payload.id
            ? { ...w, zIndex: nextZIndex, minimized: false }
            : w,
        );
      }
      return [
        ...safeState,
        {
          ...action.payload,
          zIndex: nextZIndex,
          minimized: false,
          maximized: false,
        },
      ];
    }

    case "CLOSE_WINDOW":
      return safeState.filter((w) => w.id !== action.payload);

    case "FOCUS_WINDOW": {
      const nextZIndex = getTopZIndex(safeState);
      return safeState.map((w) =>
        w.id === action.payload ? { ...w, zIndex: nextZIndex } : w,
      );
    }

    case "TOGGLE_MINIMIZE":
      return safeState.map((w) =>
        w.id === action.payload ? { ...w, minimized: !w.minimized } : w,
      );

    case "TOGGLE_MAXIMIZE":
      return safeState.map((w) =>
        w.id === action.payload ? { ...w, maximized: !w.maximized } : w,
      );

    default:
      return safeState;
  }
}

export function WindowProvider({ children }: { children: ReactNode }) {
  const [windows, dispatch] = useReducer(windowReducer, []);

  return (
    <WindowContext.Provider value={{ windows, dispatch }}>
      {children}
    </WindowContext.Provider>
  );
}

export function useWindows() {
  const context = useContext(WindowContext);
  if (!context)
    throw new Error("useWindows must be used within a WindowProvider");
  return context;
}
