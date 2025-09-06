import React from 'react';
import CandlestickChartWidget from './CandlestickChartWidget';

const BNBCandlestickWidget: React.FC = () => {
  return (
    <CandlestickChartWidget
      coinId="binancecoin"
      coinName="BNB"
      coinSymbol="BNB"
    />
  );
};

export default BNBCandlestickWidget;

