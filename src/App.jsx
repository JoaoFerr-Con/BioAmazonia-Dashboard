import React, { useState, useRef } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Zap, Leaf, Droplets, Download, Moon, Sun as SunIcon, 
  BarChart as BarChartIcon, PieChart as PieChartIcon, 
  Wind, Recycle, Sun 
} from 'lucide-react'
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  CartesianGrid, PieChart, Pie, Cell, BarChart, Bar, 
  Legend as RechartsLegend 
} from 'recharts'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'


import InteractiveMap from './components/InteractiveMap'
import TipDetail from './pages/TipDetail'
import Solutions from './pages/Solutions'
import EnvironmentalData from './pages/EnvironmentalData'
import Portal from './pages/Portal'
import { regionalData, CHART_COLORS } from './data/mockData'


const lightTheme = { 
  body: '#f8fafc', text: '#0f172a', textLight: '#64748b', 
  card: '#ffffff', border: '#e2e8f0', accent: '#10b981' 
};

const darkTheme = { 
  body: '#0f172a', text: '#f8fafc', textLight: '#94a3b8', 
  card: '#1e293b', border: '#334155', accent: '#10b981' 
};



const Navbar = styled.nav`
  background: ${props => props.theme.card};
  color: ${props => props.theme.text};
  padding: 10px 40px;
  display: flex; justify-content: space-between; align-items: center;
  position: sticky; top: 0; z-index: 1000;
  border-bottom: 1px solid ${props => props.theme.border};
  transition: all 0.3s ease;
  .brand {
    display: flex; align-items: center; gap: 12px; cursor: pointer; text-decoration: none; color: inherit;
    .logo-box { width: 32px; height: 32px; background: #10b981; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; }
    h1 { font-size: 1.2rem; font-weight: 900; font-style: italic; margin: 0; span { color: #10b981; } }
  }
`;

const NavLinks = styled.div`
  display: flex; gap: 25px; align-items: center;
  a { text-decoration: none; color: ${props => props.theme.text}; font-weight: 800; font-size: 0.75rem; opacity: 0.8; transition: 0.2s; &:hover { opacity: 1; color: #10b981; } }
`;

const StatCard = styled(motion.div)`
  background: ${props => props.theme.card};
  border: 1px solid ${props => props.theme.border};
  border-radius: 24px; padding: 24px; display: flex; align-items: center; gap: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  .icon-box { padding: 12px; background: #f0fdf4; border-radius: 14px; color: #10b981; }
  h3 { font-size: 0.7rem; text-transform: uppercase; color: ${props => props.theme.textLight}; margin: 0; font-weight: 800; }
  p { font-size: 1.6rem; font-weight: 900; margin: 0; color: ${props => props.theme.text}; }
`;

const ChartCard = styled(motion.div)`
  background: ${props => props.theme.card};
  padding: 30px; border-radius: 32px; border: 1px solid ${props => props.theme.border};
  box-shadow: 0 10px 30px rgba(0,0,0,0.02);
  .chart-header { 
    display: flex; align-items: center; gap: 10px; margin-bottom: 30px; 
    h3 { font-size: 0.85rem; font-weight: 800; color: ${props => props.theme.textLight}; margin: 0; text-transform: uppercase; } 
    svg { color: #10b981; } 
  }
`;

const StyledActionLabel = styled.span`
  font-size: 0.75rem; 
  font-weight: 800; 
  color: ${props => props.theme.text}; 
  margin-top: 12px;
  transition: color 0.3s ease;
`;

