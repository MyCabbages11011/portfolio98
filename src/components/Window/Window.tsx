import { useRef } from "react";
import Draggable from "react-draggable";
import "./Window.css";
import { useWindows } from "../../context/WindowContext";

interface WindowProps {
  id: string;
  title: string;
  minimized?: boolean;
  maximized?: boolean;
  children: React.ReactNode;
}

function Window({ id, title, minimized, maximized, children }: WindowProps) {
  const { dispatch } = useWindows();
  const nodeRef = useRef<HTMLElement>(null);

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({ type: "CLOSE_WINDOW", payload: id });
  };

  const handleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({ type: "TOGGLE_MINIMIZE", payload: id });
  };

  const handleMaximize = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({ type: "TOGGLE_MAXIMIZE", payload: id });
  };

  const handleFocus = () => {
    dispatch({ type: "FOCUS_WINDOW", payload: id });
  };

  if (minimized) return null;

  // The window markup content shared whether maximized or not
  const windowElement = (
    <section
      ref={nodeRef}
      className={`window ${maximized ? "maximized" : ""}`}
      onPointerDown={handleFocus}
    >
      <header className="window-titlebar">
        <div className="window-title">{title}</div>
        <div className="window-controls">
          <button
            className="window-button"
            aria-label="Minimize"
            onClick={handleMinimize}
          >
            _
          </button>
          <button
            className="window-button"
            aria-label={maximized ? "Restore" : "Maximize"}
            onClick={handleMaximize}
          >
            {maximized ? "❐" : "□"}
          </button>
          <button
            className="window-button"
            aria-label="Close"
            onClick={handleClose}
          >
            ✕
          </button>
        </div>
      </header>
      <main className="window-content">{children}</main>
    </section>
  );

  // If maximized, render without Draggable wrapper so it cleanly fills the screen area.
  // When not maximized, wrap it in Draggable normally.
  if (maximized) {
    return windowElement;
  }

  return (
    <Draggable
      nodeRef={nodeRef}
      handle=".window-titlebar"
      onMouseDown={handleFocus}
    >
      {windowElement}
    </Draggable>
  );
}

export default Window;
