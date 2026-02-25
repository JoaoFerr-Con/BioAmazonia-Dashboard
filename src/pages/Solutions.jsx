import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Cpu, Globe, Database, ShieldCheck, BarChart3, CloudLightning } from 'lucide-react';

const Container = styled.div`
  max-width: 1100px;
  margin: 60px auto;
  padding: 0 20px;
`;

const HeroSection = styled.div`
  text-align: center;
  margin-bottom: 80px;
  h1 { font-size: 3rem; font-weight: 900; color: #0f172a; margin-bottom: 16px; span { color: #10b981; } }
  p { color: #64748b; font-size: 1.2rem; max-width: 600px; margin: 0 auto; line-height: 1.6; }
`;

const SolutionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 30px;
`;

const SolutionCard = styled(motion.div)`
  background: white;
  padding: 40px;
  border-radius: 32px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
  transition: all 0.3s ease;

  .icon-wrapper {
    width: 60px; height: 60px; background: #f0fdf4; border-radius: 16px;
    display: flex; align-items: center; justify-content: center; color: #10b981;
    margin-bottom: 24px;
  }

  h3 { font-size: 1.25rem; font-weight: 800; color: #0f172a; margin-bottom: 12px; }
  p { color: #475569; font-size: 0.95rem; line-height: 1.7; margin-bottom: 20px; }
  
  .badge {
    display: inline-block; padding: 4px 12px; background: #f1f5f9; 
    border-radius: 20px; font-size: 0.7rem; font-weight: 700; color: #64748b;
    text-transform: uppercase; letter-spacing: 0.05em;
  }
`;

const MethodologySection = styled.div`
  margin-top: 100px;
  background: #0f172a;
  border-radius: 40px;
  padding: 60px;
  color: white;
  display: flex;
  align-items: center;
  gap: 60px;
  @media (max-width: 768px) { flex-direction: column; text-align: center; padding: 40px 20px; }

  .text {
    flex: 1;
    h2 { font-size: 2rem; margin-bottom: 20px; }
    p { opacity: 0.7; line-height: 1.8; margin-bottom: 24px; }
  }
`;

export default function Solutions() {
  const solutions = [
    {
      icon: <Cpu size={30} />,
      title: "Monitoramento IoT",
      desc: "Integração de hardware de baixo custo para coleta de dados de consumo em tempo real no Pará e Amazonas.",
      tag: "Hardware & Automação"
    },
    {
      icon: <BarChart3 size={30} />,
      title: "Análise Preditiva",
      desc: "Algoritmos que analisam o histórico regional para prever picos de carga e otimizar a matriz energética.",
      tag: "Data Science"
    },
    {
      icon: <CloudLightning size={30} />,
      title: "Gestão de Matriz Limpa",
      desc: "Painel focado no incentivo e monitoramento da transição para fontes solares e eólicas na região amazônica.",
      tag: "Sustentabilidade"
    }
  ];

  return (
    <Container>
      <HeroSection>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1>Nossas <span>Soluções</span></h1>
          <p>Tecnologia aplicada ao desenvolvimento sustentável da maior floresta tropical do mundo.</p>
        </motion.div>
      </HeroSection>

      <SolutionsGrid>
        {solutions.map((s, i) => (
          <SolutionCard 
            key={i}
            whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="icon-wrapper">{s.icon}</div>
            <div className="badge">{s.tag}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </SolutionCard>
        ))}
      </SolutionsGrid>

      {/* Seção voltada ao seu perfil de Backend e Clean Code */}
      <MethodologySection>
        <div className="text">
          <h2>Arquitetura Escalável</h2>
          <p>
            Diferente de sistemas legados, o BioAmazônia é construído sob os princípios de <strong>Clean Code</strong> e 
            <strong> SOLID</strong>. Nosso ecossistema permite integrações rápidas com APIs em C# e scripts de automação em Python.
          </p>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Database size={20} color="#10b981" /> SQL Server</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Globe size={20} color="#10b981" /> RESTful APIs</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><ShieldCheck size={20} color="#10b981" /> OAuth 2.0</div>
          </div>
        </div>
      </MethodologySection>
    </Container>
  );
}