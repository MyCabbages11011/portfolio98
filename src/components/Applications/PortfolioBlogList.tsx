import { useWindows } from "../../context/WindowContext";
import MarkdownViewer from "./MarkdownViewer";
import "./PortfolioBlogList.css";

function PortfolioBlogList() {
    const { dispatch } = useWindows();

    // Dynamically load all markdown files from src/content/blog/
    const blogFiles = import.meta.glob<{ default: string }>("../../content/blog/*.md", { query: "?raw", eager: true });

    const posts = Object.keys(blogFiles).map((path) => {
        const fileName = path.split("/").pop() || "";
        const title = fileName.replace(/\.md$/, "").replace(/[-_]/g, " ");
        return {
            fileName,
            title: title.charAt(0).toUpperCase() + title.slice(1),
        };
    });

    return (
        <div className="portfolio-blog-list">
            {posts.length === 0 ? (
                <p style={{ padding: "10px" }}>No markdown posts found.</p>
            ) : (
                posts.map((post) => (
                    <div 
                        key={post.fileName} 
                        className="file-item" 
                        style={{ textAlign: "center", width: "90px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center" }}
                        onDoubleClick={(e) => {
                            e.stopPropagation();
                            dispatch({
                                type: "OPEN_WINDOW",
                                payload: {
                                    id: `blog-${post.fileName}`,
                                    title: `${post.fileName} - Viewer`,
                                    content: <MarkdownViewer fileName={post.fileName} />
                                },
                            });
                        }}
                    >
                        <span style={{ fontSize: "28px" }}><img src="src\assets\icons\message_file-0.png" width="32" height="32" alt="Folder" /></span>
                        <p style={{ margin: "4px 0 0 0", fontSize: "11px" }}>{post.fileName}</p>
                    </div>
                ))
            )}
        </div>
    );
}

export default PortfolioBlogList;