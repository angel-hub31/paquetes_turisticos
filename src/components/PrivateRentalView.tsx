import React, { useState } from 'react';
import { MOCK_VEHICLES, ECUADOR_CITIES } from '../data/mockData';
import type { PrivateVehicle } from '../types';
import { ShieldCheck, Check, Sparkles, ArrowRight, X } from 'lucide-react';
import confetti from 'canvas-confetti';

export const PrivateRentalView: React.FC = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<PrivateVehicle | null>(null);
  const [origin, setOrigin] = useState('Quito');
  const [destination, setDestination] = useState('Baños de Agua Santa');
  const [days, setDays] = useState(2);
  const [passengers, setPassengers] = useState(12);
  const [includeDriver, setIncludeDriver] = useState(true);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [quoteSuccess, setQuoteSuccess] = useState(false);


  // Contact form in modal
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [notes, setNotes] = useState('');

  const calculateEstimate = (vehicle: PrivateVehicle) => {
    const base = vehicle.pricePerDay * days;
    const driverFee = includeDriver ? 30 * days : 0;
    return base + driverFee;
  };

  const handleOpenQuote = (veh: PrivateVehicle) => {
    setSelectedVehicle(veh);
    setShowQuoteModal(true);
    setQuoteSuccess(false);
  };

  const handleSubmitQuote = (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteSuccess(true);
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#0D5FA6', '#2180A6', '#37A6A6', '#4BBF9E'],
    });
  };

  return (
    <div className="space-y-8 pb-12 animate-fadeIn">
      {/* Banner Header */}
      <div className="bg-[#0D5FA6] text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="max-w-4xl relative z-10 space-y-3">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold bg-[#4BBF9E]/20 text-[#4BBF9E] border border-[#4BBF9E]/30 uppercase tracking-wider">
            Módulo RF-02 | Unidades Completas Exclusivas
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            Alquiler de Transporte Privado para Grupos & Empresas
          </h2>
          <p className="text-blue-100 text-sm sm:text-base max-w-2xl font-normal">
            Renta unidades completas (Vans, Coasters y Buses Doble Piso) con chofer profesional certificado y monitoreo GPS 24/7 para tus giras turísticas en Ecuador.
          </p>
        </div>
      </div>

      {/* Fleet Filter & Quick Calculator Bar */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-[#0D5FA6] uppercase tracking-wider flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#4BBF9E]" />
          Cotizador Rápido de Viaje Privado
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Origen de Salida</label>
            <select
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full bg-[#F2F2F2] border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
            >
              {ECUADOR_CITIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Destino de la Ruta</label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full bg-[#F2F2F2] border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
            >
              {ECUADOR_CITIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Número de Días</label>
            <select
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="w-full bg-[#F2F2F2] border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
            >
              {[1, 2, 3, 4, 5, 7, 10, 15].map((d) => (
                <option key={d} value={d}>{d} {d === 1 ? 'Día' : 'Días'}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Pasajeros Estimados</label>
            <input
              type="number"
              min={1}
              max={60}
              value={passengers}
              onChange={(e) => setPassengers(Number(e.target.value))}
              className="w-full bg-[#F2F2F2] border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
          <input
            type="checkbox"
            id="driverToggle"
            checked={includeDriver}
            onChange={(e) => setIncludeDriver(e.target.checked)}
            className="w-4 h-4 text-[#0D5FA6] rounded border-slate-300 focus:ring-[#2180A6]"
          />
          <label htmlFor="driverToggle" className="text-xs font-bold text-slate-700 cursor-pointer">
            Incluir Chofer Profesional Certificado (+ $30 USD / día)
          </label>
        </div>
      </div>


      {/* Vehicles Fleet Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MOCK_VEHICLES.map((vehicle) => {
          const estimatedCost = calculateEstimate(vehicle);

          return (
            <div
              key={vehicle.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image & Header */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <img
                  src={vehicle.imageUrl}
                  alt={vehicle.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4 text-white justify-between">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-[#37A6A6] text-white">
                      {vehicle.type}
                    </span>
                    <h4 className="text-lg font-extrabold mt-1">{vehicle.name}</h4>
                  </div>
                  <div className="bg-[#4BBF9E] text-[#0D5FA6] px-2.5 py-1 rounded-xl text-xs font-black shadow">
                    Capacidad: {vehicle.capacity} p.
                  </div>
                </div>
              </div>

              {/* Body features */}
              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <p className="text-xs text-slate-600 italic bg-[#F2F2F2] p-2.5 rounded-xl border border-slate-200">
                    💡 Ideal para: {vehicle.idealFor}
                  </p>

                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-[#0D5FA6] uppercase tracking-wider">
                      Comodidades de la Unidad:
                    </span>
                    <div className="grid grid-cols-2 gap-1.5 text-xs text-slate-700 font-semibold">
                      {vehicle.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-[#4BBF9E] shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Pricing & Rent Action */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] text-slate-400 font-medium block">
                      Estimado para {days} días ({origin} ➔ {destination}):
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-[#0D5FA6]">
                        ${estimatedCost}
                      </span>
                      <span className="text-xs font-bold text-[#37A6A6]">USD</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleOpenQuote(vehicle)}
                    className="bg-[#0D5FA6] hover:bg-[#2180A6] text-white font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition-all shadow flex items-center gap-1.5"
                  >
                    <span>Solicitar Unidad</span>
                    <ArrowRight className="w-4 h-4 text-[#4BBF9E]" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quote Modal */}
      {showQuoteModal && selectedVehicle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-[#2180A6]/30 relative animate-fadeIn space-y-4">
            <button
              onClick={() => setShowQuoteModal(false)}
              className="absolute top-4 right-4 p-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {!quoteSuccess ? (
              <form onSubmit={handleSubmitQuote} className="space-y-4">
                <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0D5FA6] text-white flex items-center justify-center font-bold text-xl">
                    🚐
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#4BBF9E] uppercase">Reserva de Unidad Completa</span>
                    <h3 className="text-lg font-extrabold text-slate-900">{selectedVehicle.name}</h3>
                  </div>
                </div>

                <div className="bg-[#F2F2F2] p-3 rounded-xl border border-slate-200 text-xs space-y-1">
                  <p className="font-bold text-[#0D5FA6]">Ruta: {origin} ➔ {destination}</p>
                  <p className="text-slate-700">Duración: {days} Días | Capacidad: {selectedVehicle.capacity} Pasajeros</p>
                  <p className="font-extrabold text-[#37A6A6] text-sm">Valor Estimado: ${calculateEstimate(selectedVehicle)} USD</p>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Nombre del Solicitante / Empresa *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Juan Pérez - Agencia Ecuador Tour"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full bg-[#F2F2F2] border border-slate-300 rounded-xl px-3 py-2 font-semibold text-slate-800 focus:ring-2 focus:ring-[#2180A6] outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Teléfono WhatsApp de Contacto *</label>
                    <input
                      type="tel"
                      required
                      placeholder="Ej. +593 99 876 5432"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full bg-[#F2F2F2] border border-slate-300 rounded-xl px-3 py-2 font-semibold text-slate-800 focus:ring-2 focus:ring-[#2180A6] outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Observaciones o Requerimientos Especiales</label>
                    <textarea
                      rows={2}
                      placeholder="Ej. Necesitamos chofer bilingüe en inglés y espacio extra para equipaje de montaña."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full bg-[#F2F2F2] border border-slate-300 rounded-xl px-3 py-2 font-semibold text-slate-800 focus:ring-2 focus:ring-[#2180A6] outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#4BBF9E] hover:bg-[#37A6A6] text-[#0D5FA6] font-extrabold py-3 rounded-xl text-sm transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Confirmar Solicitud de Reserva</span>
                </button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#4BBF9E]/20 text-[#4BBF9E] mx-auto flex items-center justify-center text-3xl font-bold border-2 border-[#4BBF9E]">
                  ✓
                </div>
                <h3 className="text-xl font-bold text-[#0D5FA6]">¡Solicitud Enviada con Éxito!</h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Un asesor operativo de Movilis Turismo se comunicará en menos de 15 minutos al WhatsApp{' '}
                  <span className="font-bold text-slate-800">{contactPhone}</span> para formalizar la reserva y asignación de la unidad.
                </p>
                <button
                  onClick={() => setShowQuoteModal(false)}
                  className="bg-[#0D5FA6] text-white font-bold px-6 py-2 rounded-xl text-xs"
                >
                  Cerrar Ventana
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
