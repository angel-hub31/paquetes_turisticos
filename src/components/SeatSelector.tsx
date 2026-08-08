import React from 'react';
import { Bus, Check } from 'lucide-react';


interface SeatSelectorProps {
  selectedSeat: string;
  onSelectSeat: (seat: string) => void;
}

export const SeatSelector: React.FC<SeatSelectorProps> = ({
  selectedSeat,
  onSelectSeat,
}) => {
  // Occupied seats for realism
  const occupiedSeats = ['01A', '02B', '05A', '06C', '08D'];

  const rows = ['01', '02', '03', '04', '05', '06', '07', '08'];
  const seatLettersLeft = ['A', 'B'];
  const seatLettersRight = ['C', 'D'];

  return (
    <div className="bg-[#F2F2F2] rounded-2xl p-4 border border-slate-200 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold text-[#0D5FA6] uppercase tracking-wide flex items-center gap-1.5">
          <Bus className="w-4 h-4 text-[#2180A6]" />
          Selecciona tu Asiento en la Unidad VIP
        </h4>

        <div className="flex items-center gap-3 text-[11px] font-semibold">
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-white border border-slate-300" />
            <span>Libre</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-[#4BBF9E]" />
            <span>Seleccionado</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-slate-300" />
            <span>Ocupado</span>
          </div>
        </div>
      </div>

      {/* Bus Front Indicator */}
      <div className="bg-[#0D5FA6] text-white rounded-lg p-2 text-center text-xs font-bold flex items-center justify-between px-4">
        <span>Frente del Bus / Chofer 👨‍✈️</span>
        <span className="text-[#4BBF9E]">Puerta de Abordaje</span>
      </div>

      {/* Seats Layout Grid */}
      <div className="bg-white rounded-xl p-3 border border-slate-200 max-h-56 overflow-y-auto space-y-2">
        {rows.map((row) => (
          <div key={row} className="flex items-center justify-between gap-2">
            {/* Left Pair */}
            <div className="flex gap-2 flex-1 justify-end">
              {seatLettersLeft.map((letter) => {
                const seatId = `${row}${letter}`;
                const isOccupied = occupiedSeats.includes(seatId);
                const isSelected = selectedSeat === seatId;

                return (
                  <button
                    key={seatId}
                    disabled={isOccupied}
                    onClick={() => onSelectSeat(seatId)}
                    className={`w-10 h-10 rounded-lg text-xs font-bold flex flex-col items-center justify-center transition-all border ${
                      isOccupied
                        ? 'bg-slate-200 text-slate-400 border-slate-300 cursor-not-allowed'
                        : isSelected
                        ? 'bg-[#4BBF9E] text-[#0D5FA6] border-[#37A6A6] shadow-md ring-2 ring-[#0D5FA6]'
                        : 'bg-white text-slate-700 hover:bg-[#2180A6]/10 border-slate-200 hover:border-[#2180A6]'
                    }`}
                  >
                    <span>{seatId}</span>
                    {isSelected && <Check className="w-3 h-3 text-[#0D5FA6]" />}
                  </button>
                );
              })}
            </div>

            {/* Aisle */}
            <div className="w-8 text-center text-[10px] font-bold text-slate-300 uppercase">
              Pasillo
            </div>

            {/* Right Pair */}
            <div className="flex gap-2 flex-1 justify-start">
              {seatLettersRight.map((letter) => {
                const seatId = `${row}${letter}`;
                const isOccupied = occupiedSeats.includes(seatId);
                const isSelected = selectedSeat === seatId;

                return (
                  <button
                    key={seatId}
                    disabled={isOccupied}
                    onClick={() => onSelectSeat(seatId)}
                    className={`w-10 h-10 rounded-lg text-xs font-bold flex flex-col items-center justify-center transition-all border ${
                      isOccupied
                        ? 'bg-slate-200 text-slate-400 border-slate-300 cursor-not-allowed'
                        : isSelected
                        ? 'bg-[#4BBF9E] text-[#0D5FA6] border-[#37A6A6] shadow-md ring-2 ring-[#0D5FA6]'
                        : 'bg-white text-slate-700 hover:bg-[#2180A6]/10 border-slate-200 hover:border-[#2180A6]'
                    }`}
                  >
                    <span>{seatId}</span>
                    {isSelected && <Check className="w-3 h-3 text-[#0D5FA6]" />}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
