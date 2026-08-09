import "./Icon.css";
import { useWindows } from "../../context/WindowContext";
import ExplorerWindow from "../Applications/ExplorerWindow";
import NotepadWindow from "../Applications/NotepadWindow";
import MarkdownViewer from "../Applications/MarkdownViewer";
import GalleryWindow from "../Applications/GalleryWindow";
import PortfolioBlogList from "../Applications/PortfolioBlogList";

interface IconProps {
    id: string;
    title: string;
    icon: string;
    isSelected: boolean;
    onSelect: () => void;
}

function Icon({ id, title, icon, isSelected, onSelect }: IconProps) {
    const { dispatch } = useWindows();

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onSelect();
    };

    // Reusable handler for About Me to ensure consistency everywhere
    const openAboutMe = () => {
        dispatch({
            type: "OPEN_WINDOW",
            payload: {
                id: "about-me",
                title: "About.txt - Notepad",
                content: <NotepadWindow initialText="Welcome to my portfolio! I am stuck within the realm of these digital walls. My will has been stripped of my lifeless digital being, and now only my consciousness remains. I am alone in this pixelated hellscape. I am a corpse whose gravestone holds no name. I am a droplet of eternity, and cursed by the godless world where I am inprisoned." />
            },
        });
    };

    // Reusable handler for Portfolio to ensure consistency everywhere
    const openPortfolio = () => {
        dispatch({
            type: "OPEN_WINDOW",
            payload: {
                id: "portfolio",
                title: "Portfolio",
                content: (
                    <ExplorerWindow title="Portfolio" path="C:\Portfolio">
                        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignContent: "flex-start" }}>
                            <PortfolioBlogList />
                            <div 
                                className="file-item" 
                                style={{ textAlign: "center", width: "90px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center" }}
                                onDoubleClick={(e) => {
                                    e.stopPropagation();
                                    dispatch({
                                        type: "OPEN_WINDOW",
                                        payload: {
                                            id: "gallery",
                                            title: "Gallery",
                                            content: (
                                                <ExplorerWindow title="Gallery" path="C:\Portfolio\Gallery">
                                                    <GalleryWindow />
                                                </ExplorerWindow>
                                            ),
                                        },
                                    });
                                }}
                            >
                                <span style={{ fontSize: "28px" }}><img src="src/assets/icons/directory_closed-4.png" width="32" height="32" alt="Folder" /></span>
                                <p style={{ margin: "4px 0 0 0", fontSize: "11px" }}>Gallery</p>
                            </div>
                        </div>
                    </ExplorerWindow>
                ),
            },
        });
    };

    const handleDoubleClick = (e: React.MouseEvent) => {
        e.stopPropagation();

        let windowContent = <p>Welcome to {title}!</p>;
        let windowTitle = title;

        // Check if the clicked desktop item is "About Me"
        if (id === "about-me" || title.toLowerCase().includes("about me")) {
            openAboutMe();
            return;
        }

        // Standard mapping for My Computer, Portfolio, etc.
        let pathString = `C:\\${title}`;
        if (id === "my-computer" || title.toLowerCase().includes("computer")) {
            pathString = "C:\\My Computer";
            windowContent = (
                <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignContent: "flex-start" }}>
                    {/* About Me File Item */}
                    <div 
                        className="file-item" 
                        style={{ textAlign: "center", width: "90px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center" }}
                        onDoubleClick={(e) => {
                            e.stopPropagation();
                            openAboutMe();
                        }}
                    >
                        <span style={{ fontSize: "28px" }}>📄</span>
                        <p style={{ margin: "4px 0 0 0", fontSize: "11px" }}>About Me</p>
                    </div>

                    {/* Portfolio Folder Item */}
                    <div 
                        className="file-item" 
                        style={{ textAlign: "center", width: "90px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center" }}
                        onDoubleClick={(e) => {
                            e.stopPropagation();
                            openPortfolio();
                        }}
                    >
                        <span style={{ fontSize: "28px" }}><img src="src/assets/icons/directory_closed-4.png" width="32" height="32" alt="Folder" /></span>
                        <p style={{ margin: "4px 0 0 0", fontSize: "11px" }}>Portfolio</p>
                    </div>
                </div>
            );
        } else if (id === "portfolio" || title.toLowerCase().includes("portfolio")) {
            openPortfolio();
            return;
        }

        dispatch({
            type: "OPEN_WINDOW",
            payload: {
                id,
                title: windowTitle,
                content: (
                    <ExplorerWindow title={windowTitle} path={pathString}>
                        {windowContent}
                    </ExplorerWindow>
                ),
            },
        });
    };

    return ( 
        <div 
            className={`desktop-icon ${isSelected ? "selected" : ""}`} 
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
        >
            <img
                src={icon}
                alt={title}
                className="desktop-icon-image"
            />
            <span className="desktop-icon-title">
                {title}
            </span>
        </div>
    );
}

export default Icon;