import { createPortal } from "react-dom";
import { X, AlertCircle } from "lucide-react";
import "./ErrorModal.css";

interface ErrorModalProps {
  message: string;
  onClose: () => void;
}

export function ErrorModal({ message, onClose }: ErrorModalProps) {
  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(event) => event.stopPropagation()}>
        <div>
          <button className="" onClick={onClose}>
            <X size={18} />
          </button>

          <div className="">
            <div className="modal-icon--error">
              <AlertCircle size={28} />
            </div>
          </div>
          <h2 className="mt-4 mb-1">Something went wrong</h2>
          <p className="text-sm">
            Something went wrong. See the details below.
          </p>
        </div>

        <div className="">
          <p className="text-sm">{message}</p>
        </div>

        <button className="btn-primary w-full mt-6" onClick={onClose}>
          Go back
        </button>
      </div>
    </div>,
    document.body,
  );
}
