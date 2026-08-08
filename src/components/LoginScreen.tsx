import React, { useState } from 'react';
import { User, Lock, ShieldCheck, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LoginScreenProps {
  onLoginSuccess: (username: string) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userError, setUserError] = useState<string | null>(null);
  const [passError, setPassError] = useState<string | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);

  // Validate Username: EXCLUSIVELY letters (A-Z, a-z, accents, eñes), length between 2 and 14 characters (mayor a 1 y menor a 15)
  const validateUsername = (value: string): boolean => {
    const letterOnlyRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$/;

    if (!value.trim()) {
      setUserError('El nombre de usuario es obligatorio y no puede quedar vacío.');
      return false;
    }
    if (value.trim().length <= 1) {
      setUserError('El usuario debe tener más de 1 caracter (mínimo 2 letras).');
      return false;
    }
    if (value.trim().length >= 15) {
      setUserError('El usuario debe tener menos de 15 caracteres (máximo 14 letras).');
      return false;
    }
    if (!letterOnlyRegex.test(value.trim())) {
      setUserError('El usuario debe contener EXCLUSIVAMENTE letras (sin números, espacios ni símbolos).');
      return false;
    }

    setUserError(null);
    return true;
  };

  // Validate Password: EXCLUSIVELY numbers (0-9)
  const validatePassword = (value: string): boolean => {
    const numberOnlyRegex = /^[0-9]+$/;

    if (!value.trim()) {
      setPassError('La contraseña es obligatoria y no puede quedar vacía.');
      return false;
    }
    if (!numberOnlyRegex.test(value.trim())) {
      setPassError('La contraseña debe contener EXCLUSIVAMENTE números (dígitos 0 al 9).');
      return false;
    }

    setPassError(null);
    return true;
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setUsername(val);
    if (val) validateUsername(val);
    else setUserError(null);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPassword(val);
    if (val) validatePassword(val);
    else setPassError(null);
  };

  const handleFillDemo = () => {
    setUsername('Admin');
    setPassword('123456');
    setUserError(null);
    setPassError(null);
    setGeneralError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);

    const isUserValid = validateUsername(username);
    const isPassValid = validatePassword(password);

    if (!isUserValid || !isPassValid) {
      setGeneralError('Corrige los errores en rojo antes de enviar el formulario.');
      return;
    }

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#0D5FA6', '#2180A6', '#37A6A6', '#4BBF9E'],
    });

    onLoginSuccess(username.trim());
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 font-sans overflow-hidden bg-slate-900">
      {/* High-Definition Ecuador Tourism Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700 scale-105"
        style={{ backgroundImage: `url('/images/login_bg.jpg')` }}
      />

      {/* Dark Overlay with Brand Gradient & Backdrop Blur for Contrast & Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D5FA6]/90 via-black/60 to-black/70 backdrop-blur-sm" />

      {/* Main Login Card Container */}
      <div className="bg-white/95 backdrop-blur-md max-w-md w-full rounded-3xl shadow-2xl border border-white/30 overflow-hidden relative z-10 animate-fadeIn my-auto">
        {/* Brand Header */}
        <div className="bg-[#0D5FA6] text-white p-6 text-center space-y-2 border-b border-[#2180A6] relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-[#37A6A6]/30 blur-xl pointer-events-none" />
          
          <div className="w-16 h-16 rounded-2xl bg-white text-[#0D5FA6] mx-auto flex items-center justify-center font-bold text-3xl shadow-lg border-2 border-[#4BBF9E] relative z-10">
            🚌
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white relative z-10">
            Movilis<span className="text-[#4BBF9E]">Turismo</span> EC
          </h1>
          <p className="text-xs text-blue-100/90 font-medium relative z-10">
            Plataforma PWA de Transporte & Turismo Ecuador
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
          {/* Demo Credentials Quick Callout */}
          <div className="bg-[#F2F2F2] p-3.5 rounded-2xl border border-[#37A6A6]/40 flex items-center justify-between gap-2 text-xs">
            <div>
              <span className="font-extrabold text-[#0D5FA6] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#4BBF9E]" /> Credenciales de prueba:
              </span>
              <p className="text-slate-600 font-medium text-[11px]">
                Usuario: <strong className="text-slate-900">Admin</strong> (5 letras) | Clave: <strong className="text-slate-900">123456</strong>
              </p>
            </div>
            <button
              type="button"
              onClick={handleFillDemo}
              className="bg-[#37A6A6] hover:bg-[#2180A6] text-white text-[10px] font-bold px-2.5 py-1.5 rounded-lg transition-colors shadow shrink-0 active:scale-95"
            >
              Autocompletar
            </button>
          </div>

          {/* General Error Banner */}
          {generalError && (
            <div className="bg-rose-50 border border-rose-300 text-rose-700 p-3 rounded-xl text-xs font-bold flex items-center gap-2 animate-fadeIn">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{generalError}</span>
            </div>
          )}

          {/* Username Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#0D5FA6] uppercase tracking-wider flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-[#37A6A6]" />
                Nombre de Usuario *
              </span>
              <span className="text-[10px] text-slate-400 font-normal">(Solo letras, 2 a 14 car.)</span>
            </label>
            <div className="relative">
              <input
                type="text"
                required
                maxLength={14}
                placeholder="Ej. Admin"
                value={username}
                onChange={handleUsernameChange}
                className={`w-full bg-[#F2F2F2] border rounded-xl px-3.5 py-3 text-sm font-semibold text-slate-800 outline-none transition-all ${
                  userError
                    ? 'border-rose-500 focus:ring-2 focus:ring-rose-400 bg-rose-50/50'
                    : 'border-slate-300 focus:ring-2 focus:ring-[#2180A6] focus:bg-white'
                }`}
              />
            </div>

            {/* Validation Message */}
            {userError && (
              <p className="text-[11px] font-bold text-rose-600 flex items-center gap-1 pt-0.5">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-600" />
                <span>{userError}</span>
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#0D5FA6] uppercase tracking-wider flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-[#2180A6]" />
                Contraseña Numérica *
              </span>
              <span className="text-[10px] text-slate-400 font-normal">(Solo números)</span>
            </label>
            <div className="relative">
              <input
                type="password"
                required
                inputMode="numeric"
                placeholder="Ej. 123456"
                value={password}
                onChange={handlePasswordChange}
                className={`w-full bg-[#F2F2F2] border rounded-xl px-3.5 py-3 text-sm font-semibold text-slate-800 outline-none transition-all ${
                  passError
                    ? 'border-rose-500 focus:ring-2 focus:ring-rose-400 bg-rose-50/50'
                    : 'border-slate-300 focus:ring-2 focus:ring-[#2180A6] focus:bg-white'
                }`}
              />
            </div>

            {/* Validation Message */}
            {passError && (
              <p className="text-[11px] font-bold text-rose-600 flex items-center gap-1 pt-0.5">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-600" />
                <span>{passError}</span>
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-[#0D5FA6] hover:bg-[#2180A6] text-white font-extrabold py-3.5 rounded-xl text-sm transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 active:scale-98"
            >
              <ShieldCheck className="w-5 h-5 text-[#4BBF9E]" />
              <span>Ingresar a MovilisTurismo</span>
              <ArrowRight className="w-4 h-4 text-[#4BBF9E]" />
            </button>
          </div>

          <p className="text-[11px] text-center text-slate-500 font-medium">
            🔒 Validación estricta: usuario entre 2 y 14 letras, clave exclusivamente numérica.
          </p>
        </form>
      </div>
    </div>
  );
};
