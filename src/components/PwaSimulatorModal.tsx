import React from 'react';
import { X, CheckCircle2, Download, Zap } from 'lucide-react';


interface PwaSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PwaSimulatorModal: React.FC<PwaSimulatorModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#2180A6]/30 relative space-y-5 text-slate-800">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-[#0D5FA6] text-white mx-auto flex items-center justify-center text-3xl font-extrabold shadow-lg border-2 border-[#4BBF9E]">
            🚌
          </div>
          <span className="text-xs font-extrabold text-[#37A6A6] uppercase tracking-wider block">
            Progressive Web App (PWA) Ecuador
          </span>
          <h3 className="text-xl font-black text-slate-900">
            Instalar Movilis Turismo PWA
          </h3>
          <p className="text-xs text-slate-600">
            Añada la app a la pantalla de inicio de su teléfono celular para acceder a sus billetes sin conexión a Internet.
          </p>
        </div>

        <div className="bg-[#F2F2F2] p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
          <h4 className="font-bold text-[#0D5FA6] uppercase tracking-wider flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-[#4BBF9E]" /> Beneficios Clave PWA:
          </h4>
          <ul className="space-y-1.5 text-slate-700 font-semibold">
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#4BBF9E]" />
              Visualización de QR 100% Offline (RF-04 / RF-05)
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#4BBF9E]" />
              Abordaje directo en paradas intermedias (RF-06)
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#4BBF9E]" />
              Sin consumir almacenamiento nativo pesado
            </li>
          </ul>
        </div>

        <div className="pt-2 space-y-2">
          <button
            onClick={() => {
              alert('¡Aplicación Movilis Turismo PWA agregada a tu pantalla de inicio con éxito!');
              onClose();
            }}
            className="w-full bg-[#0D5FA6] hover:bg-[#2180A6] text-white font-extrabold py-3 rounded-xl text-sm transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4 text-[#4BBF9E]" />
            <span>Agregar a Pantalla de Inicio (Instalar)</span>
          </button>

          <button
            onClick={onClose}
            className="w-full text-xs font-bold text-slate-500 hover:text-slate-700 py-1"
          >
            Continuar navegando en navegador
          </button>
        </div>
      </div>
    </div>
  );
};
