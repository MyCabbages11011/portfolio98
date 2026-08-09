import { useState, useEffect } from "react";
import { marked } from "marked";
import "./MarkdownViewer.css";

interface MarkdownViewerProps {
    fileName: string;
}

function MarkdownViewer({ fileName }: MarkdownViewerProps) {
    const [content, setContent] = useState<string>("Loading...");

    useEffect(() => {
        // Dynamically load markdown files from src/content/blog/
        const loadMarkdown = async () => {
            try {
                const files = import.meta.glob<{ default: string }>("../../content/blog/*.md", { query: "?raw", eager: true });
                const matchingPath = Object.keys(files).find((path) => path.endsWith(fileName));
                
                if (matchingPath && files[matchingPath]) {
                    const rawMarkdown = files[matchingPath].default;
                    const parsedHtml = await marked.parse(rawMarkdown);
                    setContent(parsedHtml);
                } else {
                    setContent("<p>File not found.</p>");
                }
            } catch (err) {
                setContent("<p>Error loading markdown file.</p>");
            }
        };

        loadMarkdown();
    }, [fileName]);

    return (
        <div className="markdown-container">
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    );
}

export default MarkdownViewer;