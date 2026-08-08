import React, { useState } from 'react';
import type { RoutePackage, TicketBooking } from '../types';
import { SeatSelector } from './SeatSelector';
import { generatePdfReceipt } from '../utils/generatePdfReceipt';
import confetti from 'canvas-confetti';
import {
  X,
  MapPin,
  Clock,
  CheckCircle2,
  CreditCard,
  User,
  FileText,
  Bus,
  ShieldCheck,
  Building,
  Download,
  AlertCircle
} from 'lucide-react';

interface PackageDetailModalProps {
  packageData: RoutePackage | null;
  onClose: () => void;
  onConfirmBooking: (newTicket: TicketBooking) => void;
}

export const PackageDetailModal: React.FC<PackageDetailModalProps> = ({
  packageData,
  onClose,
  onConfirmBooking,
}) => {
  if (!packageData) return null;

  const [activeTab, setActiveTab] = useState<'info' | 'seat' | 'checkout'>('info');

  // Form State
  const [selectedDepartureTime, setSelectedDepartureTime] = useState(packageData.departureTimes[0]);
  const [selectedPickupStop, setSelectedPickupStop] = useState(
    packageData.intermediateStops[0] || `${packageData.origin} (Terminal Quitumbe)`
  );
  const [selectedSeat, setSelectedSeat] = useState('03A');
  const [passengerName, setPassengerName] = useState('');
  const [passengerDoc, setPassengerDoc] = useState('');
  const [passengerPhone, setPassengerPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'deuna' | 'card' | 'transfer'>('deuna');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation Error States
  const [nameError, setNameError] = useState<string | null>(null);
  const [docError, setDocError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  // Validate Name: EXCLUSIVELY letters and spaces, length 2 to 14 characters (mayor a 1 y menor a 15)
  const validatePassengerName = (val: string): boolean => {
    const lettersAndSpaces = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    const trimmed = val.trim();

    if (!trimmed) {
      setNameError('El nombre completo es obligatorio.');
      return false;
    }
    if (trimmed.length <= 1) {
      setNameError('El nombre debe tener más de 1 caracter (mínimo 2 letras).');
      return false;
    }
    if (trimmed.length >= 15) {
      setNameError('El nombre debe tener menos de 15 caracteres (máximo 14 letras).');
      return false;
    }
    if (!lettersAndSpaces.test(trimmed)) {
      setNameError('El nombre debe contener EXCLUSIVAMENTE letras (sin números ni símbolos).');
      return false;
    }

    setNameError(null);
    return true;
  };

  // Validate Doc: EXCLUSIVELY numbers (0-9)
  const validatePassengerDoc = (val: string): boolean => {
    const numbersOnly = /^[0-9]+$/;
    const trimmed = val.trim();

    if (!trimmed) {
      setDocError('La cédula es obligatoria.');
      return false;
    }
    if (!numbersOnly.test(trimmed)) {
      setDocError('La cédula debe contener EXCLUSIVAMENTE números (dígitos 0 al 9).');
      return false;
    }

    setDocError(null);
    return true;
  };

  // Validate Phone: EXCLUSIVELY numbers (0-9)
  const validatePassengerPhone = (val: string): boolean => {
    const numbersOnly = /^[0-9]+$/;
    const trimmed = val.trim();

    if (trimmed && !numbersOnly.test(trimmed)) {
      setPhoneError('El teléfono debe contener EXCLUSIVAMENTE números.');
      return false;
    }

    setPhoneError(null);
    return true;
  };

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isNameValid = validatePassengerName(passengerName);
    const isDocValid = validatePassengerDoc(passengerDoc);
    const isPhoneValid = validatePassengerPhone(passengerPhone);

    if (!isNameValid || !isDocValid || !isPhoneValid) {
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const randomCodeNum = Math.floor(1000 + Math.random() * 9000);
      const ticketCode = `MOV-${randomCodeNum}-EC`;
      const today = new Date().toISOString().split('T')[0];

      const newTicket: TicketBooking = {
        id: `tkt-${Date.now()}`,
        ticketCode,
        packageId: packageData.id,
        packageName: packageData.title,
        origin: packageData.origin,
        destination: packageData.destination,
        intermediatePickup: selectedPickupStop,
        departureDate: today,
        departureTime: selectedDepartureTime,
        seatNumber: selectedSeat,
        passengerName: passengerName.trim(),
        passengerDoc: passengerDoc.trim(),
        passengerPhone: passengerPhone.trim() || '0990000000',
        totalPaid: packageData.price,
        status: 'Confirmed',
        inclusions: packageData.inclusions,
        vehicleType: 'Bus Volvo VIP 9700 Grand',
        qrPayload: `${ticketCode}|${passengerDoc}|${selectedPickupStop}|${selectedSeat}|Confirmed`,
        createdAt: new Date().toISOString(),
      };

      // 1. Trigger PDF receipt generation & download
      try {
        generatePdfReceipt(newTicket);
      } catch (err) {
        console.error('PDF generation error:', err);
      }

      // 2. Fire festive confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0D5FA6', '#2180A6', '#37A6A6', '#4BBF9E'],
      });

      setIsSubmitting(false);
      onConfirmBooking(newTicket);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-[#2180A6]/30 overflow-hidden">
        {/* Modal Header */}
        <div className="bg-[#0D5FA6] text-white p-4 sm:p-5 flex items-center justify-between shrink-0 border-b border-[#2180A6]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-xl text-[#4BBF9E]">
              🚌
            </div>
            <div>
              <span className="text-[11px] font-bold text-[#4BBF9E] uppercase tracking-wider block">
                Paquete Turístico Todo Incluido
              </span>
              <h2 className="text-base sm:text-xl font-bold line-clamp-1">
                {packageData.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Steps Navigation Bar */}
        <div className="bg-[#F2F2F2] px-4 py-2 border-b border-slate-200 flex justify-around text-xs font-bold text-slate-600">
          <button
            onClick={() => setActiveTab('info')}
            className={`flex items-center gap-1.5 py-2 px-3 rounded-lg transition-colors ${
              activeTab === 'info' ? 'bg-[#0D5FA6] text-white shadow' : 'hover:bg-slate-200'
            }`}
          >
            <FileText className="w-4 h-4 text-[#4BBF9E]" />
            <span>1. Detalles</span>
          </button>

          <button
            onClick={() => setActiveTab('seat')}
            className={`flex items-center gap-1.5 py-2 px-3 rounded-lg transition-colors ${
              activeTab === 'seat' ? 'bg-[#0D5FA6] text-white shadow' : 'hover:bg-slate-200'
            }`}
          >
            <Bus className="w-4 h-4 text-[#4BBF9E]" />
            <span>2. Parada & Asiento</span>
          </button>

          <button
            onClick={() => setActiveTab('checkout')}
            className={`flex items-center gap-1.5 py-2 px-3 rounded-lg transition-colors ${
              activeTab === 'checkout' ? 'bg-[#0D5FA6] text-white shadow' : 'hover:bg-slate-200'
            }`}
          >
            <CreditCard className="w-4 h-4 text-[#4BBF9E]" />
            <span>3. Pasajero & Pago</span>
          </button>
        </div>

        {/* Modal Content Scroll Area */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'info' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Image & Price Summary */}
              <div className="relative h-48 rounded-2xl overflow-hidden shadow">
                <img
                  src={packageData.imageUrl}
                  alt={packageData.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800&auto=format&fit=crop';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4 text-white justify-between">
                  <div>
                    <p className="text-xs text-[#4BBF9E] font-bold">Hospedaje Incluido:</p>
                    <p className="text-sm font-bold flex items-center gap-1">
                      <Building className="w-4 h-4 text-[#4BBF9E]" /> {packageData.hotelName}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-[#4BBF9E]">${packageData.price} USD</p>
                    <p className="text-[10px] text-blue-100">por persona (Todo Incluido)</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-[#0D5FA6] uppercase tracking-wide">
                  Descripción General
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed bg-[#F2F2F2] p-3 rounded-xl border border-slate-200">
                  {packageData.description}
                </p>
              </div>

              {/* Inclusions List */}
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-[#0D5FA6] uppercase tracking-wide">
                  Actividades e Itinerario Destacado
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {packageData.activitiesList.map((act, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs font-semibold text-slate-800 bg-white p-2.5 rounded-xl border border-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-[#4BBF9E] shrink-0 mt-0.5" />
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Day by Day Itinerary */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-[#0D5FA6] uppercase tracking-wide">
                  Itinerario Día a Día
                </h4>
                {packageData.itinerary.map((itin) => (
                  <div key={itin.day} className="bg-[#F2F2F2] p-3 rounded-xl border border-slate-200 space-y-1">
                    <span className="text-xs font-bold text-[#37A6A6] uppercase tracking-wider block">
                      Día {itin.day}: {itin.title}
                    </span>
                    <p className="text-xs text-slate-600">{itin.description}</p>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setActiveTab('seat')}
                  className="bg-[#0D5FA6] hover:bg-[#2180A6] text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-all shadow"
                >
                  Continuar a Parada & Asiento →
                </button>
              </div>
            </div>
          )}

          {activeTab === 'seat' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Pickup Stop Selector (RF-06) */}
              <div className="bg-[#F2F2F2] p-4 rounded-2xl border border-slate-200 space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#0D5FA6] uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#37A6A6]" />
                    Punto de Recogida Intermedio Seleccionado (RF-06)
                  </label>
                  <p className="text-xs text-slate-600">
                    Puedes abordar en el terminal principal o en cualquier intersección intermedia de la ruta sin acudir a terminales físicas.
                  </p>
                </div>

                <select
                  value={selectedPickupStop}
                  onChange={(e) => setSelectedPickupStop(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-[#2180A6] outline-none"
                >
                  <option value={`${packageData.origin} (Terminal Principal)`}>
                    📍 {packageData.origin} (Terminal Principal Quitumbe / Terrestre)
                  </option>
                  {packageData.intermediateStops.map((stop) => (
                    <option key={stop} value={`${stop} (Parada Intermedia)`}>
                      🚏 {stop} (Intercambiador / Parada Intermedia Directa)
                    </option>
                  ))}
                </select>
              </div>

              {/* Departure Time */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#0D5FA6] uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#2180A6]" />
                  Hora de Salida de la Unidad
                </label>
                <div className="flex gap-2">
                  {packageData.departureTimes.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedDepartureTime(time)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                        selectedDepartureTime === time
                          ? 'bg-[#0D5FA6] text-white border-[#0D5FA6] shadow'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bus Seat Selector Component */}
              <SeatSelector
                selectedSeat={selectedSeat}
                onSelectSeat={(seat) => setSelectedSeat(seat)}
              />

              <div className="pt-4 flex justify-between">
                <button
                  onClick={() => setActiveTab('info')}
                  className="text-xs font-bold text-slate-600 hover:text-[#0D5FA6] px-4 py-2"
                >
                  ← Volver a Detalles
                </button>
                <button
                  onClick={() => setActiveTab('checkout')}
                  className="bg-[#0D5FA6] hover:bg-[#2180A6] text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-all shadow"
                >
                  Continuar a Pago & Datos →
                </button>
              </div>
            </div>
          )}

          {activeTab === 'checkout' && (
            <form onSubmit={handleBookSubmit} className="space-y-6 animate-fadeIn">
              {/* Summary Banner */}
              <div className="bg-[#0D5FA6] text-white p-4 rounded-2xl flex items-center justify-between border border-[#2180A6]">
                <div>
                  <span className="text-[10px] text-[#4BBF9E] uppercase font-bold tracking-wider">Resumen de Ticket</span>
                  <p className="text-sm font-bold">{packageData.title}</p>
                  <p className="text-xs text-blue-100">Parada: {selectedPickupStop} | Asiento: {selectedSeat}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-blue-200">Total a pagar:</span>
                  <p className="text-2xl font-black text-[#4BBF9E]">${packageData.price} USD</p>
                </div>
              </div>

              {/* Passenger Details Form with Strict Validation */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-[#0D5FA6] uppercase tracking-wide flex items-center gap-1.5">
                  <User className="w-4 h-4 text-[#37A6A6]" />
                  Datos del Pasajero Titular *
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Passenger Name Field */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 flex justify-between">
                      <span>Nombre Completo *</span>
                      <span className="text-[10px] text-slate-400 font-normal">(Solo letras, 2 a 14 car.)</span>
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={14}
                      placeholder="Ej. Ana Torres"
                      value={passengerName}
                      onChange={(e) => {
                        setPassengerName(e.target.value);
                        if (e.target.value) validatePassengerName(e.target.value);
                      }}
                      className={`w-full bg-[#F2F2F2] border rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800 outline-none ${
                        nameError ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300 focus:ring-2 focus:ring-[#2180A6]'
                      }`}
                    />
                    {nameError && (
                      <p className="text-[11px] font-bold text-rose-600 flex items-center gap-1 pt-0.5">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-600" />
                        <span>{nameError}</span>
                      </p>
                    )}
                  </div>

                  {/* Passenger Document Field */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 flex justify-between">
                      <span>Cédula / Pasaporte *</span>
                      <span className="text-[10px] text-slate-400 font-normal">(Solo números)</span>
                    </label>
                    <input
                      type="text"
                      required
                      inputMode="numeric"
                      placeholder="Ej. 1723984102"
                      value={passengerDoc}
                      onChange={(e) => {
                        setPassengerDoc(e.target.value);
                        if (e.target.value) validatePassengerDoc(e.target.value);
                      }}
                      className={`w-full bg-[#F2F2F2] border rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800 outline-none ${
                        docError ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300 focus:ring-2 focus:ring-[#2180A6]'
                      }`}
                    />
                    {docError && (
                      <p className="text-[11px] font-bold text-rose-600 flex items-center gap-1 pt-0.5">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-600" />
                        <span>{docError}</span>
                      </p>
                    )}
                  </div>

                  {/* Passenger Phone Field */}
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-bold text-slate-700 flex justify-between">
                      <span>Teléfono WhatsApp de Contacto</span>
                      <span className="text-[10px] text-slate-400 font-normal">(Solo números)</span>
                    </label>
                    <input
                      type="tel"
                      inputMode="numeric"
                      placeholder="Ej. 0991234567"
                      value={passengerPhone}
                      onChange={(e) => {
                        setPassengerPhone(e.target.value);
                        if (e.target.value) validatePassengerPhone(e.target.value);
                      }}
                      className={`w-full bg-[#F2F2F2] border rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800 outline-none ${
                        phoneError ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300 focus:ring-2 focus:ring-[#2180A6]'
                      }`}
                    />
                    {phoneError && (
                      <p className="text-[11px] font-bold text-rose-600 flex items-center gap-1 pt-0.5">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-600" />
                        <span>{phoneError}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment Methods Simulation */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-[#0D5FA6] uppercase tracking-wide flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-[#2180A6]" />
                  Método de Pago Simulado
                </h4>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('deuna')}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center text-xs font-bold transition-all ${
                      paymentMethod === 'deuna'
                        ? 'bg-[#37A6A6] text-white border-[#37A6A6] shadow-md ring-2 ring-[#0D5FA6]'
                        : 'bg-[#F2F2F2] text-slate-700 border-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    <span>⚡ Deuna! QR</span>
                    <span className="text-[10px] font-normal opacity-90">Instantáneo</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center text-xs font-bold transition-all ${
                      paymentMethod === 'card'
                        ? 'bg-[#37A6A6] text-white border-[#37A6A6] shadow-md ring-2 ring-[#0D5FA6]'
                        : 'bg-[#F2F2F2] text-slate-700 border-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    <span>💳 Tarjeta</span>
                    <span className="text-[10px] font-normal opacity-90">Débito / Crédito</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('transfer')}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center text-xs font-bold transition-all ${
                      paymentMethod === 'transfer'
                        ? 'bg-[#37A6A6] text-white border-[#37A6A6] shadow-md ring-2 ring-[#0D5FA6]'
                        : 'bg-[#F2F2F2] text-slate-700 border-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    <span>🏦 Transferencia</span>
                    <span className="text-[10px] font-normal opacity-90">Pichincha / Guayaquil</span>
                  </button>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#4BBF9E] hover:bg-[#37A6A6] text-[#0D5FA6] font-extrabold py-3.5 rounded-xl text-sm sm:text-base transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-[#0D5FA6] border-t-transparent rounded-full animate-spin" />
                      <span>Generando PDF y Ticket QR...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      <span>Confirmar Pago de ${packageData.price} USD & Descargar PDF</span>
                    </>
                  )}
                </button>
                <p className="text-[11px] text-center text-slate-500 font-medium flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#37A6A6]" />
                  <span>Pago seguro simulado. Se descargará el PDF oficial de comprobante automáticamente.</span>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
