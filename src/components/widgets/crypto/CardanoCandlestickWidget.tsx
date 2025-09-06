import React from 'react';
import CandlestickChartWidget from './CandlestickChartWidget';

const CardanoCandlestickWidget: React.FC = () => {
  return (
    <CandlestickChartWidget
      coinId="cardano"
      coinName="Cardano"
      coinSymbol="ADA"
    />
  );
};

export default CardanoCandlestickWidget;