const ActionCircle = ({ icon: Icon, label, id }) => (
  <Link to={`/detalhes/${id}`} style={{ textDecoration: 'none' }}>
    <motion.div whileHover={{ y: -10 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
      <div 
        style={{ 
          width: '80px', 
          height: '80px', 
          borderRadius: '50%', 
          border: '2px solid #10b981', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          color: '#10b981' 
        }}
      >
        <Icon size={28} />
      </div>
      <StyledActionLabel>{label}</StyledActionLabel>
    </motion.div>
  </Link>
);

const DashboardWrapper = styled.div` max-width: 1200px; margin: 0 auto; padding: 40px 20px; `;
const StatsGrid = styled.div` display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-bottom: 40px; `;
const BottomGrid = styled.div` display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 20px; margin-top: 20px; `;
const ActionsGrid = styled.div` display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-top: 60px; `;

// --- COMPONENTE PRINCIPAL ---

function App() {
  const [selectedCity, setSelectedCity] = useState('regional');
  const [isDark, setIsDark] = useState(false);
  const reportRef = useRef(); 

  const currentData = regionalData[selectedCity] || regionalData['regional'];

  const handleExport = async () => {
    const canvas = await html2canvas(reportRef.current, { 
        scale: 2, 
        backgroundColor: isDark ? '#0f172a' : '#f8fafc',
        useCORS: true 
    });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    pdf.setFontSize(18);
    pdf.setTextColor(16, 185, 129); 
    pdf.text(`RELATÓRIO BIOAMAZÔNIA - ${selectedCity.toUpperCase()}`, 15, 20);
    pdf.addImage(imgData, 'PNG', 10, 30, 190, 140);
    pdf.save(`bioamazonia_${selectedCity.toLowerCase()}.pdf`);
  };

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <BrowserRouter>
        <div style={{ background: isDark ? '#0f172a' : '#f8fafc', color: isDark ? '#f8fafc' : '#0f172a', minHeight: '100vh', transition: '0.3s' }}>
          
          <Navbar>
            <Link to="/" className="brand" onClick={() => setSelectedCity('regional')}>
              <div className="logo-box"><Leaf size={20} /></div>
              <div className="text-content"><h1>BIO<span>AMAZÔNIA</span></h1></div>
            </Link>

            <NavLinks>
              <Link to="/">HOME</Link>
              <Link to="/solucoes">SOLUÇÕES</Link>
              <Link to="/dados">DADOS</Link>
              <Link to="/portal">PORTAL</Link>
            </NavLinks>

            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <button onClick={() => setIsDark(!isDark)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}>
                {isDark ? <SunIcon size={20} /> : <Moon size={20} />}
              </button>
              <button onClick={handleExport} style={{ background: '#0f172a', color: 'white', padding: '8px 16px', borderRadius: '10px', border: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.7rem', fontWeight: 'bold', cursor: 'pointer' }}>
                <Download size={14} /> EXPORTAR
              </button>
            </div>
          </Navbar>

          <Routes>
            <Route path="/" element={
              <DashboardWrapper>
                <div ref={reportRef}>
                  <StatsGrid>
                    <StatCard whileHover={{ y: -5 }}>
                      <div className="icon-box"><Zap size={24} /></div>
                      <div><h3>Consumo Atual</h3><p>9,200 <span style={{fontSize: '0.8rem', opacity: 0.5}}>MWh</span></p></div>
                    </StatCard>
                    <StatCard whileHover={{ y: -5 }}>
                      <div className="icon-box"><Leaf size={24} /></div>
                      <div><h3>Matriz Limpa</h3><p>91 <span style={{fontSize: '0.8rem', opacity: 0.5}}>%</span></p></div>
                    </StatCard>
                    <StatCard whileHover={{ y: -5 }}>
                      <div className="icon-box"><Droplets size={24} /></div>
                      <div><h3>Qualidade Ar</h3><p>Ótima</p></div>
                    </StatCard>
                  </StatsGrid>

                  <main>
                    <InteractiveMap onSelectLocation={setSelectedCity} selectedLocation={selectedCity} />
                    
                    <AnimatePresence mode="wait">
                      <ChartCard key={selectedCity + 'area'} initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{marginTop: '40px', height: '400px'}}>
                        <div className="chart-header"><Zap size={18} /><h3>Tendência de Consumo: {selectedCity}</h3></div>
                        <ResponsiveContainer width="100%" height="85%">
                          <AreaChart data={currentData.data}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#334155' : '#f1f5f9'} />
                            <XAxis dataKey="mes" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip contentStyle={{ background: isDark ? '#1e293b' : '#fff', border: 'none', borderRadius: '12px', color: isDark ? '#fff' : '#000' }} />
                            <Area type="monotone" dataKey="consumo" stroke="#10b981" strokeWidth={4} fill="#10b98120" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </ChartCard>
                    </AnimatePresence>

                    <BottomGrid>
                      {currentData.matrixData && (
                        <ChartCard style={{height: '350px'}}>
                          <div className="chart-header"><PieChartIcon size={18} /><h3>Matriz Energética</h3></div>
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie data={currentData.matrixData} innerRadius={60} outerRadius={80} dataKey="value" paddingAngle={5}>
                                {currentData.matrixData.map((e, i) => <Cell key={i} fill={e.color} />)}
                              </Pie>
                              <Tooltip />
                              <RechartsLegend verticalAlign="bottom" height={36}/>
                            </PieChart>
                          </ResponsiveContainer>
                        </ChartCard>
                      )}

                      {currentData.cityComparison && (
                        <ChartCard style={{height: '350px'}}>
                          <div className="chart-header"><BarChartIcon size={18} /><h3>Comparativo Regional</h3></div>
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={currentData.cityComparison}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#334155' : '#f1f5f9'} />
                              <XAxis dataKey="city" stroke="#94a3b8" fontSize={10} />
                              <Bar dataKey="consumo" fill="#0f172a" radius={[8, 8, 0, 0]} barSize={40} />
                              <Tooltip cursor={{fill: 'transparent'}} />
                            </BarChart>
                          </ResponsiveContainer>
                        </ChartCard>
                      )}
                    </BottomGrid>
                  </main>
                </div>

                <h2 style={{ textAlign: 'center', marginTop: '100px', fontSize: '1rem', color: isDark ? '#94a3b8' : '#64748b', fontWeight: '800' }}>DICAS DE SUSTENTABILIDADE</h2>
                <ActionsGrid>
                  <ActionCircle icon={Droplets} label="ÁGUA" id="agua" />
                  <ActionCircle icon={Sun} label="SOLAR" id="solar" />
                  <ActionCircle icon={Wind} label="VENTO" id="vento" />
                  <ActionCircle icon={Recycle} label="RESÍDUOS" id="residuos" />
                </ActionsGrid>
              </DashboardWrapper>
            } />
            
            <Route path="/solucoes" element={<Solutions />} />
            <Route path="/dados" element={<EnvironmentalData />} />
            <Route path="/portal" element={<Portal />} />
            <Route path="/detalhes/:id" element={<TipDetail />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App