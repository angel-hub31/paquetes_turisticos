import React, { useState } from 'react';
import { Smartphone, WifiOff, X, Sparkles, MapPin } from 'lucide-react';

interface PwaInstallBannerProps {
  onInstall: () => void;
}

export const PwaInstallBanner: React.FC<PwaInstallBannerProps> = ({ onInstall }) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-[#2180A6] text-white px-4 py-2.5 shadow-inner border-b border-[#37A6A6] relative">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs sm:text-sm">
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#4BBF9E]/20 text-[#4BBF9E] shrink-0 font-bold border border-[#4BBF9E]/40">
            <Smartphone className="w-4 h-4" />
          </span>
          <div>
            <span className="font-bold text-[#4BBF9E] flex items-center gap-1 inline-flex">
              <Sparkles className="w-3.5 h-3.5" /> PWA Ecosistema Ecuador:
            </span>{' '}
            Aborde en puntos intermedios y acceda a sus tickets con QR en modo{' '}
            <span className="font-semibold text-white underline underline-offset-2 flex items-center gap-1 inline-flex">
              <WifiOff className="w-3 h-3 text-[#4BBF9E]" /> Offline
            </span>{' '}
            sin pasar por terminales físicas.
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
          <button
            onClick={onInstall}
            className="bg-[#4BBF9E] hover:bg-[#37A6A6] text-[#0D5FA6] font-bold px-3 py-1 rounded-md text-xs transition-colors shadow flex items-center gap-1"
          >
            <MapPin className="w-3.5 h-3.5" />
            Probar Modo App PWA
          </button>

          <button
            onClick={() => setDismissed(true)}
            className="text-white/80 hover:text-white p-1 rounded-md transition-colors"
            title="Cerrar aviso"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
