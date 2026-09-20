import { useState } from "react";
import "./ExplorerWindow.css";

interface ExplorerWindowProps {
  title: string;
  path: string;
  children: React.ReactNode;
  // Optional map of path strings to custom React components/views for subfolders
  subfolderViews?: Record<string, React.ReactNode>;
}

function ExplorerWindow({
  title,
  path: initialPath,
  children,
  subfolderViews = {},
}: ExplorerWindowProps) {
  const [history, setHistory] = useState<string[]>([initialPath]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const currentPath = history[currentIndex];

  // Determine what content to display based on the active path
  let activeContent = children;
  if (currentPath !== initialPath && subfolderViews[currentPath]) {
    activeContent = subfolderViews[currentPath];
  }

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleForward = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleUp = () => {
    const segments = currentPath.split("\\");
    if (segments.length > 1) {
      segments.pop();
      const parentPath = segments.join("\\") || "C:\\";

      // Push parent path into history stack
      const newHistory = history.slice(0, currentIndex + 1);
      newHistory.push(parentPath);
      setHistory(newHistory);
      setCurrentIndex(newHistory.length - 1);
    }
  };

  return (
    <div className="explorer-container">
      <div className="explorer-menubar">
        <span>
          <u>F</u>ile
        </span>
        <span>
          <u>E</u>dit
        </span>
        <span>
          <u>V</u>iew
        </span>
        <span>
          <u>G</u>o
        </span>
        <span>
          F<u>a</u>vorites
        </span>
        <span>
          <u>T</u>ools
        </span>
        <span>
          <u>H</u>elp
        </span>
      </div>

      <div className="explorer-toolbar">
        <button
          className="tb-btn"
          onClick={handleBack}
          disabled={currentIndex === 0}
        >
          <span className="tb-arrow">
            <img
              src="${import.meta.env.BASE_URL}src/public/assets/icons/browse-left-arrow.png"
              alt="Back"
            />
          </span>{" "}
          Back
        </button>
        <button
          className="tb-btn"
          onClick={handleForward}
          disabled={currentIndex === history.length - 1}
        >
          <span className="tb-arrow">
            <img
              src="${import.meta.env.BASE_URL}src/public/assets/icons/browse-right-arrow.png"
              alt="Forward"
            />
          </span>{" "}
          Forward
        </button>
        <div className="tb-separator" />
        <button
          className="tb-btn"
          onClick={handleUp}
          disabled={currentPath === "C:\\" || currentPath === "C:"}
        >
          <span className="tb-icon">
            <img src="src/assets/icons/browse-directory-up.png" alt="Up" />
          </span>{" "}
          Up
        </button>
        <div className="tb-separator" />
        <button className="tb-btn">
          <span className="tb-icon">
            <img src="src/assets/icons/browse-scissor.png" alt="Cut" />
          </span>
          Cut
        </button>
        <button className="tb-btn">
          <span className="tb-icon">
            <img src="src/assets/icons/browse-copy.png" alt="Copy" />
          </span>
          Copy
        </button>
        <button className="tb-btn">
          <span className="tb-icon">
            <img src="src/assets/icons/browse-paste.png" alt="Paste" />
          </span>
          Paste
        </button>
        <div className="tb-separator" />
        <button className="tb-btn">
          <span className="tb-icon">
            <img src="src/assets/icons/browse-undo.png" alt="Undo" />
          </span>
          Undo
        </button>
        <div className="tb-separator" />
        <button className="tb-btn">
          <span className="tb-icon">
            <img src="src/assets/icons/browse-delete.png" alt="Delete" />
          </span>
          Delete
        </button>
        <button className="tb-btn">
          <span className="tb-icon">
            <img
              src="src/assets/icons/browse-properties.png"
              alt="Properties"
            />
          </span>
          Properties
        </button>
        <div className="tb-separator" />
        <button className="tb-btn">
          <span className="tb-icon">
            <img src="src/assets/icons/browse-views.png" alt="Views" />
          </span>
          Views ▾
        </button>
      </div>
      <div className="explorer-addressbar">
        <span className="address-label">Address</span>
        <div className="address-input-container">
          <span className="folder-mini-icon">
            <img
              src="src/assets/icons/directory_closed-4.png"
              width="16"
              height="16"
              alt="Folder"
            />
          </span>
          <span className="address-text">{currentPath}</span>
        </div>
      </div>

      {/* Main Content Area with Left Banner */}
      <div className="explorer-body">
        <div className="explorer-sidebar">
          <div className="sidebar-title-block">
            <span className="sidebar-folder-icon">
              <img
                src="src/assets/icons/directory_closed-4.png"
                width="32"
                height="32"
                alt="Folder"
              />
            </span>
            <h2>{title}</h2>
          </div>
          <div className="sidebar-gradient-line" />
          <p className="sidebar-helper-text">
            Select an item to view its description.
          </p>
        </div>
        <div className="explorer-content-grid">{activeContent}</div>
      </div>

      {/* Status Bar */}
      <div className="explorer-statusbar">
        <div className="status-section main-status">3 object(s)</div>
        <div className="status-section zone-status">{title}</div>
      </div>
    </div>
  );
}

export default ExplorerWindow;
