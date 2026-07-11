import { CheckCircle, XCircle, X } from "lucide-react";

import { type ToastContainerProps } from "../../types/toast";

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed top-4 right-4 z-50 flex flex-col gap-2"
      aria-live="polite"
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role="alert"
          className={[
            "flex items-center gap-3 rounded-lg px-4 py-3 shadow-lg min-w-65 max-w-xs",
            "animate-in slide-in-from-right-4 fade-in duration-200",
            toast.type === "success"
              ? "bg-(--color-success) text-white"
              : "bg-(--color-danger) text-white",
          ].join(" ")}
        >
          {toast.type === "success" ? (
            <CheckCircle size={17} className="shrink-0" aria-hidden="true" />
          ) : (
            <XCircle size={17} className="shrink-0" aria-hidden="true" />
          )}
          <p className="flex-1 text-sm font-medium">{toast.message}</p>
          <button
            onClick={() => onDismiss(toast.id)}
            className="shrink-0 opacity-70 hover:opacity-100 transition-opacity"
            aria-label="Dismiss notification"
          >
            <X size={15} />
          </button>
        </div>
      ))}
    </div>
  );
}
