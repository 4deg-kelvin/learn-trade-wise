import React from 'react';
import CandlestickChartWidget from './CandlestickChartWidget';

const EthereumCandlestickWidget: React.FC = () => {
  return (
    <CandlestickChartWidget
      coinId="ethereum"
      coinName="Ethereum"
      coinSymbol="ETH"
    />
  );
};

export default EthereumCandlestickWidget;

