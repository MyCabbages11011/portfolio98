import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import "./PDFViewer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  `pdfjs-dist/build/pdf.worker.min.mjs`,
  import.meta.url,
).toString();

interface PDFViewerProps {
  fileName: string;
}

function PDFViewer({ fileName }: PDFViewerProps) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [loadingError, setLoadingError] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    try {
      const files = import.meta.glob<{ default: string }>(
        "../../content/blog/*.pdf",
        {
          query: "?url",
          eager: true,
        },
      );

      const matchingPath = Object.keys(files).find((path) =>
        path.endsWith(fileName),
      );

      if (matchingPath && files[matchingPath]) {
        setPdfUrl(files[matchingPath].default);
        setLoadingError(false);
      } else {
        setPdfUrl(null);
        setLoadingError(true);
      }
    } catch (err) {
      setLoadingError(true);
    }
  }, [fileName]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  if (loadingError || !pdfUrl) {
    return (
      <div className="pdf-container">
        <p>PDF file not found or failed to load.</p>
      </div>
    );
  }

  const pdfDocumentContent = (
    <Document
      file={pdfUrl}
      onLoadSuccess={onDocumentLoadSuccess}
      loading={<p>Loading PDF...</p>}
    >
      {numPages &&
        Array.from({ length: numPages }, (_, index) => (
          <div key={`page_${index + 1}`} style={{ marginBottom: "16px" }}>
            <Page
              pageNumber={index + 1}
              renderTextLayer={true}
              renderAnnotationLayer={true}
            />
          </div>
        ))}
    </Document>
  );

  return (
    <div
      className="pdf-container"
      style={{
        overflowY: "auto",
        height: "100%",
        maxHeight: "100vh",
      }}
    >
      {isMobile ? (
        <TransformWrapper
          initialScale={1}
          minScale={0.5}
          maxScale={4}
          centerOnInit={true}
        >
          {({ resetTransform }) => (
            <>
              <div className="pdf-zoom-controls">
                <button
                  onClick={() => resetTransform()}
                  style={{ fontSize: "10px", padding: "2px 6px" }}
                >
                  Reset Zoom
                </button>
              </div>
              <TransformComponent
                wrapperStyle={{ width: "100%", height: "100%" }}
              >
                {pdfDocumentContent}
              </TransformComponent>
            </>
          )}
        </TransformWrapper>
      ) : (
        pdfDocumentContent
      )}
    </div>
  );
}

export default PDFViewer;
