import computer from "../assets/icons/computer_explorer_cool-0.png";
import folder from "../assets/icons/directory_closed-4.png";
import notepad from "../assets/icons/notepad-4.png";
import recycleBin from "../assets/icons/recycle_bin_full-4.png";


export interface DesktopIconData {
    id: number;
    title: string;
    icon: string;
}

const desktopIcons: DesktopIconData[] = [
    {
        id: 1,
        title: "My Computer",
        icon: computer,
    },
    {
        id: 2,
        title: "Portfolio",
        icon: folder,
    },
    {
        id: 3,
        title: "About Me",
        icon: notepad,
    },
    {
        id: 4,
        title: "Recycle Bin",
        icon: recycleBin,
    },
];

export default desktopIcons;