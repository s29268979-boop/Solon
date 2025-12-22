
import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types';

interface ProfileFormProps {
  onSubmit: (profile: UserProfile) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ onSubmit }) => {
  const [profile, setProfile] = useState<UserProfile>({
    country: 'México',
    location: '',
    experience: '',
    skills: '',
    age: 18,
    sex: 'Otro'
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setProfile(prev => ({
          ...prev,
          coordinates: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        }));
      });
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: name === 'age' ? parseInt(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(profile);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 glass-card rounded-2xl shadow-2xl border-gold animate-in fade-in duration-700">
      <div className="text-center mb-8">
        <h1 className="cinzel text-3xl gold-text font-bold mb-2 uppercase tracking-tighter">Portal de Sólon</h1>
        <p className="text-sm text-gray-400 italic">"Identifica tus patrones para reclamar tu destino"</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gold mb-1 uppercase tracking-wider">País de Búsqueda</label>
            <select
              name="country"
              required
              className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-2 focus:border-gold outline-none transition-all"
              value={profile.country}
              onChange={handleChange}
            >
              <option value="México">México</option>
              <option value="Estados Unidos">Estados Unidos (USA)</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gold mb-1 uppercase tracking-wider">Ciudad / Estado / Código Postal</label>
            <input
              type="text"
              name="location"
              required
              placeholder="Ej. Ciudad de México o Los Angeles, CA"
              className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-2 focus:border-gold outline-none transition-all"
              value={profile.location}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gold mb-1 uppercase tracking-wider">Edad</label>
            <input
              type="number"
              name="age"
              min="16"
              max="99"
              required
              className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-2 focus:border-gold outline-none"
              value={profile.age}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gold mb-1 uppercase tracking-wider">Sexo</label>
            <select
              name="sex"
              className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-2 focus:border-gold outline-none"
              value={profile.sex}
              onChange={handleChange}
            >
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gold mb-1 uppercase tracking-wider">Experiencia Laboral (Opcional)</label>
          <textarea
            name="experience"
            placeholder="Describe tus empleos anteriores o escribe 'Ninguna' si es tu primer empleo..."
            className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-2 focus:border-gold outline-none h-20"
            value={profile.experience}
            onChange={handleChange}
          ></textarea>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gold mb-1 uppercase tracking-wider">Habilidades Clave</label>
          <input
            type="text"
            name="skills"
            placeholder="Cocina, Ventas, Excel, Atención al cliente..."
            className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-2 focus:border-gold outline-none"
            value={profile.skills}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="w-full gold-gradient-bg text-black font-bold py-3 rounded-lg hover:brightness-110 active:scale-[0.98] transition-all cinzel tracking-widest"
        >
          DESCIFRAR OPORTUNIDADES
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
