export type ToastType = "success" | "error";

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

export interface ToastContextType {
  showToast: (message: string, type: ToastType) => void;
}

export interface ToastContainerProps {
  toasts: Toast[];
  onDismiss: (id: number) => void;
}
