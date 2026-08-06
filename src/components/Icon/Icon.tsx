import "./Icon.css";
import { useWindows } from "../../context/WindowContext";

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
        e.stopPropagation(); // Prevent desktop click handler from immediately clearing selection
        onSelect();
    };

    const handleDoubleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        dispatch({
            type: "OPEN_WINDOW",
            payload: {
                id,
                title,
                content: <p>Welcome to {title}!</p>, 
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