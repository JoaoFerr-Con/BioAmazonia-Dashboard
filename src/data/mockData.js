export const CHART_COLORS = {
  success: '#10b981', 
  warning: '#f59e0b', 
  danger: '#ef4444', 
  primary: '#0f172a', 
  secondary: '#64748b'
};

export const regionalData = {
  'regional': {
    title: 'Histórico Integrado (Pará & Amazonas)',
    data: [
      { mes: 'Out', consumo: 9800 }, { mes: 'Nov', consumo: 10100 }, { mes: 'Dez', consumo: 9950 },
      { mes: 'Jan', consumo: 10200 }, { mes: 'Fev', consumo: 10050 }, { mes: 'Mar', consumo: 10400 },
    ],
    matrixData: [
      { name: 'Sustentável', value: 75, color: CHART_COLORS.success },
      { name: 'Fóssil', value: 25, color: CHART_COLORS.warning },
    ],
    cityComparison: [
      { city: 'Manaus', consumo: 8500 }, { city: 'Belém', consumo: 7200 },
      { city: 'Barcarena', consumo: 6800 }, { city: 'Santarém', consumo: 3100 },
    ]
  },
  'Barcarena': {
    title: 'Polo Industrial: Barcarena',
    data: [{ mes: 'Jan', consumo: 3100 }, { mes: 'Fev', consumo: 3050 }, { mes: 'Mar', consumo: 3200 }],
    matrixData: [{ name: 'Renovável', value: 55, color: CHART_COLORS.success }, { name: 'Fóssil', value: 45, color: CHART_COLORS.danger }]
  },
  'Belém': {
    title: 'Consumo Urbano: Belém',
    data: [{ mes: 'Jan', consumo: 1500 }, { mes: 'Fev', consumo: 1600 }, { mes: 'Mar', consumo: 1550 }],
    matrixData: [{ name: 'Renovável', value: 85, color: CHART_COLORS.success }, { name: 'Fóssil', value: 15, color: CHART_COLORS.secondary }]
  },
  'Manaus': {
    title: 'Zona Franca: Manaus',
    data: [{ mes: 'Jan', consumo: 4500 }, { mes: 'Fev', consumo: 4400 }, { mes: 'Mar', consumo: 4600 }],
    matrixData: [{ name: 'Sustentável', value: 70, color: CHART_COLORS.success }, { name: 'Fóssil', value: 30, color: CHART_COLORS.warning }]
  },
  'Santarém': {
    title: 'Expansão Urbana: Santarém',
    data: [{ mes: 'Jan', consumo: 1100 }, { mes: 'Fev', consumo: 1150 }, { mes: 'Mar', consumo: 1200 }],
    matrixData: [{ name: 'Sustentável', value: 90, color: CHART_COLORS.success }, { name: 'Fóssil', value: 10, color: CHART_COLORS.secondary }]
  },
  'Altamira': {
    title: 'Matriz Energética: Altamira',
    data: [{ mes: 'Jan', consumo: 900 }, { mes: 'Fev', consumo: 850 }, { mes: 'Mar', consumo: 950 }],
    matrixData: [{ name: 'Renovável', value: 95, color: CHART_COLORS.success }, { name: 'Fóssil', value: 5, color: CHART_COLORS.secondary }]
  },
  'Marabá': {
    title: 'Polo Siderúrgico: Marabá',
    data: [{ mes: 'Jan', consumo: 2800 }, { mes: 'Fev', consumo: 2700 }, { mes: 'Mar', consumo: 2900 }],
    matrixData: [{ name: 'Renovável', value: 65, color: CHART_COLORS.success }, { name: 'Fóssil', value: 35, color: CHART_COLORS.danger }]
  },
  'Parintins': {
    title: 'Monitoramento: Parintins',
    data: [{ mes: 'Jan', consumo: 600 }, { mes: 'Fev', consumo: 620 }, { mes: 'Mar', consumo: 580 }],
    matrixData: [{ name: 'Renovável', value: 80, color: CHART_COLORS.success }, { name: 'Fóssil', value: 20, color: CHART_COLORS.warning }]
  }
};