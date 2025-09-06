import React from 'react';
import CandlestickChartWidget from './CandlestickChartWidget';

const BitcoinCandlestickWidget: React.FC = () => {
  return (
    <CandlestickChartWidget
      coinId="bitcoin"
      coinName="Bitcoin"
      coinSymbol="BTC"
    />
  );
};

export default BitcoinCandlestickWidget;

