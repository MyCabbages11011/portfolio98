import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
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

  return (
    <div
      className="pdf-container"
      style={{ overflowY: "auto", height: "100%", maxHeight: "80vh" }}
    >
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
    </div>
  );
}

export default PDFViewer;
