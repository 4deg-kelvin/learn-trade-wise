import React from 'react';
import CandlestickChartWidget from './CandlestickChartWidget';

const SolanaCandlestickWidget: React.FC = () => {
  return (
    <CandlestickChartWidget
      coinId="solana"
      coinName="Solana"
      coinSymbol="SOL"
    />
  );
};

export default SolanaCandlestickWidget;

