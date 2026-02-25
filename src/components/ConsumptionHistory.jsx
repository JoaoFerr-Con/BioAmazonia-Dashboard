import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styled from 'styled-components';

const ChartContainer = styled.div`
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 24px;
  height: 400px;
  margin-top: 40px;
`;

const data = [
  { mes: 'Set', consumo: 4200 },
  { mes: 'Out', consumo: 4800 },
  { mes: 'Nov', consumo: 5100 },
  { mes: 'Dez', consumo: 4600 },
  { mes: 'Jan', consumo: 5300 },
  { mes: 'Fev', consumo: 4900 },
];

export const ConsumptionHistory = () => (
  <ChartContainer>
    <h3 style={{ marginBottom: '20px', fontSize: '0.9rem', opacity: 0.7 }}>HISTÓRICO DE CONSUMO ESTADUAL (PA)</h3>
    <ResponsiveContainer width="100%" height="90%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorConsumo" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <XAxis dataKey="mes" stroke="rgba(255,255,255,0.3)" fontSize={12} />
        <Tooltip contentStyle={{ background: '#022c22', border: 'none', borderRadius: '8px' }} />
        <Area type="monotone" dataKey="consumo" stroke="#10b981" fillOpacity={1} fill="url(#colorConsumo)" />
      </AreaChart>
    </ResponsiveContainer>
  </ChartContainer>
);