# FCSAPI - JavaScript & Node.js REST Client

**JavaScript & Node.js** REST API client library for **Forex**, **Cryptocurrency**, and **Stock** market data from [FCS API](https://fcsapi.com).

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![npm version](https://img.shields.io/npm/v/fcsapi-rest.svg)](https://www.npmjs.com/package/fcsapi-rest)

## Features

- **Forex API** - 4000+ currency pairs, real-time rates, commodities, historical data, technical analysis
- **Crypto API** - 50,000+ coins from major exchanges (Binance, Coinbase, etc.), market cap, rank, coin data
- **Stock API** - 125,000+ global stocks, indices, earnings, financials, dividends
- **Multiple Auth Methods** - Access Key, IP Whitelist, or Token-based authentication
- **Easy to Use** - Simple async/await method calls for all API endpoints
- **Universal** - Works in Browser and Node.js (18+)
- **No Dependencies** - Pure JavaScript using native Fetch API

## Installation

### npm (Recommended)
```bash
npm install fcsapi-rest
```

```javascript
// Node.js
const { FcsApi, FcsConfig, FCS_Forex, FCS_Crypto, FCS_Stock } = require('fcsapi-rest');
```

### CDN
```html
<!-- All modules -->
<script src="https://cdn.jsdelivr.net/gh/fcsapi/rest-api-js/src/FcsConfig.js"></script>
<script src="https://cdn.jsdelivr.net/gh/fcsapi/rest-api-js/src/FCS_Forex.js"></script>
<script src="https://cdn.jsdelivr.net/gh/fcsapi/rest-api-js/src/FCS_Crypto.js"></script>
<script src="https://cdn.jsdelivr.net/gh/fcsapi/rest-api-js/src/FCS_Stock.js"></script>
<script src="https://cdn.jsdelivr.net/gh/fcsapi/rest-api-js/src/FcsApi.js"></script>

<!-- OR load only what you need -->
<!-- Forex only -->
<script src="https://cdn.jsdelivr.net/gh/fcsapi/rest-api-js/src/FcsConfig.js"></script>
<script src="https://cdn.jsdelivr.net/gh/fcsapi/rest-api-js/src/FCS_Forex.js"></script>
<script src="https://cdn.jsdelivr.net/gh/fcsapi/rest-api-js/src/FcsApi.js"></script>

<!-- Crypto only -->
<script src="https://cdn.jsdelivr.net/gh/fcsapi/rest-api-js/src/FcsConfig.js"></script>
<script src="https://cdn.jsdelivr.net/gh/fcsapi/rest-api-js/src/FCS_Crypto.js"></script>
<script src="https://cdn.jsdelivr.net/gh/fcsapi/rest-api-js/src/FcsApi.js"></script>

<!-- Stock only -->
<script src="https://cdn.jsdelivr.net/gh/fcsapi/rest-api-js/src/FcsConfig.js"></script>
<script src="https://cdn.jsdelivr.net/gh/fcsapi/rest-api-js/src/FCS_Stock.js"></script>
<script src="https://cdn.jsdelivr.net/gh/fcsapi/rest-api-js/src/FcsApi.js"></script>
```

### Local Files
```html
<script src="src/FcsConfig.js"></script>
<script src="src/FCS_Forex.js"></script>
<script src="src/FcsApi.js"></script>
```

## Quick Start

### Step 1: Configure Authentication

Open `src/FcsConfig.js` and set your authentication method:

```javascript
// Option 1: Access Key (default)
authMethod = 'access_key';
accessKey = 'YOUR_ACCESS_KEY_HERE';

// Option 2: IP Whitelist (no key needed)
authMethod = 'ip_whitelist';

// Option 3: Token-based (from your backend)
authMethod = 'token';
publicKey = 'YOUR_PUBLIC_KEY';
token = 'TOKEN_FROM_BACKEND';
tokenExpiry = 1735123456; // Unix timestamp
```

### Step 2: Use in Your HTML

```html
<script src="src/FcsConfig.js"></script>
<script src="src/FCS_Crypto.js"></script>
<script src="src/FCS_Forex.js"></script>
<script src="src/FCS_Stock.js"></script>
<script src="src/FcsApi.js"></script>
<script>
    // Uses settings from FcsConfig.js
    const fcsapi = new FcsApi();

    // Make API calls
    async function getData() {
        const forex = await fcsapi.forex.getLatestPrice('FX:EURUSD');
        console.log(forex);
    }

    getData();
</script>
```

## Authentication Methods

### Method 1: Access Key (Simple)

Set your API key in FcsConfig.js or pass directly:

```javascript
// In FcsConfig.js
authMethod = 'access_key';
accessKey = 'YOUR_ACCESS_KEY';

// Or pass directly
const config = FcsConfig.withAccessKey('YOUR_ACCESS_KEY');
const fcsapi = new FcsApi(config);

// Or set after initialization
const fcsapi = new FcsApi();
fcsapi.setAccessKey('YOUR_ACCESS_KEY');
```

### Method 2: IP Whitelist (No Key Needed)

If your IP is whitelisted in your FCS API dashboard:

```javascript
// In FcsConfig.js
authMethod = 'ip_whitelist';

// Or use static method
const config = FcsConfig.withIpWhitelist();
const fcsapi = new FcsApi(config);

// Or set after initialization
const fcsapi = new FcsApi();
fcsapi.useIpWhitelist();
```

### Method 3: Token-Based (Secure)

Token generated from your backend (PHP, Node.js, Python, etc.):

```javascript
// Static method
const config = FcsConfig.withToken('PUBLIC_KEY', 'TOKEN', 1735123456);
const fcsapi = new FcsApi(config);

// Or set after initialization
const fcsapi = new FcsApi();
fcsapi.setToken({
    token: 'TOKEN_FROM_BACKEND',
    expiry: 1735123456,
    publicKey: 'YOUR_PUBLIC_KEY'
});
```

### Token Expiry Options
| Seconds | Duration |
|---------|----------|
| 300 | 5 minutes |
| 900 | 15 minutes |
| 1800 | 30 minutes |
| 3600 | 1 hour (default) |
| 86400 | 24 hours |

### Check Token Validity
```javascript
if (!fcsapi.isTokenValid()) {
    // Fetch new token from your backend
    await refreshToken();
}
```

## API Reference

### Forex API (FCS_Forex.js)

```javascript
// Symbol List
await fcsapi.forex.getSymbolsList();                    // All symbols
await fcsapi.forex.getSymbolsList('forex', 'spot');     // Forex spot only

// Latest Prices
await fcsapi.forex.getLatestPrice('EURUSD');
await fcsapi.forex.getLatestPrice('FX:EURUSD,FX:GBPUSD');
await fcsapi.forex.getAllPrices('FX');

// Commodities
await fcsapi.forex.getCommodities();
await fcsapi.forex.getCommodities('XAUUSD');            // Gold
await fcsapi.forex.getCommoditySymbols();

// Currency Converter
await fcsapi.forex.convert('EUR', 'USD', 100);          // 100 EUR to USD

// Base Prices
await fcsapi.forex.getBasePrices('USD');

// Cross Rates
await fcsapi.forex.getCrossRates('USD', 'forex', '1D');

// Historical Data
await fcsapi.forex.getHistory('EURUSD', '1D', 100);
await fcsapi.forex.getHistory('EURUSD', '1h', 300, '2025-01-01', '2025-01-31');

// Profile
await fcsapi.forex.getProfile('EUR');

// Exchanges
await fcsapi.forex.getExchanges();

// Technical Analysis
await fcsapi.forex.getMovingAverages('EURUSD', '1D');
await fcsapi.forex.getIndicators('EURUSD', '1D');
await fcsapi.forex.getPivotPoints('EURUSD', '1D');

// Performance
await fcsapi.forex.getPerformance('EURUSD');

// Economy Calendar
await fcsapi.forex.getEconomyCalendar();
await fcsapi.forex.getEconomyCalendar('US', '2025-01-01', '2025-01-31');

// Top Movers
await fcsapi.forex.getTopGainers('forex', 20);
await fcsapi.forex.getTopLosers('forex', 20);
await fcsapi.forex.getMostActive('forex', 20);

// Search
await fcsapi.forex.search('EUR');

// Advanced Query
await fcsapi.forex.advanced({ type: 'forex', period: '1D', sort_by: 'active.chp_desc' });
```

### Crypto API (FCS_Crypto.js)

```javascript
// Symbol List
await fcsapi.crypto.getSymbolsList('crypto', 'spot', 'BINANCE');
await fcsapi.crypto.getCoinsList();

// Latest Prices
await fcsapi.crypto.getLatestPrice('BINANCE:BTCUSDT');
await fcsapi.crypto.getAllPrices('BINANCE');

// Coin Data (Market Cap, Rank, Supply)
await fcsapi.crypto.getCoinData();
await fcsapi.crypto.getCoinData('BTCUSD', 100, 'perf.rank_asc');
await fcsapi.crypto.getTopByMarketCap(100);
await fcsapi.crypto.getTopByRank(50);

// Crypto Converter
await fcsapi.crypto.convert('BTC', 'USD', 1);
await fcsapi.crypto.convert('ETH', 'BTC', 10);

// Base Prices
await fcsapi.crypto.getBasePrices('BTC');

// Cross Rates
await fcsapi.crypto.getCrossRates('USD', 'BINANCE', 'crypto', '1D');

// Historical Data
await fcsapi.crypto.getHistory('BINANCE:BTCUSDT', '1D', 100);

// Profile
await fcsapi.crypto.getProfile('BTC');

// Exchanges
await fcsapi.crypto.getExchanges();

// Technical Analysis
await fcsapi.crypto.getMovingAverages('BINANCE:BTCUSDT', '1D');
await fcsapi.crypto.getIndicators('BINANCE:BTCUSDT', '1D');
await fcsapi.crypto.getPivotPoints('BINANCE:BTCUSDT', '1D');

// Performance
await fcsapi.crypto.getPerformance('BINANCE:BTCUSDT');

// Top Movers
await fcsapi.crypto.getTopGainers('BINANCE', 20);
await fcsapi.crypto.getTopLosers('BINANCE', 20);
await fcsapi.crypto.getHighestVolume('BINANCE', 20);

// Search
await fcsapi.crypto.search('bitcoin');

// Advanced Query
await fcsapi.crypto.advanced({ type: 'crypto', exchange: 'BINANCE', sort_by: 'active.chp_desc' });
```

### Stock API (FCS_Stock.js)

```javascript
// Symbol List
await fcsapi.stock.getSymbolsList('NASDAQ');
await fcsapi.stock.getSymbolsList(null, 'united-states', 'technology');

// Search
await fcsapi.stock.search('Apple');

// Indices
await fcsapi.stock.getIndicesList('united-states');
await fcsapi.stock.getIndicesLatest('NASDAQ:NDX,SP:SPX');

// Latest Prices
await fcsapi.stock.getLatestPrice('NASDAQ:AAPL');
await fcsapi.stock.getAllPrices('NASDAQ');
await fcsapi.stock.getLatestByCountry('united-states', 'technology');
await fcsapi.stock.getLatestByIndices('NASDAQ:NDX');

// Historical Data
await fcsapi.stock.getHistory('NASDAQ:AAPL', '1D', 100);

// Profile
await fcsapi.stock.getProfile('AAPL');

// Exchanges
await fcsapi.stock.getExchanges();

// Financial Data
await fcsapi.stock.getEarnings('NASDAQ:AAPL', 'annual');
await fcsapi.stock.getRevenue('NASDAQ:AAPL');
await fcsapi.stock.getDividends('NASDAQ:AAPL');
await fcsapi.stock.getBalanceSheet('NASDAQ:AAPL', 'annual');
await fcsapi.stock.getIncomeStatements('NASDAQ:AAPL', 'annual');
await fcsapi.stock.getCashFlow('NASDAQ:AAPL', 'annual');
await fcsapi.stock.getStatistics('NASDAQ:AAPL');
await fcsapi.stock.getForecast('NASDAQ:AAPL');
await fcsapi.stock.getStockData('NASDAQ:AAPL', 'profile,earnings,dividends');

// Technical Analysis
await fcsapi.stock.getMovingAverages('NASDAQ:AAPL', '1D');
await fcsapi.stock.getIndicators('NASDAQ:AAPL', '1D');
await fcsapi.stock.getPivotPoints('NASDAQ:AAPL', '1D');

// Performance
await fcsapi.stock.getPerformance('NASDAQ:AAPL');

// Top Movers
await fcsapi.stock.getTopGainers('NASDAQ', 20);
await fcsapi.stock.getTopLosers('NASDAQ', 20);
await fcsapi.stock.getMostActive('NASDAQ', 20);

// Filter
await fcsapi.stock.getBySector('technology', 50);
await fcsapi.stock.getByCountry('united-states', 50);

// Advanced Query
await fcsapi.stock.advanced({ exchange: 'NASDAQ', sector: 'technology', sort_by: 'active.chp_desc' });
```

## Response Handling

```javascript
const response = await fcsapi.forex.getLatestPrice('EURUSD');

// Check if successful
if (fcsapi.isSuccess()) {
    const data = response.response;
    console.log(data);
} else {
    console.error('Error:', fcsapi.getError());
}

// Get last response
const lastResponse = fcsapi.getLastResponse();

// Get response data only
const data = fcsapi.getResponseData();
```

## Time Periods

| Period | Description |
|--------|-------------|
| `1m` | 1 minute |
| `5m` | 5 minutes |
| `15m` | 15 minutes |
| `30m` | 30 minutes |
| `1h` | 1 hour |
| `4h` | 4 hours |
| `1D` | 1 day |
| `1W` | 1 week |
| `1M` | 1 month |

## Complete Example

```html
<!DOCTYPE html>
<html>
<head>
    <title>FCS API Example</title>
</head>
<body>
    <h1>Forex Rates</h1>
    <div id="result"></div>

    <script src="src/FcsConfig.js"></script>
    <script src="src/FCS_Crypto.js"></script>
    <script src="src/FCS_Forex.js"></script>
    <script src="src/FCS_Stock.js"></script>
    <script src="src/FcsApi.js"></script>
    <script>
        // Method 1: Uses settings from FcsConfig.js
        const fcsapi = new FcsApi();

        // Method 2: Pass config directly
        // const config = FcsConfig.withAccessKey('YOUR_KEY');
        // const fcsapi = new FcsApi(config);

        // Method 3: IP Whitelist
        // const config = FcsConfig.withIpWhitelist();
        // const fcsapi = new FcsApi(config);

        async function loadData() {
            const result = await fcsapi.forex.getLatestPrice('FX:EURUSD');

            if (fcsapi.isSuccess()) {
                const price = result.response[0].active.c;
                document.getElementById('result').innerHTML = 'EUR/USD: ' + price;
            } else {
                document.getElementById('result').innerHTML = 'Error: ' + fcsapi.getError();
            }
        }

        loadData();
    </script>
</body>
</html>
```

## File Structure

```
rest-api-js/
├── src/
│   ├── FcsConfig.js        # Configuration (auth methods)
│   ├── FcsApi.js           # Main client (initializes modules)
│   ├── FCS_Crypto.js       # Crypto module
│   ├── FCS_Forex.js        # Forex module
│   └── FCS_Stock.js        # Stock module
├── examples/
│   ├── forex-example.html  # Forex demo
│   ├── crypto-example.html # Crypto demo
│   └── stock-example.html  # Stock demo
├── FUNCTIONS.md            # Functions reference
├── README.md               # This file
└── LICENSE                 # MIT License
```

## Get API Key

1. Visit [FCS API](https://fcsapi.com)
2. Sign up for a free account
3. Get your API key and Public key from the dashboard

## Documentation

For complete API documentation, visit:
- [Forex API Documentation](https://fcsapi.com/document/forex-api)
- [Crypto API Documentation](https://fcsapi.com/document/crypto-api)
- [Stock API Documentation](https://fcsapi.com/document/stock-api)

## Support

- Email: support@fcsapi.com
- Website: [fcsapi.com](https://fcsapi.com)

## License

MIT License - see [LICENSE](LICENSE) file for details.
