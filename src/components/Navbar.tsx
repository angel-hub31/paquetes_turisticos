import React from 'react';
import type { NavigationTab } from '../types';

import { Compass, Bus, QrCode, ShieldCheck, Smartphone, Monitor } from 'lucide-react';

interface NavbarProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  ticketCount: number;
  isMobilePreview: boolean;
  setIsMobilePreview: React.Dispatch<React.SetStateAction<boolean>>;
  onInstallPwa: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  ticketCount,
  isMobilePreview,
  setIsMobilePreview,
  onInstallPwa,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0D5FA6] text-white shadow-md transition-all border-b border-[#2180A6]/30">
      {/* Upper Brand Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div 
          onClick={() => setActiveTab('packages')} 
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-white text-[#0D5FA6] flex items-center justify-center font-bold text-xl shadow-md group-hover:scale-105 transition-transform border-2 border-[#4BBF9E]">
            🚌
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-white drop-shadow-sm">
                Movilis<span className="text-[#4BBF9E]">Turismo</span>
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#37A6A6] text-white uppercase tracking-wider">
                EC
              </span>
            </div>
            <p className="text-xs text-blue-100/80 font-medium hidden sm:block">
              Transporte e Itinerarios Turísticos de Ecuador
            </p>
          </div>
        </div>

        {/* Action Controls & View Mode Toggle */}
        <div className="flex items-center gap-2">
          {/* PWA Install Button */}
          <button
            onClick={onInstallPwa}
            className="hidden md:flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#37A6A6] hover:bg-[#2180A6] text-white transition-colors shadow-sm"
            title="Instalar como App nativa (PWA)"
          >
            <Smartphone className="w-4 h-4 text-[#4BBF9E]" />
            <span>Instalar PWA</span>
          </button>

          {/* Toggle Device Frame Preview Mode */}
          <button
            onClick={() => setIsMobilePreview(!isMobilePreview)}
            className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg bg-[#2180A6] hover:bg-[#37A6A6] text-white transition-colors border border-white/20"
            title={isMobilePreview ? "Cambiar a Vista Pantalla Completa" : "Simular Vista Móvil PWA"}
          >
            {isMobilePreview ? (
              <>
                <Monitor className="w-4 h-4 text-[#4BBF9E]" />
                <span className="hidden sm:inline">Vista Web</span>
              </>
            ) : (
              <>
                <Smartphone className="w-4 h-4 text-[#4BBF9E]" />
                <span className="hidden sm:inline">Vista Móvil</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Desktop Main Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 border-t border-[#2180A6]/40 hidden md:block">
        <nav className="flex items-center gap-1">
          <button
            onClick={() => setActiveTab('packages')}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-all ${
              activeTab === 'packages'
                ? 'border-[#4BBF9E] text-white bg-[#2180A6]/30'
                : 'border-transparent text-blue-100 hover:text-white hover:bg-[#2180A6]/20'
            }`}
          >
            <Compass className="w-4 h-4 text-[#4BBF9E]" />
            Explorar Paquetes y Rutas
          </button>

          <button
            onClick={() => setActiveTab('rental')}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-all ${
              activeTab === 'rental'
                ? 'border-[#4BBF9E] text-white bg-[#2180A6]/30'
                : 'border-transparent text-blue-100 hover:text-white hover:bg-[#2180A6]/20'
            }`}
          >
            <Bus className="w-4 h-4 text-[#4BBF9E]" />
            Renta de Transporte Privado
          </button>

          <button
            onClick={() => setActiveTab('tickets')}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-all relative ${
              activeTab === 'tickets'
                ? 'border-[#4BBF9E] text-white bg-[#2180A6]/30'
                : 'border-transparent text-blue-100 hover:text-white hover:bg-[#2180A6]/20'
            }`}
          >
            <QrCode className="w-4 h-4 text-[#4BBF9E]" />
            Mis Tickets Digitales
            {ticketCount > 0 && (
              <span className="ml-1 px-1.5 py-0.5 text-xs font-bold rounded-full bg-[#4BBF9E] text-[#0D5FA6] shadow-sm">
                {ticketCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('operator')}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-all ml-auto ${
              activeTab === 'operator'
                ? 'border-[#4BBF9E] text-white bg-[#37A6A6]'
                : 'border-transparent text-blue-100 hover:text-white hover:bg-[#37A6A6]/40'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-[#4BBF9E]" />
            Panel Operativo / Abordaje
          </button>
        </nav>
      </div>

      {/* Mobile Bottom Navigation Bar (Fixed PWA style) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0D5FA6] border-t border-[#2180A6]/40 px-2 py-1.5 shadow-lg flex justify-around items-center">
        <button
          onClick={() => setActiveTab('packages')}
          className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
            activeTab === 'packages' ? 'text-[#4BBF9E] font-bold bg-[#2180A6]/40' : 'text-blue-100'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span>Explorar</span>
        </button>

        <button
          onClick={() => setActiveTab('rental')}
          className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
            activeTab === 'rental' ? 'text-[#4BBF9E] font-bold bg-[#2180A6]/40' : 'text-blue-100'
          }`}
        >
          <Bus className="w-5 h-5" />
          <span>Alquilar</span>
        </button>

        <button
          onClick={() => setActiveTab('tickets')}
          className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg text-xs font-medium transition-colors relative ${
            activeTab === 'tickets' ? 'text-[#4BBF9E] font-bold bg-[#2180A6]/40' : 'text-blue-100'
          }`}
        >
          <div className="relative">
            <QrCode className="w-5 h-5" />
            {ticketCount > 0 && (
              <span className="absolute -top-1 -right-2 px-1 text-[10px] font-bold rounded-full bg-[#4BBF9E] text-[#0D5FA6]">
                {ticketCount}
              </span>
            )}
          </div>
          <span>Tickets</span>
        </button>

        <button
          onClick={() => setActiveTab('operator')}
          className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
            activeTab === 'operator' ? 'text-[#4BBF9E] font-bold bg-[#37A6A6]' : 'text-blue-100'
          }`}
        >
          <ShieldCheck className="w-5 h-5" />
          <span>Operador</span>
        </button>
      </div>
    </header>
  );
};
