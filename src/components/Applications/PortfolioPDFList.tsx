import { useWindows } from "../../context/WindowContext";
import PDFViewer from "./PDFViewer";
import "./PortfolioBlogList.css";

function PortfolioPDFList() {
  const { dispatch } = useWindows();

  const pdfFiles = import.meta.glob<{ default: string }>(
    "../../content/blog/*.pdf",
    { query: "?url", eager: true },
  );

  const posts = Object.keys(pdfFiles).map((path) => {
    const fileName = path.split("/").pop() || "";
    const title = fileName.replace(/\.pdf$/, "").replace(/[-_]/g, " ");
    return {
      fileName,
      title: title.charAt(0).toUpperCase() + title.slice(1),
    };
  });

  return (
    <div className="portfolio-blog-list">
      {posts.length === 0 ? (
        <p style={{ padding: "10px" }}>No Posts found.</p>
      ) : (
        posts.map((post) => (
          <div
            key={post.fileName}
            className="file-item"
            style={{
              textAlign: "center",
              width: "90px",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            onDoubleClick={(e) => {
              e.stopPropagation();
              dispatch({
                type: "OPEN_WINDOW",
                payload: {
                  id: `pdf-${post.fileName}`,
                  title: `${post.title} - PDF Viewer`,
                  content: <PDFViewer fileName={post.fileName} />,
                },
              });
            }}
          >
            <span style={{ fontSize: "28px" }}>
              {/* Change icon asset path if you have a specific PDF icon */}
              <img
                src="assets/icons/message_file-0.png"
                width="32"
                height="32"
                alt="PDF File"
              />
            </span>
            <p style={{ margin: "4px 0 0 0", fontSize: "11px" }}>
              {post.fileName}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default PortfolioPDFList;
