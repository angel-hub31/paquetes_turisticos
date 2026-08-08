import React from 'react';
import type { RoutePackage } from '../types';
import { Bus, Hotel, Utensils, Compass, Star, MapPin, ArrowRight, Clock, Edit2, Trash2 } from 'lucide-react';

interface PackageCardProps {
  packageData: RoutePackage;
  onSelectPackage: (pkg: RoutePackage) => void;
  onEditPackage?: (pkg: RoutePackage) => void;
  onDeletePackage?: (pkgId: string) => void;
}

export const PackageCard: React.FC<PackageCardProps> = ({
  packageData,
  onSelectPackage,
  onEditPackage,
  onDeletePackage,
}) => {
  const handleDeleteConfirm = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(`¿Estás seguro de que deseas eliminar el paquete "${packageData.title}"?`)) {
      onDeletePackage?.(packageData.id);
    }
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1 relative">
      {/* Image Container with Badges & CRUD Actions */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
        <img
          src={packageData.imageUrl}
          alt={packageData.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            // Graceful fallback to Unsplash tourism image if custom URL fails
            e.currentTarget.src = 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800&auto=format&fit=crop';
          }}
        />


        {/* Gradient Overlay for Text Clarity */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-[#0D5FA6] text-white shadow-md border border-[#2180A6]">
            {packageData.region}
          </span>

          <div className="flex items-center gap-1.5">
            {/* CRUD Quick Edit/Delete buttons */}
            {onEditPackage && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEditPackage(packageData);
                }}
                className="p-1.5 rounded-full bg-white/90 hover:bg-white text-[#0D5FA6] shadow transition-transform hover:scale-110"
                title="Editar este paquete (CRUD)"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
            )}

            {onDeletePackage && (
              <button
                onClick={handleDeleteConfirm}
                className="p-1.5 rounded-full bg-red-500/90 hover:bg-red-600 text-white shadow transition-transform hover:scale-110"
                title="Eliminar este paquete (CRUD)"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}

            <div className="flex items-center gap-1 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full text-xs font-bold text-slate-800 shadow">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{packageData.rating}</span>
              <span className="text-slate-400 text-[10px]">({packageData.reviewsCount})</span>
            </div>
          </div>
        </div>

        {/* Bottom Route Summary on Image */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <div className="flex items-center justify-between text-xs font-semibold text-blue-100">
            <span className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded">
              <Clock className="w-3 h-3 text-[#4BBF9E]" />
              {packageData.durationDays} {packageData.durationDays === 1 ? 'Día' : 'Días'}
            </span>
            <span className="bg-[#4BBF9E] text-[#0D5FA6] font-extrabold px-2 py-0.5 rounded text-xs shadow">
              Todo Incluido
            </span>
          </div>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Title */}
          <h3 className="font-extrabold text-base sm:text-lg text-slate-900 line-clamp-2 leading-snug group-hover:text-[#0D5FA6] transition-colors">
            {packageData.title}
          </h3>

          {/* Route Line Visualization */}
          <div className="bg-[#F2F2F2] rounded-xl p-2.5 border border-slate-200/60 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-[#0D5FA6]">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#37A6A6]" />
                {packageData.origin}
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-[#2180A6]" />
              <span className="flex items-center gap-1 text-[#0D5FA6]">
                <MapPin className="w-3.5 h-3.5 text-[#4BBF9E]" />
                {packageData.destination}
              </span>
            </div>

            {/* Intermediate Stops Counter Badge */}
            {packageData.intermediateStops.length > 0 && (
              <div className="text-[11px] text-[#2180A6] font-medium flex items-center justify-between pt-1 border-t border-slate-200">
                <span>Paradas intermedias:</span>
                <span className="font-bold bg-white text-[#37A6A6] px-1.5 py-0.5 rounded border border-[#37A6A6]/30">
                  {packageData.intermediateStops.length} puntos de abordaje
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Included Services Badges */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#2180A6] block">
            Servicios Incluidos en el Paquete:
          </span>
          <div className="grid grid-cols-2 gap-1.5 text-xs text-slate-700">
            <div className="flex items-center gap-1.5 font-semibold">
              <Bus className="w-3.5 h-3.5 text-[#0D5FA6]" />
              <span>Bus Interprovincial VIP</span>
            </div>
            <div className="flex items-center gap-1.5 font-semibold">
              <Hotel className="w-3.5 h-3.5 text-[#2180A6]" />
              <span>Hotel Confirmado</span>
            </div>
            <div className="flex items-center gap-1.5 font-semibold">
              <Utensils className="w-3.5 h-3.5 text-[#37A6A6]" />
              <span>Desayunos incluidos</span>
            </div>
            <div className="flex items-center gap-1.5 font-semibold">
              <Compass className="w-3.5 h-3.5 text-[#4BBF9E]" />
              <span>Tours & Entradas</span>
            </div>
          </div>
        </div>

        {/* Footer: Price & CTA */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="text-xs text-slate-400 line-through font-medium">
              ${packageData.originalPrice} USD
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-[#0D5FA6]">
                ${packageData.price}
              </span>
              <span className="text-xs font-semibold text-slate-500">USD / pax</span>
            </div>
          </div>

          <button
            onClick={() => onSelectPackage(packageData)}
            className="bg-[#0D5FA6] hover:bg-[#2180A6] text-white font-bold px-4 py-2.5 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-1.5 text-xs sm:text-sm active:scale-95"
          >
            <span>Reservar Ticket</span>
            <ArrowRight className="w-4 h-4 text-[#4BBF9E]" />
          </button>
        </div>
      </div>
    </div>
  );
};
