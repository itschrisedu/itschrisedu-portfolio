import { useEffect, useRef, useState } from 'react';
import { FiX, FiDownload } from 'react-icons/fi';

export default function CvModal({ isOpen, onClose, pdfUrl }) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, []);

  const triggerDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = '';
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleDownload = () => {
    if (isDownloading) {
      return;
    }

    const durationMs = 2000;
    const stepMs = 40;
    let elapsedMs = 0;

    setIsDownloading(true);
    setDownloadProgress(0);

    intervalRef.current = window.setInterval(() => {
      elapsedMs += stepMs;
      const progress = Math.min(100, Math.round((elapsedMs / durationMs) * 100));
      setDownloadProgress(progress);

      if (progress >= 100) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
        triggerDownload();

        window.setTimeout(() => {
          setIsDownloading(false);
          setDownloadProgress(0);
        }, 250);
      }
    }, stepMs);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div className="modal-panel" onClick={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <div>
            <p className="eyebrow">Previsualización CV</p>
            <h3>Christopher Paucar</h3>
          </div>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Cerrar">
            <FiX />
          </button>
        </div>

        <div className="modal-preview">
          <iframe src={pdfUrl} title="Previsualización del CV" />
        </div>

        <div className="modal-actions">
          <button
            type="button"
            className={`btn btn-primary btn-download ${isDownloading ? 'is-downloading' : ''}`}
            onClick={handleDownload}
            disabled={isDownloading}
            style={{ '--download-progress': `${downloadProgress}%` }}
            aria-live="polite"
          >
            {isDownloading ? `Descargando... ${downloadProgress}%` : 'Descargar PDF'} <FiDownload />
          </button>
          <button type="button" className="btn btn-ghost" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
