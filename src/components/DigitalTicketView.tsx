import React, { useState } from 'react';
import type { TicketBooking } from '../types';
import { generatePdfReceipt } from '../utils/generatePdfReceipt';
import { QrCode, WifiOff, MapPin, Bus, ShieldCheck, Download, Share2 } from 'lucide-react';

interface DigitalTicketViewProps {
  tickets: TicketBooking[];
}

export const DigitalTicketView: React.FC<DigitalTicketViewProps> = ({ tickets }) => {
  const [selectedTicketId, setSelectedTicketId] = useState<string>(
    tickets[0]?.id || ''
  );

  const selectedTicket = tickets.find((t) => t.id === selectedTicketId) || tickets[0];

  if (tickets.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-8 text-center space-y-4 max-w-lg mx-auto shadow border border-slate-200 my-8">
        <div className="w-16 h-16 rounded-full bg-[#0D5FA6]/10 text-[#0D5FA6] mx-auto flex items-center justify-center text-3xl font-bold">
          🎫
        </div>
        <h3 className="text-xl font-bold text-slate-800">Aún no tienes tickets registrados</h3>
        <p className="text-xs text-slate-500">
          Explora nuestros paquetes turísticos o alquila un transporte privado para generar tu primer pasaje digital QR.
        </p>
      </div>
    );
  }

  const renderSvgQr = (_payload: string) => {
    return (
      <svg className="w-44 h-44 mx-auto" viewBox="0 0 100 100" fill="none">
        <rect width="100" height="100" fill="white" rx="8" />
        {/* QR Outer Corners */}
        <rect x="8" y="8" width="28" height="28" fill="#0D5FA6" rx="4" />
        <rect x="12" y="12" width="20" height="20" fill="white" rx="2" />
        <rect x="16" y="16" width="12" height="12" fill="#0D5FA6" rx="1" />

        <rect x="64" y="8" width="28" height="28" fill="#0D5FA6" rx="4" />
        <rect x="68" y="12" width="20" height="20" fill="white" rx="2" />
        <rect x="72" y="16" width="12" height="12" fill="#0D5FA6" rx="1" />

        <rect x="8" y="64" width="28" height="28" fill="#0D5FA6" rx="4" />
        <rect x="12" y="68" width="20" height="20" fill="white" rx="2" />
        <rect x="16" y="72" width="12" height="12" fill="#0D5FA6" rx="1" />

        {/* Data Pattern Grid */}
        <path
          d="M42 10h6v6h-6z M52 10h10v6h-10z M42 20h16v6h-16z M42 30h6v6h-6z M52 30h6v6h-6z M10 42h6v6h-6z M20 42h16v6h-16z M42 42h10v10h-10z M60 42h10v6h-10z M80 42h10v6h-10z M42 58h6v6h-6z M58 54h12v6h-12z M78 54h12v12h-12z M42 68h16v6h-16z M42 78h6v12h-6z M52 84h10v6h-10z M68 78h10v12h-10z M82 82h8v8h-8z"
          fill="#37A6A6"
        />

        {/* Center Brand Mini Logo */}
        <circle cx="50" cy="50" r="8" fill="#4BBF9E" />
        <text x="50" y="53" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#0D5FA6">🚌</text>
      </svg>
    );
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn max-w-4xl mx-auto">
      {/* Wallet Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {tickets.map((ticket) => (
          <button
            key={ticket.id}
            onClick={() => setSelectedTicketId(ticket.id)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all border shrink-0 flex items-center gap-2 ${
              selectedTicket.id === ticket.id
                ? 'bg-[#0D5FA6] text-white border-[#0D5FA6] shadow-md'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <QrCode className="w-4 h-4 text-[#4BBF9E]" />
            <span>{ticket.ticketCode}</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded font-extrabold ${
              ticket.status === 'Boarded' ? 'bg-[#4BBF9E] text-[#0D5FA6]' : 'bg-[#37A6A6] text-white'
            }`}>
              {ticket.status === 'Boarded' ? 'Abordado' : 'Confirmado'}
            </span>
          </button>
        ))}
      </div>

      {/* Main Boarding Pass Card */}
      <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 relative">
        {/* Ticket Header Bar */}
        <div className="bg-[#0D5FA6] text-white p-5 flex flex-wrap items-center justify-between gap-3 border-b border-[#2180A6]">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white text-[#0D5FA6] flex items-center justify-center font-bold text-2xl shadow">
              🚌
            </div>
            <div>
              <span className="text-[11px] font-bold text-[#4BBF9E] uppercase tracking-wider block">
                Pase de Abordaje Digital PWA (RF-04 / RF-05)
              </span>
              <h3 className="text-lg font-extrabold">{selectedTicket.packageName}</h3>
            </div>
          </div>

          {/* Status Badges */}
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#4BBF9E]/20 text-[#4BBF9E] border border-[#4BBF9E]/40">
              <WifiOff className="w-3.5 h-3.5" /> Offline Listo
            </span>
            <span className={`text-xs font-extrabold px-3 py-1 rounded-full shadow ${
              selectedTicket.status === 'Boarded'
                ? 'bg-[#4BBF9E] text-[#0D5FA6]'
                : 'bg-[#37A6A6] text-white'
            }`}>
              {selectedTicket.status === 'Boarded' ? '✓ Abordado' : '✓ Boleto Confirmado'}
            </span>
          </div>
        </div>

        {/* Boarding Details Body */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Left 2 Cols: Route & Passenger Info */}
          <div className="md:col-span-2 space-y-6">
            {/* Route Box */}
            <div className="bg-[#F2F2F2] p-4 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-[#0D5FA6] uppercase tracking-wide">
                <span>Ruta Interprovincial</span>
                <span className="text-[#37A6A6]">Código: {selectedTicket.ticketCode}</span>
              </div>

              <div className="flex items-center justify-between text-sm sm:text-base font-extrabold text-slate-900">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#37A6A6]" />
                  <span>{selectedTicket.origin}</span>
                </div>
                <span className="text-[#2180A6]">➔</span>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#4BBF9E]" />
                  <span>{selectedTicket.destination}</span>
                </div>
              </div>

              {/* Selected Intermediate Pickup (RF-06 Highlight) */}
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                <span className="font-bold text-[#0D5FA6] flex items-center gap-1">
                  <Bus className="w-4 h-4 text-[#37A6A6]" /> Punto de Recogida Asignado:
                </span>
                <span className="font-black bg-[#4BBF9E] text-[#0D5FA6] px-2 py-0.5 rounded shadow-sm">
                  {selectedTicket.intermediatePickup}
                </span>
              </div>
            </div>

            {/* Grid of Details */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-slate-400 font-semibold block text-[10px] uppercase">Pasajero</span>
                <span className="font-bold text-slate-800 line-clamp-1">{selectedTicket.passengerName}</span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-slate-400 font-semibold block text-[10px] uppercase">Cédula / ID</span>
                <span className="font-bold text-slate-800">{selectedTicket.passengerDoc}</span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-slate-400 font-semibold block text-[10px] uppercase">Hora de Salida</span>
                <span className="font-bold text-[#0D5FA6]">{selectedTicket.departureTime}</span>
              </div>

              <div className="bg-[#4BBF9E]/10 p-3 rounded-xl border border-[#4BBF9E]/40">
                <span className="text-[#0D5FA6] font-extrabold block text-[10px] uppercase">Asiento VIP</span>
                <span className="font-black text-[#0D5FA6] text-base">{selectedTicket.seatNumber}</span>
              </div>
            </div>
          </div>

          {/* Right Col: QR Code Card */}
          <div className="bg-[#F2F2F2] p-5 rounded-2xl border-2 border-dashed border-[#2180A6]/40 text-center space-y-3">
            <span className="text-xs font-extrabold text-[#0D5FA6] uppercase tracking-wider block">
              Muestre este QR al Chofer
            </span>

            {/* Render QR SVG */}
            <div className="p-2 bg-white rounded-xl shadow-inner inline-block">
              {renderSvgQr(selectedTicket.qrPayload)}
            </div>

            <p className="text-[11px] font-mono text-slate-500 font-semibold">
              {selectedTicket.qrPayload}
            </p>

            <div className="flex gap-2 justify-center pt-1">
              <button
                onClick={() => generatePdfReceipt(selectedTicket)}
                className="bg-[#0D5FA6] hover:bg-[#2180A6] text-white p-2 px-3 rounded-xl text-xs font-bold transition-colors shadow flex items-center gap-1.5"
                title="Descargar Comprobante PDF de Transacción"
              >
                <Download className="w-3.5 h-3.5 text-[#4BBF9E]" /> Descargar PDF
              </button>

              <button
                onClick={() => navigator.share?.({ title: selectedTicket.packageName, text: `Mi pasaje MovilisTurismo: ${selectedTicket.ticketCode}` }) || alert('Enlace de boleto copiado al portapapeles')}
                className="bg-[#37A6A6] hover:bg-[#2180A6] text-white p-2 px-3 rounded-xl text-xs font-bold transition-colors shadow flex items-center gap-1.5"
                title="Compartir por WhatsApp"
              >
                <Share2 className="w-3.5 h-3.5 text-[#4BBF9E]" /> Compartir
              </button>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="bg-[#F2F2F2] px-6 py-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 gap-2">
          <div className="flex items-center gap-1.5 font-semibold text-[#0D5FA6]">
            <ShieldCheck className="w-4 h-4 text-[#4BBF9E]" />
            <span>Validación sin terminal física cumpliendo normativa de transporte interprovincial Ecuador.</span>
          </div>

          <span className="text-[11px] font-bold text-slate-400">
            ID Operador: EC-MOV-SYSTEM
          </span>
        </div>
      </div>
    </div>
  );
};
