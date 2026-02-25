import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Droplets, Sun, Wind, Activity, Layers, MousePointer2 } from 'lucide-react';

// --- ESTILOS ADAPTÁVEIS AO TEMA ---

const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 550px;
  background: ${props => props.theme.card};
  border-radius: 40px;
  border: 1px solid ${props => props.theme.border};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05);
  
  background-image: radial-gradient(${props => props.theme.text}15 1px, transparent 1px);
  background-size: 30px 30px;
`;

const HeatmapLayer = styled(motion.div)`
  position: absolute; width: 100%; height: 100%;
  background: 
    radial-gradient(circle at 85% 15%, rgba(239, 68, 68, 0.3) 0%, transparent 40%),
    radial-gradient(circle at 35% 30%, rgba(16, 185, 129, 0.2) 0%, transparent 35%),
    radial-gradient(circle at 78% 55%, rgba(245, 158, 11, 0.25) 0%, transparent 30%);
  pointer-events: none; z-index: 5;
`;

const MiniGuide = styled.div`
  position: absolute; top: 24px; left: 24px; z-index: 15;
  background: ${props => props.theme.card}cc; backdrop-filter: blur(8px);
  padding: 16px; border-radius: 16px; border: 1px solid ${props => props.theme.border};
  color: ${props => props.theme.text};
  .step {
    display: flex; align-items: center; gap: 10px; font-size: 0.65rem; font-weight: 700;
    opacity: 0.4; margin-top: 8px;
    &.active { opacity: 1; color: #10b981; }
    .num { width: 16px; height: 16px; border-radius: 50%; border: 1.5px solid currentColor; display: flex; align-items: center; justify-content: center; font-size: 0.5rem; }
  }
`;

const DataPanel = styled(motion.div)`
  position: absolute; bottom: 100px; right: 24px;;
  background: ${props => props.theme.card}ee; backdrop-filter: blur(12px);
  padding: 20px; border-radius: 20px; border: 1px solid ${props => props.theme.border};
  z-index: 20; color: ${props => props.theme.text};
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  .header { font-size: 0.6rem; color: #10b981; font-weight: 900; margin-bottom: 12px; text-transform: uppercase; display: flex; align-items: center; gap: 8px; }
  .item { display: flex; justify-content: space-between; font-size: 0.7rem; margin-bottom: 8px; span:first-child { opacity: 0.6; } span:last-child { font-weight: 800; } }
`;



const locations = [
  { id: 1, name: 'Belém', x: '85%', y: '15%', level: 'safe', hum: '92%', uv: 'Muito Alto' },
  { id: 2, name: 'Barcarena', x: '82%', y: '22%', level: 'warning', hum: '84%', uv: 'Alto' },
  { id: 3, name: 'Santarém', x: '60%', y: '25%', level: 'safe', hum: '78%', uv: 'Extremo' },
  { id: 4, name: 'Marabá', x: '78%', y: '55%', level: 'safe', hum: '75%', uv: 'Alto' },
  { id: 5, name: 'Altamira', x: '65%', y: '40%', level: 'warning', hum: '88%', uv: 'Muito Alto' },
  { id: 6, name: 'Manaus', x: '35%', y: '30%', level: 'safe', hum: '82%', uv: 'Extremo' },
  { id: 7, name: 'Parintins', x: '48%', y: '28%', level: 'safe', hum: '85%', uv: 'Alto' },
  { id: 8, name: 'Tefé', x: '20%', y: '35%', level: 'warning', hum: '90%', uv: 'Alto' },
  { id: 9, name: 'Itacoatiara', x: '42%', y: '32%', level: 'safe', hum: '83%', uv: 'Muito Alto' }
];

export default function InteractiveMap({ onSelectLocation, selectedLocation }) {
  const [viewMode, setViewMode] = useState('pins');
  const isRegional = selectedLocation === 'regional';
  const activeLoc = locations.find(l => l.name === selectedLocation);

  return (
    <MapContainer>
      <MiniGuide>
        <div style={{fontSize: '0.6rem', fontWeight: 900, opacity: 0.5}}>MONITORAMENTO REGIONAL</div>
        <div className={`step ${isRegional ? 'active' : ''}`}><span className="num">1</span> Visão Pará/AM</div>
        <div className={`step ${!isRegional ? 'active' : ''}`}><span className="num">2</span> Dados Estação: {!isRegional ? selectedLocation : '...'}</div>
      </MiniGuide>

      <div style={{ position: 'absolute', bottom: 24, right: 24, zIndex: 30, display: 'flex', gap: 10 }}>
        
        <button 
            onClick={() => setViewMode('pins')} 
            style={{ 
                background: viewMode === 'pins' ? '#10b981' : props => props.theme.card, 
                color: viewMode === 'pins' ? '#fff' : 'inherit',
                border: '1px solid #e2e8f0', padding: '8px 16px', borderRadius: '12px', fontSize: '0.65rem', fontWeight: 'bold', cursor: 'pointer' 
            }}
        >
            <MousePointer2 size={12} style={{marginRight: 6}} /> PINOS
        </button>
        <button 
            onClick={() => setViewMode('heatmap')} 
            style={{ 
                background: viewMode === 'heatmap' ? '#ef4444' : props => props.theme.card, 
                color: viewMode === 'heatmap' ? '#fff' : 'inherit',
                border: '1px solid #e2e8f0', padding: '8px 16px', borderRadius: '12px', fontSize: '0.65rem', fontWeight: 'bold', cursor: 'pointer' 
            }}
        >
            <Layers size={12} style={{marginRight: 6}} /> CALOR
        </button>
      </div>

      <AnimatePresence>
        {viewMode === 'heatmap' && <HeatmapLayer initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />}
      </AnimatePresence>

      <AnimatePresence>
        {!isRegional && viewMode === 'pins' && activeLoc && (
          <DataPanel initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 20, opacity: 0 }}>
            <div className="header"><Activity size={12} className="animate-pulse" /> Live: {selectedLocation}</div>
            <div className="item"><span><Droplets size={12} /> Umidade</span><span>{activeLoc.hum}</span></div>
            <div className="item"><span><Sun size={12} /> UV</span><span>{activeLoc.uv}</span></div>
            <div className="item"><span><Wind size={12} /> Rede</span><span style={{ color: '#10b981' }}>Estável</span></div>
          </DataPanel>
        )}
      </AnimatePresence>

      {viewMode === 'pins' && locations.map((loc) => {
        const isSelected = selectedLocation === loc.name;
        return (
          <motion.div
            key={loc.id} style={{ position: 'absolute', left: loc.x, top: loc.y, cursor: 'pointer', zIndex: 10 }}
            onClick={() => onSelectLocation(loc.name)} whileHover={{ scale: 1.2 }}
          >
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              whileHover={{ opacity: 1, y: -5 }}
              style={{ position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)', background: '#0f172a', color: '#fff', padding: '4px 8px', borderRadius: '6px', fontSize: '0.5rem', whiteSpace: 'nowrap', pointerEvents: 'none' }}
            >
              {loc.name}
            </motion.div>
            <MapPin 
              size={isSelected ? 44 : 36} 
              color={isSelected ? '#10b981' : (loc.level === 'safe' ? '#10b981' : '#f59e0b')} 
              fill={isSelected ? '#10b98130' : 'transparent'} strokeWidth={isSelected ? 3 : 2}
            />
          </motion.div>
        );
      })}
    </MapContainer>
  );
}