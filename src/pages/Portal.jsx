import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FileText, BookOpen, Download, Search, TreeDeciduous, Send } from 'lucide-react';

// --- ESTILOS ADAPTÁVEIS AO TEMA (DARK/LIGHT) ---

const Container = styled.div`
  max-width: 900px;
  margin: 60px auto;
  padding: 0 20px;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  background: ${props => props.theme.card};
  padding: 12px 20px;
  border-radius: 16px;
  border: 1px solid ${props => props.theme.border};
  margin-bottom: 40px;
  gap: 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.02);
  transition: all 0.3s ease;
  
  input {
    border: none;
    outline: none;
    width: 100%;
    font-size: 0.9rem;
    background: transparent;
    color: ${props => props.theme.text};
    &::placeholder { color: #94a3b8; }
  }
`;

const CategoryTitle = styled.h2`
  font-size: 0.75rem;
  font-weight: 800;
  color: #10b981;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin-bottom: 25px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const DocList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 40px;
`;

const DocCard = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${props => props.theme.card};
  padding: 20px 24px;
  border-radius: 20px;
  border: 1px solid ${props => props.theme.border};
  text-decoration: none;
  color: inherit;
  transition: all 0.2s ease;

  &:hover {
    border-color: #10b981;
    transform: translateX(8px);
    background: ${props => props.theme.body};
    .icon-box { background: #f0fdf4; color: #10b981; }
  }

  .info {
    display: flex;
    align-items: center;
    gap: 16px;
    .icon-box {
      width: 44px;
      height: 44px;
      background: ${props => props.theme.body};
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #64748b;
      transition: all 0.2s;
    }
    div {
      h4 { font-size: 0.95rem; font-weight: 700; color: ${props => props.theme.text}; margin: 0; }
      p { font-size: 0.75rem; color: #64748b; margin: 0; }
    }
  }
`;

const ContributionBox = styled.div`
  text-align: center;
  padding: 40px;
  background: ${props => props.theme.card}80;
  backdrop-filter: blur(8px);
  border-radius: 32px;
  border: 2px dashed ${props => props.theme.border};
  color: ${props => props.theme.text};
  
  p { font-size: 0.85rem; color: #64748b; font-weight: 600; margin-bottom: 15px; }
  button {
    background: transparent;
    border: 1px solid #10b981;
    color: #10b981;
    padding: 8px 20px;
    border-radius: 10px;
    font-size: 0.75rem;
    font-weight: 800;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: 0.2s;
    &:hover { background: #10b981; color: white; }
  }
`;

// --- COMPONENTE PRINCIPAL ---

export default function Portal() {
  
  const documents = [
    { title: "Manual de Monitoramento IoT para Barcarena", size: "1.8 MB", date: "Fev 2026", cat: "TECNOLOGIA" },
    { title: "Guia de Sustentabilidade Energética - Belém", size: "2.4 MB", date: "Jan 2026", cat: "URBANISMO" },
    { title: "Relatório de Eficiência COP30: Plano de Ação", size: "5.2 MB", date: "Dez 2025", cat: "GOVERNANÇA" },
    { title: "Boas Práticas: Energia Solar em Santarém", size: "3.1 MB", date: "Jan 2026", cat: "ENERGIA" }
  ];

  return (
    <Container>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '10px' }}>
          Árvore do <span>Conhecimento</span>
        </h1>
        <p style={{ color: '#64748b', marginBottom: '40px' }}>
          Base técnica de documentos e manuais para o desenvolvimento regional sustentável.
        </p>
      </motion.div>

      <SearchBox>
        <Search size={18} color="#94a3b8" />
        <input type="text" placeholder="Buscar manuais, relatórios ou guias técnicos..." />
      </SearchBox>

      <CategoryTitle><TreeDeciduous size={16} /> Navegação Hierárquica</CategoryTitle>
      
      <DocList>
        {documents.map((doc, i) => (
          <DocCard 
            key={i} 
            href="#"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="info">
              <div className="icon-box"><FileText size={20} /></div>
              <div>
                <h4>{doc.title}</h4>
                <p>{doc.date} • {doc.cat} • {doc.size}</p>
              </div>
            </div>
            <Download size={18} color="#94a3b8" />
          </DocCard>
        ))}
      </DocList>

      <ContributionBox>
        <p>Deseja contribuir com o portal? Envie seu material técnico para nossa curadoria.</p>
        <button><Send size={14} /> ENVIAR MATERIAL</button>
      </ContributionBox>
    </Container>
  );
}