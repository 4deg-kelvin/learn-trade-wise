import React from 'react';
import CandlestickChartWidget from './CandlestickChartWidget';

const ChainlinkCandlestickWidget: React.FC = () => {
  return (
    <CandlestickChartWidget
      coinId="chainlink"
      coinName="Chainlink"
      coinSymbol="LINK"
    />
  );
};

export default ChainlinkCandlestickWidget;

