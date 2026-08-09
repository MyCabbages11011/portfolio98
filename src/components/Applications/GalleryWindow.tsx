import { useWindows } from "../../context/WindowContext";
import ImageViewerWindow from "./ImageViewerWindow";
import "./GalleryWindow.css";

interface GalleryImage {
    fileName: string;
    src: string;
    caption: string;
}

function GalleryWindow() {
    const { dispatch } = useWindows();

    // Dynamically load images from src/content/gallery/
    const imageModules = import.meta.glob<{ default: string }>("../../content/gallery/*.{png,jpg,jpeg,svg}", { eager: true });
    
    const images: GalleryImage[] = Object.entries(imageModules).map(([path, module]) => {
        const fullFileName = path.split("/").pop() || "";
        const nameWithoutExt = fullFileName.split(".")[0] || "";
        const caption = nameWithoutExt.replace(/[-_]/g, " ");
        
        return {
            fileName: fullFileName,
            src: module.default,
            caption: caption.charAt(0).toUpperCase() + caption.slice(1),
        };
    });

    return (
        <div className="win98-gallery">
            {images.length === 0 ? (
                <p style={{ padding: "10px" }}>No pictures found in gallery folder.</p>
            ) : (
                images.map((img, index) => (
                    <div 
                        key={index} 
                        className="gallery-card"
                        onDoubleClick={(e) => {
                            e.stopPropagation();
                            dispatch({
                                type: "OPEN_WINDOW",
                                payload: {
                                    id: `gallery-image-${img.fileName}`,
                                    title: `${img.caption} - Image Viewer`,
                                    content: <ImageViewerWindow src={img.src} alt={img.caption} />
                                }
                            });
                        }}
                    >
                        <div className="gallery-image-frame">
                            <img src={img.src} alt={img.caption} />
                        </div>
                        <span className="gallery-caption">{img.caption}</span>
                    </div>
                ))
            )}
        </div>
    );
}

export default GalleryWindow;