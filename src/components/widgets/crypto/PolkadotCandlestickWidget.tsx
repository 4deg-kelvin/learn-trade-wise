import React from 'react';
import CandlestickChartWidget from './CandlestickChartWidget';

const PolkadotCandlestickWidget: React.FC = () => {
  return (
    <CandlestickChartWidget
      coinId="polkadot"
      coinName="Polkadot"
      coinSymbol="DOT"
    />
  );
};

export default PolkadotCandlestickWidget;

