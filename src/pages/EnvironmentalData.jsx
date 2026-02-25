import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Radio, Wind, CloudRain, Droplets, AlertTriangle } from 'lucide-react';

// --- Styled Components ---
const RFContainer = styled.div`
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
  font-family: 'Inter', sans-serif;
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 30px;
`;

const Card = styled(motion.div)`
  background: #0f172a;
  border-radius: 24px;
  padding: 25px;
  border: 1px solid #1e293b;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  border-top: 4px solid ${props => props.color || '#10b981'};
`;

const TerminalCard = styled.div`
  background: #020617;
  border-radius: 16px;
  padding: 20px;
  font-family: 'Fira Code', monospace;
  border: 1px solid #1e293b;
  grid-column: 1 / -1; /* Ocupa a largura toda no grid */
`;

const Value = styled.div`
  font-size: 2.5rem;
  font-weight: 900;
  color: #f8fafc;
  display: flex;
  align-items: baseline;
  gap: 5px;

  span {
    font-size: 1rem;
    opacity: 0.5;
  }
`;

const Badge = styled.span`
  background: ${props => props.bg || 'rgba(16, 185, 129, 0.1)'};
  color: ${props => props.color || '#10b981'};
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 800;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 15px;
`;

// --- Componente Principal ---
export default function EnvironmentalData() {
  const cities = ["Belém", "Barcarena", "Manaus", "Santarém", "Altamira"];
  const [selected, setSelected] = useState(cities[1]); // Começa em Barcarena
  const [logs, setLogs] = useState([]);
  const [data, setData] = useState({ strength: 85, wind: 12, rain: 0 });

  // Simulação de Sensores
  useEffect(() => {
    // 1. Limpa logs antigos ao trocar de cidade para evitar confusão
    setLogs([]); 
    
    const interval = setInterval(() => {
      
      const isBelem = selected === "Belém";
      const newStrength = Math.floor(75 + Math.random() * 20);
      const newWind = Math.floor(isBelem ? 25 + Math.random() * 15 : 5 + Math.random() * 15);
      const newRain = isBelem ? (Math.random() * 60).toFixed(1) : (Math.random() * 5).toFixed(1);

      setData({ strength: newStrength, wind: newWind, rain: newRain });

      const newLog = `[RF-433] Estação ${selected.toUpperCase()}: Sinal ${newStrength}% | Vento ${newWind}km/h | Chuva ${newRain}mm`;
      setLogs(prev => [newLog, ...prev.slice(0, 5)]);
    }, 3000);

    return () => clearInterval(interval);
  }, [selected]); 

  return (
    <RFContainer>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <h1 style={{ color: '#1e293b', margin: 0 }}>Centro de Comando <span style={{ color: '#10b981' }}>RF</span></h1>
          <p style={{ color: '#1e293b', margin: '5px 0' }}>Monitoramento IoT Industrial de Alta Precisão</p>
        </div>
        <select 
          value={selected} 
          onChange={(e) => setSelected(e.target.value)}
          style={{ 
            padding: '12px 24px', 
            borderRadius: '12px', 
            border: '2px solid #10b981', 
            background: '#0f172a', 
            color: '#10b981', 
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          {cities.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <DashboardGrid>
        {/* Card de Sinal */}
        <Card color="#10b981" whileHover={{ y: -5 }}>
          <Badge><Radio size={14} /> SINAL RF</Badge>
          <Value>{data.strength} <span>%</span></Value>
          <p style={{ color: '#64748b', fontSize: '0.8rem' }}>RSSI Estável na Estação {selected}</p>
        </Card>

        {/* Card de Vento */}
        <Card color="#3b82f6" whileHover={{ y: -5 }}>
          <Badge bg="rgba(59, 130, 246, 0.1)" color="#3b82f6"><Wind size={14} /> ANEMÔMETRO</Badge>
          <Value>{data.wind} <span>km/h</span></Value>
          {data.wind > 30 && (
            <div style={{ color: '#ef4444', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 5, marginTop: 10 }}>
              <AlertTriangle size={14} /> <strong>ALERTA:</strong> Rajadas Fortes Detectadas
            </div>
          )}
        </Card>

        {/* Card de Chuva */}
        <Card color="#06b6d4" whileHover={{ y: -5 }}>
          <Badge bg="rgba(6, 182, 212, 0.1)" color="#06b6d4"><CloudRain size={14} /> PLUVIÔMETRO</Badge>
          <Value>{data.rain} <span>mm</span></Value>
          <div style={{ height: 6, background: '#1e293b', borderRadius: 3, marginTop: 15 }}>
            <motion.div 
               initial={{ width: 0 }} 
               animate={{ width: `${Math.min(data.rain, 100)}%` }}
               style={{ height: '100%', background: '#06b6d4', borderRadius: 3 }} 
            />
          </div>
        </Card>

        {/* Terminal de Logs */}
        <TerminalCard>
          <div style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 15, fontSize: '0.8rem' }}>
            <Terminal size={16} /> LIVE_TELEMETRY_STREAM: {selected.toUpperCase()}
          </div>
          <AnimatePresence>
            {logs.map((log, i) => (
              <motion.div 
                key={log + i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                style={{ color: '#a7f3d0', fontSize: '0.8rem', marginBottom: '6px', borderLeft: '2px solid #10b981', paddingLeft: 10 }}
              >
                <span style={{ opacity: 0.4 }}>[{new Date().toLocaleTimeString()}]</span> {log}
              </motion.div>
            ))}
          </AnimatePresence>
        </TerminalCard>
      </DashboardGrid>
    </RFContainer>
  );
}