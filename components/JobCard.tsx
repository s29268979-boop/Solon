
import React from 'react';
import { JobOpportunity } from '../types';

interface JobCardProps {
  job: JobOpportunity;
  isFavorableTime: boolean;
}

const JobCard: React.FC<JobCardProps> = ({ job, isFavorableTime }) => {
  return (
    <div className="glass-card rounded-2xl p-6 border-l-4 border-l-gold hover:shadow-xl hover:shadow-gold/10 transition-all flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold gold-text leading-tight tracking-tight">{job.companyName}</h3>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1 font-semibold">
            <i className="fa-solid fa-calendar-check mr-1"></i> Patrón detectado hace poco
          </p>
        </div>
        <div className={`flex items-center gap-1 text-[10px] font-bold px-3 py-1 rounded-full uppercase border ${
          job.applicationMethod === 'Presencial' 
            ? 'bg-orange-500/10 text-orange-400 border-orange-500/30' 
            : 'bg-gold/10 text-gold border-gold/30'
        }`}>
          <i className={job.applicationMethod === 'Presencial' ? 'fa-solid fa-door-open' : 'fa-solid fa-building-shield'}></i>
          {job.applicationMethod}
        </div>
      </div>

      <div className="space-y-4 mb-6 flex-grow">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-gold/5 flex items-center justify-center shrink-0">
            <i className="fa-solid fa-location-dot gold-text text-sm"></i>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">Ubicación Física</span>
            <span className="text-sm text-gray-200 leading-snug">{job.address}</span>
          </div>
        </div>

        {job.contactInfo && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-green-500/5 flex items-center justify-center shrink-0">
              <i className="fa-solid fa-phone-volume text-green-500 text-sm"></i>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">Contacto Directo</span>
              <span className="text-sm text-green-400 font-mono font-bold">{job.contactInfo}</span>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg border border-white/10">
          <i className="fa-solid fa-bolt-lightning text-red-500 text-xs"></i>
          <span className="text-[11px] font-bold text-gray-300 uppercase tracking-widest">Urgencia: <span className="text-red-400">{job.urgency}</span></span>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-[10px] text-gray-500 uppercase font-bold mb-2 tracking-widest">Requisitos Clave</p>
        <div className="flex flex-wrap gap-1.5">
          {job.requirements?.map((req, i) => (
            <span key={i} className="text-[9px] bg-gold/5 border border-gold/10 px-2 py-0.5 rounded text-gold/80">
              {req}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-auto space-y-3">
        {job.applicationMethod === 'Presencial' ? (
          <div className="space-y-2">
            <a 
              href={`https://www.google.com/maps/search/${encodeURIComponent(job.companyName + ' ' + job.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center gold-gradient-bg text-black font-bold py-2.5 rounded-xl text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-gold/20"
            >
              <i className="fa-solid fa-route mr-2"></i> Abrir en Mapas
            </a>
            <p className="text-[10px] text-gray-500 text-center italic">Tip: Presentar CV en recepción preguntando por vacantes.</p>
          </div>
        ) : job.officialLink && (
          <a 
            href={job.officialLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center border-2 border-gold gold-text font-bold py-2 rounded-xl text-xs uppercase tracking-widest hover:bg-gold hover:text-black transition-all"
          >
            <i className="fa-solid fa-link mr-2"></i> Portal Oficial de la Empresa
          </a>
        )}
        
        {isFavorableTime && job.applicationMethod === 'Presencial' && (
          <div className="flex items-center justify-center gap-2 text-[9px] text-green-400 font-bold uppercase tracking-widest animate-pulse pt-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
            Negocio Abierto: Recomendado visitar ahora
          </div>
        )}
      </div>
    </div>
  );
};

export default JobCard;
