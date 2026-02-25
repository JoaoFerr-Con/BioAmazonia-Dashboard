import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, BookOpen, Info, CheckCircle, Wind, Recycle, Droplets, Sun } from 'lucide-react';



const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 40px;
  @media (max-width: 768px) { grid-template-columns: 1fr; }
`;

const Sidebar = styled.aside`
  background: ${props => props.theme.card};
  padding: 24px;
  border-radius: 24px;
  border: 1px solid ${props => props.theme.border};
  height: fit-content;
  position: sticky;
  top: 100px; /* Ajustado para não bater na Navbar fixa */
  box-shadow: 0 4px 12px rgba(0,0,0,0.02);
  transition: all 0.3s ease;
`;

const TopicLink = styled.button`
  width: 100%;
  text-align: left;
  padding: 12px 16px;
  margin-bottom: 8px;
  border-radius: 12px;
  border: none;
  background: ${props => props.active ? '#f0fdf4' : 'transparent'};
  color: ${props => props.active ? '#10b981' : props.theme.text};
  opacity: ${props => props.active ? 1 : 0.6};
  font-weight: ${props => props.active ? 'bold' : '600'};
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
  &:hover { background: #f0fdf4; color: #10b981; opacity: 1; }
`;

const ContentArea = styled(motion.div)`
  background: ${props => props.theme.card};
  padding: 48px;
  border-radius: 32px;
  border: 1px solid ${props => props.theme.border};
  box-shadow: 0 10px 30px rgba(0,0,0,0.02);
  color: ${props => props.theme.text};
  
  h2 { font-size: 2.2rem; font-weight: 900; margin-bottom: 24px; }
  p { line-height: 1.8; opacity: 0.8; font-size: 1.1rem; margin-bottom: 24px; }
`;

const InfoBox = styled.div`
  margin-top: 40px;
  padding: 24px;
  background: #f0fdf4;
  border-radius: 20px;
  border: 1px solid #dcfce7;
  display: flex;
  gap: 16px;
  color: #166534;
  
  .icon-box { color: #10b981; }
  strong { display: block; font-size: 0.7rem; text-transform: uppercase; margin-bottom: 4px; letter-spacing: 1px; }
  span { font-weight: 700; font-size: 1rem; }
`;



const detailedContent = {
  agua: {
    category: "Gestão Hídrica",
    icon: Droplets,
    topics: [
      { id: 'intro', title: 'Visão Geral', content: 'A gestão hídrica em Barcarena e Belém exige tecnologias que mitiguem desperdícios tanto na indústria quanto no uso doméstico.', data: 'Consumo médio reduzido em 15% em áreas monitoradas.' },
      { id: 'chuva', title: 'Captação de Chuva', content: 'Na Amazônia, o índice pluviométrico é alto. Implementar cisternas de baixo custo pode suprir 40% da demanda doméstica não-potável.', data: 'Potencial de 2.500mm de captação anual.' },
      { id: 'reuso', title: 'Reuso na Indústria', content: 'Tratamento de águas cinzas para resfriamento de máquinas reduz drasticamente a retirada de rios locais.', data: 'Economia de até 30% na conta industrial.' }
    ]
  },
  solar: {
    category: "Energia Solar",
    icon: Sun,
    topics: [
      { id: 'potencial', title: 'Potencial Paraense', content: 'O Pará possui níveis de radiação superiores à média nacional, ideal para sistemas on-grid e off-grid.', data: 'Santarém lidera o ranking de expansão solar no estado.' },
      { id: 'kits', title: 'Kits Fotovoltaicos', content: 'Dimensionar o kit correto para o clima úmido exige inversores com proteção IP67 para evitar oxidação.', data: 'Retorno sobre investimento (ROI) médio de 4.2 anos.' },
      { id: 'manutencao', title: 'Limpeza Técnica', content: 'O acúmulo de poeira e alta umidade pode reduzir a eficiência em 20%. Limpezas semestrais são cruciais.', data: 'Garantia de 95% da performance nominal.' }
    ]
  },
  vento: {
    category: "Ventilação Natural",
    icon: Wind,
    topics: [
      { id: 'conforto', title: 'Conforto Térmico', content: 'Em Belém, a ventilação cruzada é essencial para reduzir a dependência de ar-condicionado e combater a umidade excessiva que causa mofo.', data: 'Redução de até 5°C na sensação térmica interna.' },
      { id: 'chamine', title: 'Efeito Chaminé', content: 'Utilizar aberturas zenitais permite que o ar quente suba e saia, criando um fluxo contínuo de ar fresco vindo da base.', data: 'Economia de 25% no consumo elétrico de refrigeração.' },
      { id: 'eolica', title: 'Exaustão Industrial', content: 'No polo de Barcarena, exaustores eólicos sem consumo de energia são ideais para grandes galpões logísticos.', data: 'Zero custo operacional de energia para ventilação.' }
    ]
  },
  residuos: {
    category: "Gestão de Resíduos",
    icon: Recycle,
    topics: [
      { id: 'reversa', title: 'Logística Reversa', content: 'Estratégias de reciclagem e descarte inteligente de materiais de construção para proteção dos leitos dos rios amazônicos.', data: 'Apenas 2% dos resíduos sólidos são reciclados hoje no PA.' },
      { id: 'composto', title: 'Compostagem Urbana', content: 'Resíduos orgânicos de feiras em Belém e Manaus podem se tornar adubo para agricultura familiar e hortas comunitárias.', data: 'Potencial de desvio de 60% do volume total de aterros.' },
      { id: 'perigosos', title: 'Descarte Industrial', content: 'Protocolos rígidos para resíduos químicos em Barcarena para evitar a contaminação do lençol freático.', data: 'Monitoramento 24h via sensores de impacto ambiental IoT.' }
    ]
  }
};



export default function TipDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  
  const categoryData = detailedContent[id] || detailedContent.agua;
  const [activeTopic, setActiveTopic] = useState(categoryData.topics[0]);
  const CategoryIcon = categoryData.icon;

  return (
    <div style={{ minHeight: '100vh', transition: '0.3s' }}>
      
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px 0' }}>
        <button 
          onClick={() => navigate('/')} 
          style={{ background: 'none', border: 'none', color: '#10b981', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontWeight: '800', fontSize: '0.75rem' }}
        >
          <ArrowLeft size={16} /> VOLTAR AO DASHBOARD
        </button>
      </div>

      <PageContainer>
        
        <Sidebar>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{ padding: 8, background: '#f0fdf4', borderRadius: 10, color: '#10b981' }}>
              <CategoryIcon size={20} />
            </div>
            <span style={{ fontWeight: '900', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#10b981' }}>
              {categoryData.category}
            </span>
          </div>

          <div style={{ marginBottom: '16px', fontSize: '0.65rem', fontWeight: 800, opacity: 0.4, textTransform: 'uppercase' }}>Tópicos Disponíveis</div>
          
          {categoryData.topics.map(topic => (
            <TopicLink 
              key={topic.id} 
              active={activeTopic.id === topic.id}
              onClick={() => setActiveTopic(topic)}
            >
              {topic.title}
            </TopicLink>
          ))}
        </Sidebar>

        
        <AnimatePresence mode="wait">
          <ContentArea
            key={activeTopic.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontWeight: '900', fontSize: '0.7rem', marginBottom: '16px', textTransform: 'uppercase' }}>
              <CheckCircle size={14} /> Guia de Implementação Regional
            </div>
            
            <h2>{activeTopic.title}</h2>
            <p>{activeTopic.content}</p>
            
           
            <InfoBox>
              <div className="icon-box"><Info size={24} /></div>
              <div>
                <strong>Dado Regional e Impacto</strong>
                <span>{activeTopic.data}</span>
              </div>
            </InfoBox>
          </ContentArea>
        </AnimatePresence>
      </PageContainer>
    </div>
  );
}