import "./ExplorerWindow.css";

interface ExplorerWindowProps {
    title: string; 
    path: string;
    children: React.ReactNode;

}

function ExplorerWindow({ title, path, children }: ExplorerWindowProps) {
    return ( 
        <div className="explorer-container">
            <div className="explorer-menubar">
                <span><u>F</u>ile</span>
                <span><u>E</u>dit</span>
                <span><u>V</u>iew</span>
                <span><u>G</u>o</span>
                <span>F<u>a</u>vorites</span>
                <span><u>T</u>ools</span>
                <span><u>H</u>elp</span>
            </div>

            <div className="explorer-toolbar">
                <button className="tb-btn" disabled>
                    <span className="tb-arrow"><img src="src\assets\icons\browse-left-arrow.png"/></span> Back
                </button>
                <button className="tb-btn" disabled>
                    <span className="tb-arrow"><img src="src\assets\icons\browse-right-arrow.png"/></span> Forward
                </button>
                <div className="tb-separator" />
                <button className="tb-btn">
                    <span className="tb-icon"><img src="src\assets\icons\browse-directory-up.png"/></span> Up
                </button>
                <div className="tb-separator" />
                <button className="tb-btn">
                    <span className="tb-icon"><img src="src\assets\icons\browse-scissor.png"/></span>Cut</button>
                <button className="tb-btn">
                    <span className="tb-icon"><img src="src\assets\icons\browse-copy.png"/></span>Copy</button>
                <button className="tb-btn" >
                    <span className="tb-icon"><img src="src\assets\icons\browse-paste.png"/></span>Paste</button>
                <div className="tb-separator" />
                <button className="tb-btn">
                    <span className="tb-icon"><img src="src\assets\icons\browse-undo.png"/></span>Undo</button>
                <div className="tb-separator" />
                <button className="tb-btn">
                    <span className="tb-icon"><img src="src\assets\icons\browse-delete.png"/></span>Delete</button>
                <button className="tb-btn">
                    <span className="tb-icon"><img src="src\assets\icons\browse-properties.png"/></span>Properties</button>
                <div className="tb-separator" />
                <button className="tb-btn">
                    <span className="tb-icon"><img src="src\assets\icons\browse-views.png"/></span>Views ▾</button>
            </div>
            <div className="explorer-addressbar">
                <span className="address-label">Address</span>
                <div className="address-input-container">
                    <span className="folder-mini-icon"><img src="src\assets\icons/directory_closed-4.png" width="16" height="16"/></span>
                    <span className="address-text">{path}</span>
                </div>
            </div>

            {/* Main Content Area with Left Banner */}
            <div className="explorer-body">
                <div className="explorer-sidebar">
                    <div className="sidebar-title-block">
                        <span className="sidebar-folder-icon">📁</span>
                        <h2>{title}</h2>
                    </div>
                    <div className="sidebar-gradient-line" />
                    <p className="sidebar-helper-text">
                        Select an item to view its description.
                    </p>
                </div>
                <div className="explorer-content-grid">
                    {children}
                </div>
            </div>

            {/* Status Bar */}
            <div className="explorer-statusbar">
                <div className="status-section main-status">3 object(s)</div>
                <div className="status-section zone-status">My Computer</div>
            </div>
        </div>
    );
}

export default ExplorerWindow;