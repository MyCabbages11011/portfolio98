import "./ImageViewerWindow.css";

interface ImageViewerWindowProps {
    src: string;
    alt: string;
}

function ImageViewerWindow({ src, alt }: ImageViewerWindowProps) {
    return (
        <div className="image-viewer-container">
            <div className="image-viewer-inner">
                <img src={src} alt={alt} />
            </div>
            <div className="image-viewer-statusbar">{alt}</div>
        </div>
    );
}

export default ImageViewerWindow;