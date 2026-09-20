import { useState } from "react";
import "./Desktop.css";
import Taskbar from "../Taskbar/Taskbar";
import Icon from "../Icon/Icon";
import desktopIcons from "../../data/desktopIcons";
import Window from "../Window/Window";
import { useWindows } from "../../context/WindowContext";

function Desktop() {
  const { windows } = useWindows();
  const [selectedIconId, setSelectedIconId] = useState<string | null>(null);

  // Clicking the background deselects any highlighted icon
  const handleDesktopClick = () => {
    setSelectedIconId(null);
  };

  return (
    <main className="desktop" onClick={handleDesktopClick}>
      <div className="desktop-icons">
        {desktopIcons.map((icon) => (
          <Icon
            key={String(icon.id)}
            id={String(icon.id)}
            title={icon.title}
            icon={icon.icon}
            isSelected={selectedIconId === String(icon.id)}
            onSelect={() => setSelectedIconId(String(icon.id))}
          />
        ))}
      </div>

      {windows.map((win) => (
        <div
          key={win.id}
          style={{ zIndex: win.zIndex, position: "absolute", top: 0, left: 0 }}
        >
          <Window
            id={win.id}
            title={win.title}
            minimized={win.minimized ?? false}
            maximized={win.maximized ?? false}
          >
            {win.content}
          </Window>
        </div>
      ))}

      <Taskbar />
    </main>
  );
}

export default Desktop;
