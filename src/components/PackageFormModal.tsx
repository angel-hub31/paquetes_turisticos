import React, { useState } from 'react';
import type { RoutePackage } from '../types';
import { X, MapPin, Save, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PackageFormModalProps {
  packageToEdit?: RoutePackage | null;
  isOpen: boolean;
  onClose: () => void;
  onSavePackage: (pkg: RoutePackage) => void;
}

export const PackageFormModal: React.FC<PackageFormModalProps> = ({
  packageToEdit,
  isOpen,
  onClose,
  onSavePackage,
}) => {
  if (!isOpen) return null;

  const isEditing = Boolean(packageToEdit);

  // Form State
  const [title, setTitle] = useState(packageToEdit?.title || '');
  const [region, setRegion] = useState<'Sierra' | 'Costa' | 'Amazonía' | 'Insular'>(
    packageToEdit?.region || 'Sierra'
  );
  const [origin, setOrigin] = useState(packageToEdit?.origin || 'Quito');
  const [destination, setDestination] = useState(packageToEdit?.destination || 'Baños');
  const [intermediateStopsText, setIntermediateStopsText] = useState(
    packageToEdit?.intermediateStops?.join(', ') || 'Machachi, Latacunga'
  );
  const [price, setPrice] = useState(packageToEdit?.price || 79);
  const [originalPrice, setOriginalPrice] = useState(packageToEdit?.originalPrice || 110);
  const [durationDays, setDurationDays] = useState(packageToEdit?.durationDays || 2);
  const [rating, setRating] = useState(packageToEdit?.rating || 4.9);
  const [imageUrl, setImageUrl] = useState(
    packageToEdit?.imageUrl || '/images/banos.jpg'
  );
  const [hotelName, setHotelName] = useState(packageToEdit?.hotelName || 'Hotel Spa');
  const [activitiesText, setActivitiesText] = useState(
    packageToEdit?.activitiesList?.join(', ') || 'Tour cascadas, Tarabita'
  );
  const [departureTimesText, setDepartureTimesText] = useState(
    packageToEdit?.departureTimes?.join(', ') || '06:00 AM, 08:30 AM'
  );
  const [description, setDescription] = useState(
    packageToEdit?.description ||
      'Disfruta de una experiencia única con transporte interprovincial VIP y hospedaje.'
  );

  // Error States
  const [titleError, setTitleError] = useState<string | null>(null);
  const [originError, setOriginError] = useState<string | null>(null);
  const [destError, setDestError] = useState<string | null>(null);

  // Validate Title: EXCLUSIVELY letters & spaces, length 2 to 14 characters (mayor a 1 y menor a 15)
  const validateTitle = (val: string): boolean => {
    const lettersAndSpaces = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    const trimmed = val.trim();

    if (!trimmed) {
      setTitleError('El nombre del paquete es obligatorio.');
      return false;
    }
    if (trimmed.length <= 1) {
      setTitleError('El nombre debe tener más de 1 caracter (mínimo 2 letras).');
      return false;
    }
    if (trimmed.length >= 15) {
      setTitleError('El nombre debe tener menos de 15 caracteres (máximo 14 letras).');
      return false;
    }
    if (!lettersAndSpaces.test(trimmed)) {
      setTitleError('El nombre debe contener EXCLUSIVAMENTE letras (sin números ni símbolos).');
      return false;
    }

    setTitleError(null);
    return true;
  };

  // Validate Origin: EXCLUSIVELY letters & spaces, length 2 to 14 characters
  const validateOrigin = (val: string): boolean => {
    const lettersAndSpaces = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    const trimmed = val.trim();

    if (!trimmed) {
      setOriginError('El origen es obligatorio.');
      return false;
    }
    if (trimmed.length <= 1 || trimmed.length >= 15 || !lettersAndSpaces.test(trimmed)) {
      setOriginError('El origen debe ser de solo letras (entre 2 y 14 caracteres).');
      return false;
    }

    setOriginError(null);
    return true;
  };

  // Validate Destination: EXCLUSIVELY letters & spaces, length 2 to 14 characters
  const validateDestination = (val: string): boolean => {
    const lettersAndSpaces = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    const trimmed = val.trim();

    if (!trimmed) {
      setDestError('El destino es obligatorio.');
      return false;
    }
    if (trimmed.length <= 1 || trimmed.length >= 15 || !lettersAndSpaces.test(trimmed)) {
      setDestError('El destino debe ser de solo letras (entre 2 y 14 caracteres).');
      return false;
    }

    setDestError(null);
    return true;
  };

  // Inclusions checkboxes
  const [incTransport, setIncTransport] = useState(packageToEdit?.inclusions?.transport ?? true);
  const [incHotel, setIncHotel] = useState(packageToEdit?.inclusions?.hotel ?? true);
  const [incBreakfast, setIncBreakfast] = useState(packageToEdit?.inclusions?.breakfast ?? true);
  const [incActivities, setIncActivities] = useState(packageToEdit?.inclusions?.activities ?? true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isTitleValid = validateTitle(title);
    const isOriginValid = validateOrigin(origin);
    const isDestValid = validateDestination(destination);

    if (!isTitleValid || !isOriginValid || !isDestValid) {
      return;
    }

    const stopsArray = intermediateStopsText
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const activitiesArray = activitiesText
      .split(',')
      .map((a) => a.trim())
      .filter((a) => a.length > 0);

    const timesArray = departureTimesText
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const savedPackage: RoutePackage = {
      id: packageToEdit?.id || `pkg-custom-${Date.now()}`,
      title: title.trim(),
      region,
      origin: origin.trim(),
      destination: destination.trim(),
      intermediateStops: stopsArray,
      price: Number(price),
      originalPrice: Number(originalPrice),
      durationDays: Number(durationDays),
      rating: Number(rating),
      reviewsCount: packageToEdit?.reviewsCount || Math.floor(10 + Math.random() * 90),
      imageUrl,
      inclusions: {
        transport: incTransport,
        hotel: incHotel,
        breakfast: incBreakfast,
        activities: incActivities,
      },
      departureTimes: timesArray,
      description,
      hotelName,
      activitiesList: activitiesArray,
      itinerary: packageToEdit?.itinerary || [
        {
          day: 1,
          title: `Salida desde ${origin} a ${destination}`,
          description: `Abordaje en ${origin} o puntos intermedios. Llegada a ${destination} e inicio del itinerario.`,
        },
        {
          day: 2,
          title: 'Retorno Confortable VIP',
          description: `Desayuno y actividades finales antes de abordar de regreso a ${origin}.`,
        },
      ],
    };

    onSavePackage(savedPackage);

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#0D5FA6', '#2180A6', '#37A6A6', '#4BBF9E'],
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-[#2180A6]/30 overflow-hidden">
        {/* Modal Header */}
        <div className="bg-[#0D5FA6] text-white p-4 sm:p-5 flex items-center justify-between shrink-0 border-b border-[#2180A6]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#4BBF9E] text-[#0D5FA6] flex items-center justify-center font-bold text-xl shadow">
              {isEditing ? '✏️' : '➕'}
            </div>
            <div>
              <span className="text-[11px] font-bold text-[#4BBF9E] uppercase tracking-wider block">
                Módulo CRUD de Paquetes Turísticos
              </span>
              <h2 className="text-base sm:text-xl font-bold">
                {isEditing ? 'Editar Paquete / Ruta Existente' : 'Crear Nuevo Paquete Turístico Todo Incluido'}
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

        {/* Modal Form Scrollable Area */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4 text-xs">
          {/* Title */}
          <div className="space-y-1">
            <label className="font-bold text-[#0D5FA6] uppercase tracking-wider flex justify-between">
              <span>Nombre del Paquete / Ruta Turística *</span>
              <span className="text-[10px] text-slate-400 font-normal">(Solo letras, 2 a 14 car.)</span>
            </label>
            <input
              type="text"
              required
              maxLength={14}
              placeholder="Ej. Ruta Baños"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (e.target.value) validateTitle(e.target.value);
              }}
              className={`w-full bg-[#F2F2F2] border rounded-xl px-3 py-2.5 font-bold text-slate-800 text-sm outline-none ${
                titleError ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300 focus:ring-2 focus:ring-[#2180A6]'
              }`}
            />
            {titleError && (
              <p className="text-[11px] font-bold text-rose-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-600" />
                <span>{titleError}</span>
              </p>
            )}
          </div>

          {/* Region, Origin & Destination */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-slate-700">Región del Ecuador *</label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value as any)}
                className="w-full bg-[#F2F2F2] border border-slate-300 rounded-xl px-3 py-2 font-bold text-slate-800 focus:ring-2 focus:ring-[#2180A6] outline-none"
              >
                <option value="Sierra">🏔️ Sierra</option>
                <option value="Costa">🏖️ Costa</option>
                <option value="Amazonía">🌿 Amazonía</option>
                <option value="Insular">🐢 Insular (Galápagos)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700 flex justify-between">
                <span>Origen de Salida *</span>
                <span className="text-[10px] text-slate-400 font-normal">(2-14 car.)</span>
              </label>
              <input
                type="text"
                required
                maxLength={14}
                placeholder="Ej. Quito"
                value={origin}
                onChange={(e) => {
                  setOrigin(e.target.value);
                  if (e.target.value) validateOrigin(e.target.value);
                }}
                className={`w-full bg-[#F2F2F2] border rounded-xl px-3 py-2 font-semibold text-slate-800 outline-none ${
                  originError ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300 focus:ring-2 focus:ring-[#2180A6]'
                }`}
              />
              {originError && (
                <p className="text-[11px] font-bold text-rose-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-600" />
                  <span>{originError}</span>
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700 flex justify-between">
                <span>Destino Turístico *</span>
                <span className="text-[10px] text-slate-400 font-normal">(2-14 car.)</span>
              </label>
              <input
                type="text"
                required
                maxLength={14}
                placeholder="Ej. Baños"
                value={destination}
                onChange={(e) => {
                  setDestination(e.target.value);
                  if (e.target.value) validateDestination(e.target.value);
                }}
                className={`w-full bg-[#F2F2F2] border rounded-xl px-3 py-2 font-semibold text-slate-800 outline-none ${
                  destError ? 'border-rose-500 bg-rose-50/50' : 'border-slate-300 focus:ring-2 focus:ring-[#2180A6]'
                }`}
              />
              {destError && (
                <p className="text-[11px] font-bold text-rose-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-600" />
                  <span>{destError}</span>
                </p>
              )}
            </div>
          </div>

          {/* Intermediate Stops (RF-06) */}
          <div className="space-y-1">
            <label className="font-bold text-[#0D5FA6] uppercase tracking-wider flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#37A6A6]" />
              Paradas Intermedias de Abordaje (RF-06) * (Separadas por comas)
            </label>
            <input
              type="text"
              required
              placeholder="Ej. Tambillo, Machachi, Latacunga, Ambato"
              value={intermediateStopsText}
              onChange={(e) => setIntermediateStopsText(e.target.value)}
              className="w-full bg-[#F2F2F2] border border-slate-300 rounded-xl px-3 py-2 font-semibold text-slate-800 focus:ring-2 focus:ring-[#2180A6] outline-none"
            />
          </div>

          {/* Prices, Duration & Rating */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-slate-700">Precio Oferta ($USD) *</label>
              <input
                type="number"
                required
                min={10}
                max={2000}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full bg-[#F2F2F2] border border-slate-300 rounded-xl px-3 py-2 font-extrabold text-[#0D5FA6] text-sm focus:ring-2 focus:ring-[#2180A6] outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Precio Normal ($USD)</label>
              <input
                type="number"
                min={10}
                max={2500}
                value={originalPrice}
                onChange={(e) => setOriginalPrice(Number(e.target.value))}
                className="w-full bg-[#F2F2F2] border border-slate-300 rounded-xl px-3 py-2 font-semibold text-slate-500 focus:ring-2 focus:ring-[#2180A6] outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Duración (Días) *</label>
              <input
                type="number"
                required
                min={1}
                max={30}
                value={durationDays}
                onChange={(e) => setDurationDays(Number(e.target.value))}
                className="w-full bg-[#F2F2F2] border border-slate-300 rounded-xl px-3 py-2 font-semibold text-slate-800 focus:ring-2 focus:ring-[#2180A6] outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Calificación (1-5)</label>
              <input
                type="number"
                step="0.1"
                min={1}
                max={5}
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full bg-[#F2F2F2] border border-slate-300 rounded-xl px-3 py-2 font-semibold text-slate-800 focus:ring-2 focus:ring-[#2180A6] outline-none"
              />
            </div>
          </div>

          {/* Image Selection */}
          <div className="space-y-1">
            <label className="font-bold text-slate-700">URL de Imagen del Destino</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full bg-[#F2F2F2] border border-slate-300 rounded-xl px-3 py-2 font-semibold text-slate-800 focus:ring-2 focus:ring-[#2180A6] outline-none"
              />
            </div>
            <div className="flex gap-1.5 pt-1 overflow-x-auto">
              {[
                { label: 'Baños', url: '/images/banos.jpg' },
                { label: 'Cotopaxi', url: '/images/cotopaxi.jpg' },
                { label: 'Cuenca', url: '/images/cuenca.jpg' },
                { label: 'Manta', url: '/images/manta.jpg' },
                { label: 'Galápagos', url: '/images/galapagos.jpg' },
                { label: 'Otavalo', url: '/images/otavalo.jpg' },
                { label: 'Tena', url: '/images/tena.jpg' },
                { label: 'Montañita', url: '/images/montanita.jpg' },
                { label: 'Guaranda', url: '/images/guaranda.jpg' },
                { label: 'Puerto López', url: '/images/puerto_lopez.jpg' },
              ].map((img) => (
                <button
                  key={img.url}
                  type="button"
                  onClick={() => setImageUrl(img.url)}
                  className={`text-[10px] font-bold px-2 py-0.5 rounded border transition-colors ${
                    imageUrl === img.url
                      ? 'bg-[#0D5FA6] text-white border-[#0D5FA6]'
                      : 'bg-[#F2F2F2] text-slate-700 border-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {img.label}
                </button>
              ))}
            </div>
          </div>

          {/* Hotel Name & Departure Times */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-slate-700">Hotel Incluido *</label>
              <input
                type="text"
                required
                placeholder="Ej. Hotel El Ángel & Spa"
                value={hotelName}
                onChange={(e) => setHotelName(e.target.value)}
                className="w-full bg-[#F2F2F2] border border-slate-300 rounded-xl px-3 py-2 font-semibold text-slate-800 focus:ring-2 focus:ring-[#2180A6] outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Horarios de Salida (Comas)</label>
              <input
                type="text"
                placeholder="Ej. 06:00 AM, 08:30 AM"
                value={departureTimesText}
                onChange={(e) => setDepartureTimesText(e.target.value)}
                className="w-full bg-[#F2F2F2] border border-slate-300 rounded-xl px-3 py-2 font-semibold text-slate-800 focus:ring-2 focus:ring-[#2180A6] outline-none"
              />
            </div>
          </div>

          {/* Activities List */}
          <div className="space-y-1">
            <label className="font-bold text-slate-700">Actividades Incluidas (Separadas por comas) *</label>
            <input
              type="text"
              required
              placeholder="Ej. Visita a chocolates Salinerito, Mirador al Chimborazo"
              value={activitiesText}
              onChange={(e) => setActivitiesText(e.target.value)}
              className="w-full bg-[#F2F2F2] border border-slate-300 rounded-xl px-3 py-2 font-semibold text-slate-800 focus:ring-2 focus:ring-[#2180A6] outline-none"
            />
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="font-bold text-slate-700">Descripción General *</label>
            <textarea
              required
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#F2F2F2] border border-slate-300 rounded-xl px-3 py-2 font-semibold text-slate-800 focus:ring-2 focus:ring-[#2180A6] outline-none"
            />
          </div>

          {/* Inclusions Checkboxes */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="font-bold text-[#0D5FA6] uppercase tracking-wider block">
              Inclusiones Principales del Paquete (RF-01)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <label className="flex items-center gap-1.5 font-bold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={incTransport}
                  onChange={(e) => setIncTransport(e.target.checked)}
                  className="w-4 h-4 text-[#0D5FA6] rounded"
                />
                <span>🚌 Transporte</span>
              </label>

              <label className="flex items-center gap-1.5 font-bold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={incHotel}
                  onChange={(e) => setIncHotel(e.target.checked)}
                  className="w-4 h-4 text-[#0D5FA6] rounded"
                />
                <span>🏨 Hotel</span>
              </label>

              <label className="flex items-center gap-1.5 font-bold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={incBreakfast}
                  onChange={(e) => setIncBreakfast(e.target.checked)}
                  className="w-4 h-4 text-[#0D5FA6] rounded"
                />
                <span>🍳 Desayunos</span>
              </label>

              <label className="flex items-center gap-1.5 font-bold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={incActivities}
                  onChange={(e) => setIncActivities(e.target.checked)}
                  className="w-4 h-4 text-[#0D5FA6] rounded"
                />
                <span>🎟️ Actividades</span>
              </label>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-[#0D5FA6] hover:bg-[#2180A6] text-white font-extrabold px-6 py-2.5 rounded-xl transition-all shadow-lg flex items-center gap-2 text-sm"
            >
              <Save className="w-4 h-4 text-[#4BBF9E]" />
              <span>{isEditing ? 'Guardar Cambios' : 'Crear Paquete Turístico'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
