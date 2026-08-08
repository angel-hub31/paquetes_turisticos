import React, { useState } from 'react';
import type { TicketBooking } from '../types';
import { QrCode, CheckCircle, UserCheck, MapPin, Camera } from 'lucide-react';

import confetti from 'canvas-confetti';

interface OperatorScannerViewProps {
  tickets: TicketBooking[];
  onToggleStatus: (ticketId: string) => void;
}

export const OperatorScannerView: React.FC<OperatorScannerViewProps> = ({
  tickets,
  onToggleStatus,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStopFilter, setSelectedStopFilter] = useState('All');
  const [isScanning, setIsScanning] = useState(true);
  const [scanResultToast, setScanResultToast] = useState<string | null>(null);

  // Extract all unique pickup stops across tickets
  const uniqueStops = Array.from(new Set(tickets.map((t) => t.intermediatePickup)));

  const filteredTickets = tickets.filter((t) => {
    const matchesQuery =
      t.ticketCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.passengerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.passengerDoc.includes(searchQuery);

    const matchesStop = selectedStopFilter === 'All' || t.intermediatePickup === selectedStopFilter;

    return matchesQuery && matchesStop;
  });

  const boardedCount = tickets.filter((t) => t.status === 'Boarded').length;
  const pendingCount = tickets.length - boardedCount;

  const handleSimulateScan = (ticket: TicketBooking) => {
    onToggleStatus(ticket.id);
    setScanResultToast(`Ticket ${ticket.ticketCode} (${ticket.passengerName}) validado correctamente.`);

    confetti({
      particleCount: 40,
      spread: 40,
      origin: { y: 0.7 },
      colors: ['#4BBF9E', '#37A6A6'],
    });

    setTimeout(() => {
      setScanResultToast(null);
    }, 3000);
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn max-w-5xl mx-auto">
      {/* Operator Header Bar */}
      <div className="bg-[#0D5FA6] text-white p-6 rounded-3xl shadow-xl flex flex-wrap items-center justify-between gap-4 border border-[#2180A6]">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#37A6A6] text-white flex items-center justify-center text-2xl font-bold shadow">
            🛡️
          </div>
          <div>
            <span className="text-xs font-bold text-[#4BBF9E] uppercase tracking-wider block">
              Módulo de Control de Abordaje & Escaneo QR
            </span>
            <h2 className="text-xl sm:text-2xl font-black">Panel Operativo de Conductor / Inspector</h2>
          </div>
        </div>

        {/* Live Passenger Counter Badges */}
        <div className="flex items-center gap-2">
          <div className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/20 text-center">
            <span className="text-[10px] text-blue-200 uppercase font-bold block">Abordados</span>
            <span className="text-lg font-black text-[#4BBF9E]">{boardedCount}</span>
          </div>

          <div className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/20 text-center">
            <span className="text-[10px] text-blue-200 uppercase font-bold block">Pendientes</span>
            <span className="text-lg font-black text-amber-300">{pendingCount}</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Viewfinder Scanner + Passenger Manifest */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Camera Viewfinder Mockup */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-[#0D5FA6] uppercase tracking-wider flex items-center gap-1.5">
              <Camera className="w-4 h-4 text-[#37A6A6]" />
              Escáner Óptico de Boletos
            </h3>
            <button
              onClick={() => setIsScanning(!isScanning)}
              className="text-xs font-semibold text-[#2180A6] hover:underline"
            >
              {isScanning ? 'Pausar' : 'Activar'}
            </button>
          </div>

          {/* Camera Box Frame */}
          <div className="relative h-64 bg-slate-900 rounded-2xl overflow-hidden flex items-center justify-center border-4 border-[#0D5FA6] shadow-inner">
            {isScanning ? (
              <>
                {/* Animated Green Scan Line */}
                <div className="absolute left-0 right-0 h-1 bg-[#4BBF9E] shadow-[0_0_15px_#4BBF9E] animate-scan z-10" />

                {/* Target Bounding Box */}
                <div className="w-44 h-44 border-2 border-dashed border-[#4BBF9E]/80 rounded-2xl flex flex-col items-center justify-center text-center p-3 text-white/70">
                  <QrCode className="w-10 h-10 text-[#4BBF9E] mb-2 animate-pulse" />
                  <span className="text-xs font-bold text-white">Alinee el Código QR</span>
                  <span className="text-[10px] text-[#4BBF9E]">Validación instantánea</span>
                </div>
              </>
            ) : (
              <div className="text-center p-4 text-slate-400">
                <Camera className="w-8 h-8 mx-auto mb-1 opacity-50" />
                <span className="text-xs">Cámara en pausa</span>
              </div>
            )}
          </div>

          {/* Quick Manual Code Input */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Ingreso Manual de Código</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ej. MOV-8849-EC"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#F2F2F2] border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-800 focus:ring-2 focus:ring-[#2180A6] outline-none"
              />
            </div>
          </div>
        </div>

        {/* Right 2 Columns: Live Manifest List */}
        <div className="md:col-span-2 bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-[#0D5FA6] uppercase tracking-wider flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-[#4BBF9E]" />
                  Manifiesto Digital de Pasajeros por Punto de Recogida
                </h3>
                <p className="text-xs text-slate-500">
                  Valide el abordaje en paradas intermedias sin terminal física (RF-06).
                </p>
              </div>

              {/* Stop Filter Dropdown */}
              <select
                value={selectedStopFilter}
                onChange={(e) => setSelectedStopFilter(e.target.value)}
                className="bg-[#F2F2F2] border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800"
              >
                <option value="All">Todas las Paradas Intermedias</option>
                {uniqueStops.map((stop) => (
                  <option key={stop} value={stop}>🚏 {stop}</option>
                ))}
              </select>
            </div>

            {/* Scan Toast Success Message */}
            {scanResultToast && (
              <div className="bg-[#4BBF9E] text-[#0D5FA6] font-bold p-3 rounded-xl text-xs flex items-center gap-2 shadow animate-fadeIn">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>{scanResultToast}</span>
              </div>
            )}

            {/* Passenger List Table / Cards */}
            <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
              {filteredTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className={`p-3.5 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                    ticket.status === 'Boarded'
                      ? 'bg-[#4BBF9E]/10 border-[#4BBF9E]/50'
                      : 'bg-[#F2F2F2] border-slate-200 hover:border-[#2180A6]'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-xs text-[#0D5FA6] font-mono">
                        {ticket.ticketCode}
                      </span>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-white text-[#0D5FA6] border border-slate-200">
                        Asiento: {ticket.seatNumber}
                      </span>
                    </div>

                    <p className="text-sm font-extrabold text-slate-900">{ticket.passengerName}</p>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 font-medium">
                      <span>Cédula: {ticket.passengerDoc}</span>
                      <span className="text-[#37A6A6] font-bold flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {ticket.intermediatePickup}
                      </span>
                    </div>
                  </div>

                  {/* Toggle Boarding Action */}
                  <button
                    onClick={() => handleSimulateScan(ticket)}
                    className={`w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-bold transition-all shadow flex items-center justify-center gap-1.5 ${
                      ticket.status === 'Boarded'
                        ? 'bg-[#4BBF9E] text-[#0D5FA6] hover:bg-emerald-400'
                        : 'bg-[#0D5FA6] hover:bg-[#2180A6] text-white'
                    }`}
                  >
                    {ticket.status === 'Boarded' ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-[#0D5FA6]" />
                        <span>Abordado (Desmarcar)</span>
                      </>
                    ) : (
                      <>
                        <QrCode className="w-4 h-4 text-[#4BBF9E]" />
                        <span>Validar Abordaje</span>
                      </>
                    )}
                  </button>
                </div>
              ))}

              {filteredTickets.length === 0 && (
                <div className="text-center py-8 text-slate-400 text-xs font-medium">
                  No se encontraron boletos que coincidan con la búsqueda o filtro.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
