import "./Icon.css";
import { useWindows } from "../../context/WindowContext";
import ExplorerWindow from "../Applications/ExplorerWindow";
import NotepadWindow from "../Applications/NotepadWindow"; // Ensure you import your notepad component

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

    const handleDoubleClick = (e: React.MouseEvent) => {
        e.stopPropagation();

        let windowContent = <p>Welcome to {title}!</p>;
        let windowTitle = title;

        // Check if the clicked item is "About Me"
        if (id === "about-me" || title.toLowerCase().includes("about me")) {
            dispatch({
                type: "OPEN_WINDOW",
                payload: {
                    id: "about-me",
                    title: "About.txt - Notepad",
                    content: <NotepadWindow initialText="Welcome to my portfolio! I am stuck within the realm of these digital walls. My will has been stripped of my lifeless digital being, and now only my consciousness remains. I am alone in this pixelated hellscape. I am a corpse whose gravestone holds no name. I am a droplet of eternity, and cursed by the godless world where I am inprisoned." />
                },
            });
            return;
        }

        // Standard mapping for My Computer, Portfolio, etc.
        let pathString = `C:\\${title}`;
        if (id === "my-computer" || title.toLowerCase().includes("computer")) {
            pathString = "C:\\My Computer";
            windowContent = (
                <>
                    <div 
                        className="file-item" 
                        style={{ textAlign: "center", width: "90px", cursor: "pointer" }}
                        onDoubleClick={(e) => {
                            e.stopPropagation();
                            // If they double-click "About Me" folder/file inside My Computer
                            dispatch({
                                type: "OPEN_WINDOW",
                                payload: {
                                    id: "about-me",
                                    title: "About.txt - Notepad",
                                    content: <NotepadWindow initialText="Welcome to my portfolio! Here is some background about me." />
                                },
                            });
                        }}
                    >
                        <span style={{ fontSize: "28px" }}>📄</span>
                        <p style={{ margin: "4px 0 0 0", fontSize: "11px" }}>About Me</p>
                    </div>
                </>
            );
        } else if (id === "portfolio" || title.toLowerCase().includes("portfolio")) {
            pathString = "C:\\Portfolio";
            windowContent = (
                <>
                    <div className="file-item" style={{ textAlign: "center", width: "90px", cursor: "pointer" }}>
                        <span style={{ fontSize: "28px" }}>📄</span>
                        <p style={{ margin: "4px 0 0 0", fontSize: "11px" }}>react-guide.md</p>
                    </div>
                </>
            );
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