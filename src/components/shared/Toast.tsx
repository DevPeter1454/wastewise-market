import { useEffect } from "react";
import Icon from "./Icon";

interface ToastProps {
  message: string;
  icon?: string;
  visible: boolean;
  onClose: () => void;
  duration?: number;
}

export default function Toast({
  message,
  icon = "check_circle",
  visible,
  onClose,
  duration = 3000,
}: ToastProps) {
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [visible, onClose, duration]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-28 lg:bottom-8 left-1/2 -translate-x-1/2 z-50 animate-slide-up">
      <div className="flex items-center gap-3 bg-inverse-surface text-inverse-on-surface px-6 py-4 rounded-2xl shadow-lg min-w-[280px]">
        <Icon name={icon} filled className="text-primary-fixed shrink-0" />
        <span className="font-medium text-sm">{message}</span>
      </div>
    </div>
  );
}
