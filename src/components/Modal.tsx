import { ReactNode } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  onConfirm,
  confirmText = 'Confirm',
  cancelText = 'Cancel'
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-oriental-900 rounded-2xl p-6 w-full max-w-md mx-4 animate-fadeIn">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="text-gray-300 mb-6">{children}</div>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 text-white hover:from-blue-500/30 hover:via-purple-500/30 hover:to-pink-500/30 transition-all"
          >
            {cancelText}
          </button>
          {onConfirm && (
            <button
              onClick={onConfirm}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white hover:opacity-90 transition-all"
            >
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
