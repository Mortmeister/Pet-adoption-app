import { type ConfirmModalProps } from "../../types/modal";

export function ConfirmModal({
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-(--color-text)/50 p-6">
      <div className="w-full max-w-110 rounded-xl bg-(--color-surface) p-8 shadow-xl">
        <h3 className="mb-3 font-semibold text-(--color-text)">{title}</h3>

        <p className="mb-6 text-[15px] text-(--color-text-muted)">{message}</p>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="btn-danger flex-1"
          >
            {loading ? "Loading..." : confirmText}
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="btn-outline flex-1"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
}
