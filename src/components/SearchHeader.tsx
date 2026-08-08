import React from 'react';
import type { SearchFilterState } from '../types';
import { ECUADOR_CITIES } from '../data/mockData';
import { MapPin, Calendar, Users, Filter, RotateCcw } from 'lucide-react';


interface SearchHeaderProps {
  filters: SearchFilterState;
  setFilters: React.Dispatch<React.SetStateAction<SearchFilterState>>;
  onReset: () => void;
}

export const SearchHeader: React.FC<SearchHeaderProps> = ({
  filters,
  setFilters,
  onReset,
}) => {
  const handleQuickDestination = (city: string) => {
    setFilters((prev) => ({ ...prev, destination: city }));
  };

  const handleCategoryFilter = (cat: string) => {
    setFilters((prev) => ({ ...prev, category: cat }));
  };

  return (
    <div className="bg-[#0D5FA6] text-white pt-6 pb-10 px-4 rounded-b-3xl shadow-xl relative overflow-hidden">
      {/* Background Graphic Accents */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#2180A6]/30 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#37A6A6]/20 blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-6">
        {/* Title & Tagline */}
        <div className="text-center sm:text-left space-y-1">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold bg-[#4BBF9E]/20 text-[#4BBF9E] border border-[#4BBF9E]/30 uppercase tracking-wider mb-2">
            Plataforma Digital de Movilidad y Turismo Ecuador
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Viaja sin terminales, aborda en tu punto ideal.
          </h1>
          <p className="text-blue-100 text-sm sm:text-base max-w-2xl font-normal">
            Paquetes turísticos Todo Incluido (Transporte + Hotel + Desayuno + Actividades) y pasajes interprovinciales directos.
          </p>
        </div>

        {/* FlixBus Style Main Search Bar Box */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-2xl text-slate-800 border border-[#2180A6]/20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {/* Origin Input */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#0D5FA6] flex items-center gap-1.5 uppercase tracking-wide">
                <MapPin className="w-3.5 h-3.5 text-[#37A6A6]" />
                Origen / Salida
              </label>
              <div className="relative">
                <select
                  value={filters.origin}
                  onChange={(e) => setFilters({ ...filters, origin: e.target.value })}
                  className="w-full bg-[#F2F2F2] border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2180A6] transition-all cursor-pointer"
                >
                  <option value="">Todas las salidas</option>
                  {ECUADOR_CITIES.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Destination Input */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#0D5FA6] flex items-center gap-1.5 uppercase tracking-wide">
                <MapPin className="w-3.5 h-3.5 text-[#4BBF9E]" />
                Destino Turístico
              </label>
              <div className="relative">
                <select
                  value={filters.destination}
                  onChange={(e) => setFilters({ ...filters, destination: e.target.value })}
                  className="w-full bg-[#F2F2F2] border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2180A6] transition-all cursor-pointer"
                >
                  <option value="">Todos los destinos</option>
                  {ECUADOR_CITIES.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date Input */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#0D5FA6] flex items-center gap-1.5 uppercase tracking-wide">
                <Calendar className="w-3.5 h-3.5 text-[#2180A6]" />
                Fecha de Viaje
              </label>
              <input
                type="date"
                value={filters.date}
                onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                className="w-full bg-[#F2F2F2] border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2180A6] transition-all cursor-pointer"
              />
            </div>

            {/* Passengers Input */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#0D5FA6] flex items-center gap-1.5 uppercase tracking-wide">
                <Users className="w-3.5 h-3.5 text-[#37A6A6]" />
                Pasajeros
              </label>
              <div className="flex gap-2">
                <select
                  value={filters.passengers}
                  onChange={(e) => setFilters({ ...filters, passengers: Number(e.target.value) })}
                  className="w-full bg-[#F2F2F2] border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2180A6] transition-all cursor-pointer"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 10, 15].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Pasajero' : 'Pasajeros'}
                    </option>
                  ))}
                </select>

                <button
                  onClick={onReset}
                  className="p-2.5 bg-[#F2F2F2] hover:bg-slate-200 text-[#2180A6] rounded-xl transition-colors border border-slate-200 shrink-0"
                  title="Restablecer filtros"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Destination Chips */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-[#2180A6] flex items-center gap-1">
              <Filter className="w-3 h-3 text-[#37A6A6]" /> Destinos populares:
            </span>
            {['Baños de Agua Santa', 'Latacunga / Quilotoa', 'Cuenca', 'Manta'].map((dest) => (
              <button
                key={dest}
                onClick={() => handleQuickDestination(dest)}
                className={`text-xs font-semibold px-2.5 py-1 rounded-full border transition-all ${
                  filters.destination === dest
                    ? 'bg-[#0D5FA6] text-white border-[#0D5FA6] shadow-sm'
                    : 'bg-[#F2F2F2] text-slate-700 hover:bg-[#2180A6]/10 border-slate-200'
                }`}
              >
                {dest}
              </button>
            ))}
          </div>
        </div>

        {/* Regions / Categories Pill Bar */}
        <div className="flex items-center justify-between overflow-x-auto pb-1 gap-2 scrollbar-none">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-blue-100 shrink-0">Región:</span>
            {[
              { id: '', label: 'Todas las Regiones' },
              { id: 'Sierra', label: '🏔️ Sierra & Andes' },
              { id: 'Costa', label: '🏖️ Costa Pacífica' },
              { id: 'Amazonía', label: '🌿 Amazonía' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryFilter(cat.id)}
                className={`text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap transition-all border ${
                  filters.category === cat.id
                    ? 'bg-[#4BBF9E] text-[#0D5FA6] border-[#4BBF9E] shadow'
                    : 'bg-[#2180A6]/40 text-white hover:bg-[#2180A6]/70 border-white/20'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
