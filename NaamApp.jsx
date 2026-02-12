import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Camera, Clock, CheckCircle, Home, MapPin } from 'lucide-react';

// Conexión segura
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL, 
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

const NaamApp = () => {
  const [msg, setMsg] = useState('');

  const handleClockIn = async () => {
    const { error } = await supabase.from('asistencia').insert([
      { empleado: 'Nelfi Alvarado', proyecto_id: null, ubicacion: 'Nantucket' }
    ]);
    if (error) setMsg("Error al conectar");
    else setMsg("¡Entrada registrada con éxito!");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 flex flex-col items-center justify-center font-sans">
      <h1 className="text-4xl font-black text-slate-800 mb-2">NAAM</h1>
      <p className="text-slate-500 mb-8 uppercase text-xs tracking-widest font-bold">Finish Carpentry</p>
      
      <button 
        onClick={handleClockIn}
        className="w-full max-w-xs bg-slate-900 text-white py-6 rounded-[32px] shadow-2xl font-black text-xl active:scale-95 transition-all mb-4"
      >
        MARCAR ENTRADA
      </button>

      {msg && <p className="text-blue-600 font-bold animate-pulse">{msg}</p>}

      <div className="mt-10 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center gap-2">
        <MapPin size={16} className="text-slate-400" />
        <span className="text-slate-400 text-sm font-medium">Nantucket, MA</span>
      </div>
    </div>
  );
};

export default NaamApp;