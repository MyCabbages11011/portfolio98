import { useState, useEffect } from "react";
import { useWindows } from "../../context/WindowContext";
import "./Taskbar.css";

function Taskbar() {
  const { windows, dispatch } = useWindows();
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const ampm = hours >= 12 ? "PM" : "AM";

      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

      setTime(`${hours}:${formattedMinutes}:${formattedSeconds} ${ampm}`);
    };

    updateClock(); // Set immediately on mount
    const timer = setInterval(updateClock, 1000); // Update every second

    return () => clearInterval(timer);
  }, []);

  const handleTaskClick = (id: string, minimized?: boolean) => {
    if (minimized) {
      dispatch({ type: "TOGGLE_MINIMIZE", payload: id });
      dispatch({ type: "FOCUS_WINDOW", payload: id });
    } else {
      const maxZ = Math.max(...windows.map((w) => w.zIndex), 0);
      const isTop = windows.find((w) => w.id === id)?.zIndex === maxZ;

      if (isTop) {
        dispatch({ type: "TOGGLE_MINIMIZE", payload: id });
      } else {
        dispatch({ type: "FOCUS_WINDOW", payload: id });
      }
    }
  };

  return (
    <footer className="taskbar">
      <button className="start-button">Start</button>

      <div className="taskbar-tasks">
        {windows.map((win) => {
          const maxZ = Math.max(...windows.map((w) => w.zIndex), 0);
          const isActive = win.zIndex === maxZ && !win.minimized;

          return (
            <button
              key={win.id}
              className={`taskbar-task-button ${isActive ? "active" : ""}`}
              onClick={() => handleTaskClick(win.id, win.minimized ?? false)}
            >
              {win.title}
            </button>
          );
        })}
      </div>

      <div className="taskbar-spacer" />

      <div className="clock">{time}</div>
    </footer>
  );
}

export default Taskbar;
