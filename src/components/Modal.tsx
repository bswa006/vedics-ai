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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-[#1a1b26]/80 backdrop-blur-sm" onClick={onClose} />
      <div 
        className="relative w-full max-w-md overflow-hidden rounded-2xl bg-gradient-to-b from-[#1f1d3d]/95 to-[#1a1b26]/95 p-6 shadow-xl backdrop-blur-xl animate-fadeIn"
        style={{
          transform: 'translate3d(0, 0, 0)',
          backfaceVisibility: 'hidden',
        }}
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-pink-500/10 animate-gradient" />
        
        {/* Glass effect overlay */}
        <div className="absolute inset-0 backdrop-blur-[1px]" />
        
        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <h2 className="bg-gradient-to-r from-purple-200 via-blue-200 to-indigo-200 bg-clip-text text-xl font-semibold text-transparent">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="my-4 text-base text-gray-300/90">{children}</div>
          
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="group relative overflow-hidden rounded-lg bg-white/5 px-4 py-2 text-sm font-medium text-gray-300 transition-all hover:bg-white/10 hover:text-white"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-pink-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
              <span className="relative">{cancelText}</span>
            </button>
            
            {onConfirm && (
              <button
                onClick={onConfirm}
                className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-[#7F7ACA] via-[#6B8DE6] to-[#8B7FCA] px-4 py-2 text-sm font-medium text-white transition-all hover:opacity-90"
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity group-hover:opacity-100" />
                <span className="relative">{confirmText}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
