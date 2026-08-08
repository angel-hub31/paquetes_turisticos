import React, { useState } from 'react';
import type { NavigationTab, RoutePackage, TicketBooking, SearchFilterState } from './types';
import { MOCK_PACKAGES, INITIAL_TICKETS } from './data/mockData';
import { Navbar } from './components/Navbar';
import { PwaInstallBanner } from './components/PwaInstallBanner';
import { SearchHeader } from './components/SearchHeader';
import { PackageCard } from './components/PackageCard';
import { PackageDetailModal } from './components/PackageDetailModal';
import { PackageFormModal } from './components/PackageFormModal';
import { PrivateRentalView } from './components/PrivateRentalView';
import { DigitalTicketView } from './components/DigitalTicketView';
import { OperatorScannerView } from './components/OperatorScannerView';
import { PwaSimulatorModal } from './components/PwaSimulatorModal';
import { LoginScreen } from './components/LoginScreen';
import { CustomAlertDialog, type CustomAlertState } from './components/CustomAlertDialog';
import { Plus, RefreshCw } from 'lucide-react';

export const App: React.FC = () => {
  // Auth State (Default false to show Login Access Screen first)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState('Admin');

  // Application State
  const [activeTab, setActiveTab] = useState<NavigationTab>('packages');
  const [packages, setPackages] = useState<RoutePackage[]>(MOCK_PACKAGES);
  const [tickets, setTickets] = useState<TicketBooking[]>(INITIAL_TICKETS);
  const [selectedPackage, setSelectedPackage] = useState<RoutePackage | null>(null);

  // CRUD State
  const [packageToEdit, setPackageToEdit] = useState<RoutePackage | null>(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  const [isMobilePreview, setIsMobilePreview] = useState(false);
  const [isPwaModalOpen, setIsPwaModalOpen] = useState(false);

  // Custom Alert / Confirm Dialog State (Replaces native browser alert/confirm)
  const [alertDialog, setAlertDialog] = useState<CustomAlertState>({
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
  });

  // Search filter state
  const [filters, setFilters] = useState<SearchFilterState>({
    origin: '',
    destination: '',
    date: '',
    passengers: 1,
    category: '',
  });

  const handleLoginSuccess = (username: string) => {
    setCurrentUser(username);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const handleResetFilters = () => {
    setFilters({
      origin: '',
      destination: '',
      date: '',
      passengers: 1,
      category: '',
    });
  };

  const handleConfirmBooking = (newTicket: TicketBooking) => {
    setTickets((prev) => [newTicket, ...prev]);
    setSelectedPackage(null);
    setActiveTab('tickets');
  };

  const handleToggleTicketStatus = (ticketId: string) => {
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          const nextStatus = t.status === 'Boarded' ? 'Confirmed' : 'Boarded';
          return {
            ...t,
            status: nextStatus,
            qrPayload: `${t.ticketCode}|${t.passengerDoc}|${t.intermediatePickup}|${t.seatNumber}|${nextStatus}`,
          };
        }
        return t;
      })
    );
  };

  // CRUD Handlers
  const handleOpenCreateModal = () => {
    setPackageToEdit(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (pkg: RoutePackage) => {
    setPackageToEdit(pkg);
    setIsFormModalOpen(true);
  };

  const handleSavePackage = (savedPkg: RoutePackage) => {
    setPackages((prev) => {
      const exists = prev.some((p) => p.id === savedPkg.id);
      if (exists) {
        return prev.map((p) => (p.id === savedPkg.id ? savedPkg : p));
      }
      return [savedPkg, ...prev];
    });
  };

  const handleDeletePackageConfirm = (pkgId: string) => {
    const pkg = packages.find((p) => p.id === pkgId);
    setAlertDialog({
      isOpen: true,
      title: '¿Eliminar Paquete Turístico?',
      message: `¿Estás seguro de que deseas eliminar permanentemente el paquete "${pkg?.title || ''}" del catálogo activo?`,
      type: 'confirm',
      confirmText: 'Sí, Eliminar',
      cancelText: 'Cancelar',
      onConfirm: () => {
        setPackages((prev) => prev.filter((p) => p.id !== pkgId));
      },
    });
  };

  const handleRestoreInitialData = () => {
    setAlertDialog({
      isOpen: true,
      title: '¿Restablecer Catálogo Base?',
      message: 'Esta acción restaurará los 10 paquetes turísticos iniciales predeterminados de MovilisTurismo.',
      type: 'confirm',
      confirmText: 'Sí, Restablecer',
      cancelText: 'Cancelar',
      onConfirm: () => {
        setPackages(MOCK_PACKAGES);
      },
    });
  };

  // Package Filter Logic
  const filteredPackages = packages.filter((pkg) => {
    const matchesOrigin = !filters.origin || pkg.origin.toLowerCase().includes(filters.origin.toLowerCase());
    const matchesDest =
      !filters.destination ||
      pkg.destination.toLowerCase().includes(filters.destination.toLowerCase()) ||
      pkg.title.toLowerCase().includes(filters.destination.toLowerCase());
    const matchesCat = !filters.category || pkg.region === filters.category;

    return matchesOrigin && matchesDest && matchesCat;
  });

  // If user is not authenticated, show Login Screen first
  if (!isAuthenticated) {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  }

  const mainContent = (
    <div className="min-h-screen bg-[#F2F2F2] flex flex-col font-sans text-slate-800 selection:bg-[#37A6A6] selection:text-white pb-20 md:pb-8">
      {/* Header & Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        ticketCount={tickets.length}
        isMobilePreview={isMobilePreview}
        setIsMobilePreview={setIsMobilePreview}
        onInstallPwa={() => setIsPwaModalOpen(true)}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* PWA Top Banner */}
      <PwaInstallBanner onInstall={() => setIsPwaModalOpen(true)} />

      {/* Dynamic View Switcher */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-4">
        {activeTab === 'packages' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Bus & Package Search Header */}
            <SearchHeader
              filters={filters}
              setFilters={setFilters}
              onReset={handleResetFilters}
            />

            {/* CRUD Management Toolbar & Count */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <div>
                <h2 className="text-xl font-black text-[#0D5FA6] flex items-center gap-2">
                  <span>Catálogo de Paquetes Turísticos ({packages.length} Registros)</span>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#4BBF9E] text-[#0D5FA6]">
                    CRUD Activo
                  </span>
                </h2>
                <p className="text-xs text-slate-500 font-semibold">
                  Filtrados: {filteredPackages.length} paquetes disponibles | Cumpliendo RF-01 y RF-06
                </p>
              </div>

              {/* CRUD Action Buttons */}
              <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
                <button
                  onClick={handleRestoreInitialData}
                  className="p-2.5 rounded-xl bg-[#F2F2F2] hover:bg-slate-200 text-[#2180A6] transition-colors border border-slate-200 text-xs font-bold flex items-center gap-1"
                  title="Restablecer catálogo base de 10 paquetes"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Restablecer 10 Registros</span>
                </button>

                <button
                  onClick={handleOpenCreateModal}
                  className="bg-[#0D5FA6] hover:bg-[#2180A6] text-white font-extrabold px-4 py-2.5 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2 text-xs sm:text-sm active:scale-95 shrink-0"
                >
                  <Plus className="w-4 h-4 text-[#4BBF9E]" />
                  <span>Crear Nuevo Paquete</span>
                </button>
              </div>
            </div>

            {/* Packages Card Grid */}
            {filteredPackages.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPackages.map((pkg) => (
                  <PackageCard
                    key={pkg.id}
                    packageData={pkg}
                    onSelectPackage={(selected) => setSelectedPackage(selected)}
                    onEditPackage={(pkg) => handleOpenEditModal(pkg)}
                    onDeletePackage={(id) => handleDeletePackageConfirm(id)}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-8 text-center space-y-3 max-w-md mx-auto border border-slate-200 shadow">
                <div className="w-14 h-14 rounded-full bg-[#0D5FA6]/10 text-[#0D5FA6] mx-auto flex items-center justify-center text-2xl font-bold">
                  🔍
                </div>
                <h3 className="text-base font-bold text-slate-800">No encontramos coincidencias</h3>
                <p className="text-xs text-slate-500">
                  Prueba cambiando los filtros de origen o creando un nuevo paquete con el botón arriba.
                </p>
                <div className="flex gap-2 justify-center pt-2">
                  <button
                    onClick={handleResetFilters}
                    className="bg-[#F2F2F2] text-slate-700 font-bold px-3 py-2 rounded-xl text-xs border border-slate-300"
                  >
                    Restablecer Filtros
                  </button>

                  <button
                    onClick={handleOpenCreateModal}
                    className="bg-[#0D5FA6] text-white font-bold px-3 py-2 rounded-xl text-xs"
                  >
                    Crear Nuevo Paquete
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'rental' && <PrivateRentalView />}

        {activeTab === 'tickets' && <DigitalTicketView tickets={tickets} />}

        {activeTab === 'operator' && (
          <OperatorScannerView
            tickets={tickets}
            onToggleStatus={handleToggleTicketStatus}
          />
        )}
      </main>

      {/* Booking Detail Modal */}
      {selectedPackage && (
        <PackageDetailModal
          packageData={selectedPackage}
          onClose={() => setSelectedPackage(null)}
          onConfirmBooking={handleConfirmBooking}
        />
      )}

      {/* CRUD Create/Edit Package Modal */}
      <PackageFormModal
        isOpen={isFormModalOpen}
        packageToEdit={packageToEdit}
        onClose={() => setIsFormModalOpen(false)}
        onSavePackage={handleSavePackage}
      />

      {/* PWA Simulator Modal */}
      <PwaSimulatorModal
        isOpen={isPwaModalOpen}
        onClose={() => setIsPwaModalOpen(false)}
      />

      {/* Custom Styled Floating Alert/Confirm Modal (Replaces browser alert/confirm) */}
      <CustomAlertDialog
        dialog={alertDialog}
        onClose={() => setAlertDialog((prev) => ({ ...prev, isOpen: false }))}
      />

      {/* Footer */}
      <footer className="mt-12 bg-[#0D5FA6] text-white py-6 border-t border-[#2180A6]/40 text-center text-xs font-semibold space-y-2">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-sm">MovilisTurismo PWA</span>
            <span className="bg-[#4BBF9E] text-[#0D5FA6] px-2 py-0.5 rounded text-[10px] font-black">
              Ecuador 2026
            </span>
          </div>
          <p className="text-blue-200">
            Usuario Activo: {currentUser} | CRUD Activo ({packages.length} Paquetes) | Requerimientos RF-01, RF-02, RF-04, RF-05 y RF-06
          </p>
        </div>
      </footer>
    </div>
  );

  // If Mobile Device Simulator Preview is enabled
  if (isMobilePreview) {
    return (
      <div className="min-h-screen bg-slate-900 py-6 px-2 flex items-center justify-center">
        {/* Device Frame */}
        <div className="w-full max-w-[420px] h-[880px] bg-slate-950 rounded-[48px] p-3 shadow-2xl border-4 border-slate-700 relative overflow-hidden flex flex-col">
          {/* Top Speaker & Camera Notch */}
          <div className="w-36 h-4 bg-slate-900 rounded-full mx-auto mb-2 shrink-0 flex items-center justify-center gap-2">
            <div className="w-3 h-3 rounded-full bg-slate-800" />
            <div className="w-10 h-1.5 rounded-full bg-slate-800" />
          </div>

          {/* Device Screen Area */}
          <div className="flex-1 bg-[#F2F2F2] rounded-[36px] overflow-y-auto scrollbar-none relative border border-slate-800">
            {mainContent}
          </div>

          {/* Bottom Home Indicator */}
          <div className="w-32 h-1 bg-white/40 rounded-full mx-auto mt-2 shrink-0" />
        </div>
      </div>
    );
  }

  return mainContent;
};

export default App;
