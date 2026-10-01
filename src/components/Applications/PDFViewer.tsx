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
  const [pageNumber, setPageNumber] = useState<number>(1);
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
    setPageNumber(1);
  }

  if (loadingError || !pdfUrl) {
    return (
      <div className="pdf-container">
        <p>PDF file not found or failed to load.</p>
      </div>
    );
  }

  return (
    <div className="pdf-container">
      <Document
        file={pdfUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={<p>Loading PDF...</p>}
      >
        <Page
          pageNumber={pageNumber}
          renderTextLayer={true}
          renderAnnotationLayer={true}
        />
      </Document>

      {numPages && (
        <div className="pdf-controls">
          <button
            disabled={pageNumber <= 1}
            onClick={() => setPageNumber((prev) => prev - 1)}
          >
            Previous
          </button>
          <span>
            Page {pageNumber} of {numPages}
          </span>
          <button
            disabled={pageNumber >= numPages}
            onClick={() => setPageNumber((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default PDFViewer;
