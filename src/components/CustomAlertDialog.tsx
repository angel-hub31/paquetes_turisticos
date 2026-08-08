import React from 'react';
import { X, CheckCircle2, AlertTriangle, Info, HelpCircle, ShieldCheck } from 'lucide-react';

export interface CustomAlertState {
  isOpen: boolean;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'confirm';
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

interface CustomAlertDialogProps {
  dialog: CustomAlertState;
  onClose: () => void;
}

export const CustomAlertDialog: React.FC<CustomAlertDialogProps> = ({
  dialog,
  onClose,
}) => {
  if (!dialog.isOpen) return null;

  const handleConfirm = () => {
    dialog.onConfirm?.();
    onClose();
  };

  const handleCancel = () => {
    dialog.onCancel?.();
    onClose();
  };

  const getIcon = () => {
    switch (dialog.type) {
      case 'success':
        return <CheckCircle2 className="w-8 h-8 text-[#4BBF9E]" />;
      case 'warning':
        return <AlertTriangle className="w-8 h-8 text-amber-500" />;
      case 'confirm':
        return <HelpCircle className="w-8 h-8 text-[#37A6A6]" />;
      case 'info':
      default:
        return <Info className="w-8 h-8 text-[#2180A6]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#2180A6]/30 relative text-slate-800 space-y-4 animate-scaleUp">
        {/* Header Icon */}
        <div className="flex items-start justify-between">
          <div className="w-14 h-14 rounded-2xl bg-[#F2F2F2] flex items-center justify-center border border-slate-200 shadow-sm">
            {getIcon()}
          </div>
          <button
            onClick={handleCancel}
            className="p-1.5 rounded-xl bg-[#F2F2F2] hover:bg-slate-200 text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Title & Message */}
        <div className="space-y-1.5">
          <h3 className="text-lg font-black text-[#0D5FA6]">
            {dialog.title}
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            {dialog.message}
          </p>
        </div>

        {/* Actions */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
          {dialog.type === 'confirm' && (
            <button
              onClick={handleCancel}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 bg-[#F2F2F2] hover:bg-slate-200 transition-colors border border-slate-200"
            >
              {dialog.cancelText || 'Cancelar'}
            </button>
          )}

          <button
            onClick={handleConfirm}
            className="bg-[#0D5FA6] hover:bg-[#2180A6] text-white font-extrabold px-5 py-2.5 rounded-xl text-xs transition-all shadow-md flex items-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4 text-[#4BBF9E]" />
            <span>{dialog.confirmText || 'Aceptar'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
