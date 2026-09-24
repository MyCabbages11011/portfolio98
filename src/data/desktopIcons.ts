export interface DesktopIconData {
  id: number;
  title: string;
  icon: string;
}

const desktopIcons: DesktopIconData[] = [
  {
    id: 1,
    title: "My Computer",
    icon: `assets/icons/computer_explorer_cool-0.png`,
  },
  {
    id: 2,
    title: "Portfolio",
    icon: `assets/icons/directory_closed-4.png`,
  },
  {
    id: 3,
    title: "About Me",
    icon: `assets/icons/notepad-4.png`,
  },
  {
    id: 4,
    title: "Recycle Bin",
    icon: `assets/icons/recycle_bin_full-4.png`,
  },
];

export default desktopIcons;
