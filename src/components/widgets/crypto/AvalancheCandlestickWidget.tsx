import React from 'react';
import CandlestickChartWidget from './CandlestickChartWidget';

const AvalancheCandlestickWidget: React.FC = () => {
  return (
    <CandlestickChartWidget
      coinId="avalanche-2"
      coinName="Avalanche"
      coinSymbol="AVAX"
    />
  );
};

export default AvalancheCandlestickWidget;

