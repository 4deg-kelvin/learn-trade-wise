# Crypto Candlestick Charts

This project now includes professional-grade candlestick charts for cryptocurrencies with multiple timeframes, built using the CoinGecko API and lightweight-charts library.

## Features

### 🕯️ Candlestick Charts
- **Real-time OHLC data** from CoinGecko API
- **Multiple timeframes**: 1 minute, 5 minutes, 10 minutes, 15 minutes, 30 minutes, 1 hour, 1 day, 1 week, 1 month, 1 year
- **Interactive charts** with zoom, pan, and hover tooltips
- **Professional styling** with green/red color scheme for up/down candles
- **Responsive design** that adapts to different screen sizes

### 🪙 Supported Cryptocurrencies
- **Bitcoin (BTC)** - `bitcoin`
- **Ethereum (ETH)** - `ethereum`
- **BNB** - `binancecoin`
- **Solana (SOL)** - `solana`
- **Cardano (ADA)** - `cardano`
- **Polkadot (DOT)** - `polkadot`
- **Chainlink (LINK)** - `chainlink`
- **Avalanche (AVAX)** - `avalanche-2`

### 📊 Chart Features
- **OHLC Data**: Open, High, Low, Close prices
- **Time-based X-axis** with proper formatting
- **Price Y-axis** with USD formatting
- **Auto-refresh** every 5 minutes
- **Error handling** with retry mechanisms
- **Loading states** with skeleton placeholders

## API Integration

### CoinGecko OHLC Endpoint
```
GET https://api.coingecko.com/api/v3/coins/{id}/ohlc?vs_currency=usd&days={days}
```

### Data Format
The API returns an array of arrays:
```javascript
[
  [timestamp, open, high, low, close],
  [timestamp, open, high, low, close],
  // ... more data points
]
```

### Timeframe Granularity
- **1-2 days**: 30-minute candles
- **3-30 days**: 4-hour candles  
- **31+ days**: 4-day candles

### Rate Limits
- **Free tier**: 50 calls/minute
- **Cache**: 15 minutes for all plans
- **Historical data**: 365 days for free tier

## Components Structure

```
src/components/widgets/
├── crypto/
│   ├── CandlestickChartWidget.tsx     # Base candlestick component
│   ├── BitcoinCandlestickWidget.tsx   # Bitcoin-specific wrapper
│   ├── EthereumCandlestickWidget.tsx  # Ethereum-specific wrapper
│   ├── BNBCandlestickWidget.tsx       # BNB-specific wrapper
│   ├── SolanaCandlestickWidget.tsx    # Solana-specific wrapper
│   ├── CardanoCandlestickWidget.tsx   # Cardano-specific wrapper
│   ├── PolkadotCandlestickWidget.tsx  # Polkadot-specific wrapper
│   ├── ChainlinkCandlestickWidget.tsx # Chainlink-specific wrapper
│   └── AvalancheCandlestickWidget.tsx # Avalanche-specific wrapper
├── CryptoCandlestickDashboard.tsx     # Main dashboard component
└── ...
```

## Usage

### Basic Candlestick Chart
```tsx
import CandlestickChartWidget from './components/widgets/crypto/CandlestickChartWidget';

<CandlestickChartWidget
  coinId="bitcoin"
  coinName="Bitcoin"
  coinSymbol="BTC"
/>
```

### Complete Dashboard
```tsx
import CryptoCandlestickDashboard from './components/widgets/CryptoCandlestickDashboard';

<CryptoCandlestickDashboard />
```

## Navigation

The candlestick charts are accessible via:
- **Navigation menu**: "Candlestick Charts" link in the header
- **Homepage**: Featured section with call-to-action button
- **Direct URL**: `/candlestick-charts`

## Dependencies

### New Dependencies
- `lightweight-charts`: Professional financial charting library
- `@tanstack/react-query`: Data fetching and caching

### Existing Dependencies
- `recharts`: Used for other chart types
- `@radix-ui/react-*`: UI components
- `tailwindcss`: Styling

## Error Handling

### API Errors
- **Network failures**: Automatic retry with exponential backoff
- **Rate limiting**: Graceful degradation with user feedback
- **Invalid data**: Fallback to error state with retry option

### Chart Errors
- **Rendering failures**: Error boundary with fallback UI
- **Data validation**: Type checking and format validation
- **User feedback**: Clear error messages and recovery options

## Styling

### CSS Variables
```css
:root {
  --chart-1: 142 76% 36%;  /* Green for up candles */
  --chart-2: 0 84% 60%;    /* Red for down candles */
}

.dark {
  --chart-1: 142 76% 46%;  /* Brighter green for dark mode */
  --chart-2: 0 84% 70%;    /* Brighter red for dark mode */
}
```

### Theme Support
- **Light mode**: Standard green/red color scheme
- **Dark mode**: Brighter colors for better visibility
- **Responsive**: Adapts to container width and height

## Performance

### Optimization Features
- **Data caching**: 1-minute stale time, 5-minute refresh
- **Chart cleanup**: Proper disposal of chart instances
- **Memory management**: Event listener cleanup
- **Lazy loading**: Charts only render when visible

### Bundle Size
- **lightweight-charts**: ~200KB gzipped
- **Tree shaking**: Only imports used chart types
- **Code splitting**: Separate route for chart-heavy pages

## Future Enhancements

### Planned Features
- **Volume bars**: Add volume data to charts
- **Technical indicators**: RSI, MACD, moving averages
- **Drawing tools**: Trend lines, Fibonacci retracements
- **Export functionality**: Save charts as images
- **Custom timeframes**: User-defined intervals
- **Price alerts**: Set notification thresholds

### API Improvements
- **WebSocket support**: Real-time price updates
- **Multiple currencies**: Support for EUR, GBP, etc.
- **Historical data**: Access to older price data
- **Batch requests**: Fetch multiple coins simultaneously

## Troubleshooting

### Common Issues

#### Charts Not Loading
1. Check browser console for API errors
2. Verify CoinGecko API status
3. Check network connectivity
4. Clear browser cache

#### Data Not Updating
1. Verify API rate limits
2. Check query configuration
3. Monitor network requests
4. Review error logs

#### Performance Issues
1. Reduce chart update frequency
2. Limit concurrent API calls
3. Optimize chart options
4. Monitor memory usage

### Debug Mode
Enable debug logging by setting:
```javascript
localStorage.setItem('debug_charts', 'true');
```

## Contributing

### Development Setup
1. Install dependencies: `npm install`
2. Start dev server: `npm run dev`
3. Navigate to `/candlestick-charts`
4. Test different timeframes and coins

### Testing
1. Run build: `npm run build`
2. Check TypeScript compilation
3. Test API endpoints manually
4. Verify chart rendering

### Code Style
- Use TypeScript for type safety
- Follow existing component patterns
- Add proper error handling
- Include loading states
- Write descriptive comments

## License

This project uses the CoinGecko API which has specific usage terms. Please review their [API documentation](https://www.coingecko.com/en/api/documentation) for compliance requirements.

