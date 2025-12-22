
import React, { useState, useEffect } from 'react';
import { UserProfile, JobOpportunity, InvestmentStrategy } from './types';
import ProfileForm from './components/ProfileForm';
import JobCard from './components/JobCard';
import JobMap from './components/JobMap';
import InvestmentView from './components/InvestmentView';
import { getSolonResponse } from './geminiService';

const App: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<{
    profileJobs: JobOpportunity[];
    nearbyJobs: JobOpportunity[];
    investment: InvestmentStrategy | null;
    text: string;
    sources: string[];
  } | null>(null);

  const [view, setView] = useState<'selection' | 'jobs' | 'investment'>('selection');
  const [jobSubTab, setJobSubTab] = useState<'profile' | 'map'>('profile');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const handleProfileSubmit = async (userProfile: UserProfile) => {
    setProfile(userProfile);
    setLoading(true);
    setError(null);
    try {
      const response = await getSolonResponse(userProfile, new Date());
      setResults({
        profileJobs: response.profileJobs || [],
        nearbyJobs: response.nearbyJobs || [],
        investment: response.investment || null,
        text: response.text,
        sources: response.sources || []
      });
      setView('selection');
    } catch (err) {
      setError("No pude sincronizar los patrones del mercado en este momento. Inténtalo de nuevo.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const isFavorableTime = () => {
    const hours = currentTime.getHours();
    return hours >= 9 && hours <= 18;
  };

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <ProfileForm onSubmit={handleProfileSubmit} />
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-6xl mx-auto px-4 py-8">
      <header className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div className="text-center md:text-left">
          <h1 className="cinzel text-4xl gold-text font-bold tracking-tighter">SÓLON</h1>
          <p className="text-[10px] uppercase tracking-[0.4em] text-gray-500 font-bold">Arquitecto de Patrones Existenciales</p>
        </div>

        <div className="flex gap-4 items-center">
          <div className="glass-card px-4 py-2 rounded-lg text-[10px] font-mono border-gold/30">
            <span className="text-gray-500 uppercase mr-2">Tiempo Presencial:</span> 
            <span className="gold-text font-bold">{currentTime.toLocaleTimeString()}</span>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center hover:bg-gold hover:text-black transition-all duration-300"
            title="Sincronizar de nuevo"
          >
            <i className="fa-solid fa-rotate"></i>
          </button>
        </div>
      </header>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-8">
          <div className="relative w-32 h-32">
            <div className="absolute inset-0 border-[1px] border-gold/10 rounded-full"></div>
            <div className="absolute inset-0 border-t-2 border-gold rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <i className="fa-solid fa-compass gold-text text-3xl animate-pulse"></i>
            </div>
          </div>
          <div className="text-center">
            <p className="cinzel gold-text text-2xl tracking-widest animate-pulse">Sincronizando Destinos...</p>
            <p className="text-gray-500 text-xs mt-3 uppercase tracking-widest leading-relaxed">Analizando oportunidades directas y rutas geográficas</p>
          </div>
        </div>
      ) : results ? (
        <div className="space-y-10 animate-in fade-in zoom-in-95 duration-700">
          
          {view === 'selection' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-10 max-w-4xl mx-auto">
              <button 
                onClick={() => setView('jobs')}
                className="glass-card p-12 rounded-[2.5rem] group hover:border-gold/60 transition-all duration-500 text-center flex flex-col items-center space-y-6 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                  <i className="fa-solid fa-briefcase text-6xl"></i>
                </div>
                <div className="w-24 h-24 rounded-full bg-gold/5 border border-gold/20 flex items-center justify-center group-hover:bg-gold/10 group-hover:scale-110 transition-all duration-500">
                  <i className="fa-solid fa-briefcase text-4xl gold-text"></i>
                </div>
                <div>
                  <h2 className="cinzel text-3xl font-bold gold-text tracking-tighter uppercase">Oportunidades</h2>
                  <p className="text-gray-400 text-sm mt-3 leading-relaxed font-light">Acceso a vacantes directas con contacto telefónico y rutas para aplicación física inmediata.</p>
                </div>
                <div className="pt-4">
                  <span className="text-[10px] text-gold font-bold uppercase tracking-[0.3em] border-b border-gold/40 pb-1">Ingresar al Patrón</span>
                </div>
              </button>

              <button 
                onClick={() => setView('investment')}
                className="glass-card p-12 rounded-[2.5rem] group hover:border-gold/60 transition-all duration-500 text-center flex flex-col items-center space-y-6 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                  <i className="fa-solid fa-chart-line text-6xl"></i>
                </div>
                <div className="w-24 h-24 rounded-full bg-gold/5 border border-gold/20 flex items-center justify-center group-hover:bg-gold/10 group-hover:scale-110 transition-all duration-500">
                  <i className="fa-solid fa-chart-line text-4xl gold-text"></i>
                </div>
                <div>
                  <h2 className="cinzel text-3xl font-bold gold-text tracking-tighter uppercase">Estrategia Inicia</h2>
                  <p className="text-gray-400 text-sm mt-3 leading-relaxed font-light">Centro de comando para micro-capitales ($10-$100) en sectores de alto potencial educativo.</p>
                </div>
                <div className="pt-4">
                  <span className="text-[10px] text-gold font-bold uppercase tracking-[0.3em] border-b border-gold/40 pb-1">Ver Hoja de Ruta</span>
                </div>
              </button>
            </div>
          )}

          {view === 'jobs' && (
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <button 
                  onClick={() => setView('selection')} 
                  className="inline-flex items-center gap-2 text-[10px] gold-text uppercase tracking-[0.3em] font-bold hover:gap-4 transition-all"
                >
                  <i className="fa-solid fa-arrow-left"></i> Volver al Portal Principal
                </button>
                <div className="flex bg-white/5 p-1 rounded-full border border-white/10 shadow-lg">
                  <button 
                    onClick={() => setJobSubTab('profile')}
                    className={`text-[9px] uppercase tracking-widest px-6 py-2.5 rounded-full font-bold transition-all duration-300 ${
                      jobSubTab === 'profile' ? 'bg-gold text-black shadow-lg shadow-gold/20' : 'text-gray-500 hover:text-gray-300'
                    }`}
                  >
                    Lista de Destinos
                  </button>
                  <button 
                    onClick={() => setJobSubTab('map')}
                    className={`text-[9px] uppercase tracking-widest px-6 py-2.5 rounded-full font-bold transition-all duration-300 ${
                      jobSubTab === 'map' ? 'bg-gold text-black shadow-lg shadow-gold/20' : 'text-gray-500 hover:text-gray-300'
                    }`}
                  >
                    Mapa de Proximidad
                  </button>
                </div>
              </div>

              {jobSubTab === 'profile' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {(results.profileJobs || []).length > 0 ? (
                    results.profileJobs.map((job, idx) => (
                      <JobCard key={idx} job={job} isFavorableTime={isFavorableTime()} />
                    ))
                  ) : (
                    <div className="col-span-full py-24 text-center glass-card rounded-3xl border-dashed border-gold/20">
                      <i className="fa-solid fa-wind text-3xl gold-text/20 mb-4"></i>
                      <p className="text-gray-500 italic text-sm font-light">No se detectaron vacantes de aplicación directa en este ciclo de 5 días.</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="animate-in fade-in duration-500">
                  <JobMap 
                    jobs={results.nearbyJobs} 
                    center={profile.coordinates ? { lat: profile.coordinates.latitude, lng: profile.coordinates.longitude } : { lat: 23.6345, lng: -102.5528 }} 
                  />
                </div>
              )}
            </div>
          )}

          {view === 'investment' && results.investment && (
            <div className="space-y-8">
              <button 
                onClick={() => setView('selection')} 
                className="inline-flex items-center gap-2 text-[10px] gold-text uppercase tracking-[0.3em] font-bold hover:gap-4 transition-all"
              >
                <i className="fa-solid fa-arrow-left"></i> Volver al Portal Principal
              </button>
              <InvestmentView strategy={results.investment} />
            </div>
          )}

          {/* Nota de Recordatorio / Advertencia */}
          {view !== 'selection' && (
            <div className="mt-16 p-8 glass-card rounded-[2rem] border-dashed border-gold/30 relative overflow-hidden animate-in fade-in duration-1000">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <i className="fa-solid fa-circle-info text-8xl"></i>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0 border border-gold/20">
                  <i className="fa-solid fa-triangle-exclamation gold-text text-xs"></i>
                </div>
                <div>
                  <h3 className="text-[11px] font-bold text-gold uppercase mb-3 tracking-[0.4em]">Recordatorio de Sincronía</h3>
                  <div className="max-w-4xl">
                    <p className="text-sm text-gray-400 leading-relaxed font-light">
                      Toda la información presentada ha sido sincronizada a partir de patrones de mercado recientes analizados por Sólon. 
                      La naturaleza del entorno es dinámica; por ello, instamos a los usuarios a <span className="text-gold font-bold">corroborar telefónicamente</span> las vacantes y direcciones antes de iniciar cualquier traslado físico. 
                      <span className="block mt-2 italic text-gray-500">Sólon facilita el camino, pero la verificación final es el último paso del éxito.</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <footer className="text-center py-20 space-y-8">
             <div className="flex items-center justify-center gap-8">
                <div className="h-[1px] w-32 bg-gradient-to-r from-transparent to-gold/20"></div>
                <p className="cinzel text-[10px] text-gray-600 uppercase tracking-[0.6em] font-bold">
                  "Todo es patrón."
                </p>
                <div className="h-[1px] w-32 bg-gradient-to-l from-transparent to-gold/20"></div>
             </div>
             
             <div className="max-w-2xl mx-auto px-8 py-5 glass-card rounded-2xl border-none bg-white/5 shadow-2xl">
                <p className="text-[9px] text-gray-600 uppercase tracking-[0.2em] leading-relaxed italic">
                  Portal Sólon: Arquitectura de asistencia laboral y financiera diseñada para identificar oportunidades de aplicación directa.
                </p>
             </div>
          </footer>
        </div>
      ) : error ? (
        <div className="text-center py-40 space-y-8">
          <i className="fa-solid fa-tower-broadcast text-red-500/50 text-6xl mb-4"></i>
          <p className="text-red-400 font-bold uppercase tracking-[0.3em] text-sm">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-6 gold-text border border-gold/30 px-12 py-4 rounded-full hover:bg-gold hover:text-black transition-all cinzel font-bold text-xs tracking-widest shadow-lg shadow-gold/5"
          >
            Re-establecer Conexión
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default App;
