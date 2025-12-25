# FCS API - JavaScript Functions Reference

Quick reference for all available functions in the FCS API JavaScript library.

---

## Authentication Methods

### Method 1: Access Key (Default)

```javascript
// Set in FcsConfig.js
authMethod = 'access_key';
accessKey = 'YOUR_ACCESS_KEY_HERE';

// Or pass directly
const config = FcsConfig.withAccessKey('YOUR_ACCESS_KEY');
const fcsapi = new FcsApi(config);

// Or set after initialization
const fcsapi = new FcsApi();
fcsapi.setAccessKey('YOUR_ACCESS_KEY');
```

### Method 2: IP Whitelist

```javascript
// Set in FcsConfig.js
authMethod = 'ip_whitelist';

// Or use static method
const config = FcsConfig.withIpWhitelist();
const fcsapi = new FcsApi(config);

// Or set after initialization
const fcsapi = new FcsApi();
fcsapi.useIpWhitelist();
```

### Method 3: Token-Based

```javascript
// Set in FcsConfig.js
authMethod = 'token';
publicKey = 'YOUR_PUBLIC_KEY';
token = 'TOKEN_FROM_BACKEND';
tokenExpiry = 1735123456;

// Or use static method
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

### Token Expiry Values
| Seconds | Duration |
|---------|----------|
| 300 | 5 minutes |
| 900 | 15 minutes |
| 1800 | 30 minutes |
| 3600 | 1 hour |
| 86400 | 24 hours |

### Check Token Validity
```javascript
if (!fcsapi.isTokenValid()) {
    // Refresh token from your backend
}
```

---

## Crypto Functions

```javascript
await fcsapi.crypto.getSymbolsList(type, subType, exchange)
await fcsapi.crypto.getCoinsList()
await fcsapi.crypto.getLatestPrice(symbol, period, type, exchange, getProfile)
await fcsapi.crypto.getAllPrices(exchange, period, type)
await fcsapi.crypto.getCoinData(symbol, limit, sortBy)
await fcsapi.crypto.getTopByMarketCap(limit)
await fcsapi.crypto.getTopByRank(limit)
await fcsapi.crypto.convert(pair1, pair2, amount)
await fcsapi.crypto.getBasePrices(symbol, exchange, fallback)
await fcsapi.crypto.getCrossRates(symbol, exchange, type, period, crossrates, fallback)
await fcsapi.crypto.getHistory(symbol, period, length, from, to, page, isChart)
await fcsapi.crypto.getProfile(symbol)
await fcsapi.crypto.getExchanges(type, subType)
await fcsapi.crypto.advanced(params)
await fcsapi.crypto.getMovingAverages(symbol, period, exchange)
await fcsapi.crypto.getIndicators(symbol, period, exchange)
await fcsapi.crypto.getPivotPoints(symbol, period, exchange)
await fcsapi.crypto.getPerformance(symbol, exchange)
await fcsapi.crypto.getTopGainers(exchange, limit, period, type)
await fcsapi.crypto.getTopLosers(exchange, limit, period, type)
await fcsapi.crypto.getHighestVolume(exchange, limit, period, type)
await fcsapi.crypto.getSortedData(sortColumn, sortDirection, limit, type, exchange, period)
await fcsapi.crypto.search(query, type)
await fcsapi.crypto.multiUrl(urls, base)
```

### Parameters
| Parameter | Values |
|-----------|--------|
| `type` | crypto, coin, futures, dex, dominance |
| `subType` | spot, swap, index |
| `exchange` | BINANCE, COINBASE, KRAKEN, BYBIT |
| `period` | 1m, 5m, 15m, 30m, 1h, 4h, 1D, 1W, 1M |
| `sortBy` | perf.rank_asc, perf.market_cap_desc, perf.circulating_supply_desc |
| `sortColumn` | active.c, active.chp, active.v, active.h, active.l, perf.rank, perf.market_cap |
| `sortDirection` | asc, desc |

---

## Forex Functions

```javascript
await fcsapi.forex.getSymbolsList(type, subType, exchange)
await fcsapi.forex.getLatestPrice(symbol, period, type, exchange, getProfile)
await fcsapi.forex.getAllPrices(exchange, period, type)
await fcsapi.forex.getCommodities(symbol, period)
await fcsapi.forex.getCommoditySymbols()
await fcsapi.forex.convert(pair1, pair2, amount, type)
await fcsapi.forex.getBasePrices(symbol, type, exchange, fallback)
await fcsapi.forex.getCrossRates(symbol, type, period, exchange, crossrates, fallback)
await fcsapi.forex.getHistory(symbol, period, length, from, to, page, isChart)
await fcsapi.forex.getProfile(symbol)
await fcsapi.forex.getExchanges(type, subType)
await fcsapi.forex.advanced(params)
await fcsapi.forex.getMovingAverages(symbol, period, exchange)
await fcsapi.forex.getIndicators(symbol, period, exchange)
await fcsapi.forex.getPivotPoints(symbol, period, exchange)
await fcsapi.forex.getPerformance(symbol, exchange)
await fcsapi.forex.getEconomyCalendar(country, from, to)
await fcsapi.forex.getTopGainers(type, limit, period, exchange)
await fcsapi.forex.getTopLosers(type, limit, period, exchange)
await fcsapi.forex.getMostActive(type, limit, period, exchange)
await fcsapi.forex.getSortedData(sortColumn, sortDirection, limit, type, exchange, period)
await fcsapi.forex.search(query, type, exchange)
await fcsapi.forex.multiUrl(urls, base)
```

### Parameters
| Parameter | Values |
|-----------|--------|
| `type` | forex, commodity |
| `subType` | spot, synthetic |
| `exchange` | FX, ONA, SFO, FCM |
| `period` | 1m, 5m, 15m, 30m, 1h, 4h, 1D, 1W, 1M |
| `country` | US, GB, DE, JP, AU, CA |

---

## Stock Functions

```javascript
// Symbol/List
await fcsapi.stock.getSymbolsList(exchange, country, sector, indices)
await fcsapi.stock.search(query, exchange, country)

// Indices
await fcsapi.stock.getIndicesList(country, exchange)
await fcsapi.stock.getIndicesLatest(symbol, country, exchange)

// Latest Prices
await fcsapi.stock.getLatestPrice(symbol, period, exchange, getProfile)
await fcsapi.stock.getAllPrices(exchange, period)
await fcsapi.stock.getLatestByCountry(country, sector, period)
await fcsapi.stock.getLatestByIndices(indices, period)

// Historical
await fcsapi.stock.getHistory(symbol, period, length, from, to, page, isChart)

// Profile & Info
await fcsapi.stock.getProfile(symbol)
await fcsapi.stock.getExchanges(type, subType)

// Financial Data
await fcsapi.stock.getEarnings(symbol, duration)
await fcsapi.stock.getRevenue(symbol)
await fcsapi.stock.getDividends(symbol, format)
await fcsapi.stock.getBalanceSheet(symbol, duration, format)
await fcsapi.stock.getIncomeStatements(symbol, duration, format)
await fcsapi.stock.getCashFlow(symbol, duration, format)
await fcsapi.stock.getStatistics(symbol, duration)
await fcsapi.stock.getForecast(symbol)
await fcsapi.stock.getStockData(symbol, dataColumn, duration, format)

// Technical Analysis
await fcsapi.stock.getMovingAverages(symbol, period)
await fcsapi.stock.getIndicators(symbol, period)
await fcsapi.stock.getPivotPoints(symbol, period)
await fcsapi.stock.getPerformance(symbol)

// Top Movers & Sorting
await fcsapi.stock.getTopGainers(exchange, limit, period, country)
await fcsapi.stock.getTopLosers(exchange, limit, period, country)
await fcsapi.stock.getMostActive(exchange, limit, period, country)
await fcsapi.stock.getSortedData(sortColumn, sortDirection, limit, exchange, country, period)

// Filter
await fcsapi.stock.getBySector(sector, limit, exchange)
await fcsapi.stock.getByCountry(country, limit, exchange)

// Advanced
await fcsapi.stock.advanced(params)
await fcsapi.stock.multiUrl(urls, base)
```

### Parameters
| Parameter | Values |
|-----------|--------|
| `type` | stock, index, fund, structured, dr |
| `subType` | spot, main, cfd, common, preferred |
| `exchange` | NASDAQ, NYSE, LSE, TSE, HKEX, BSE |
| `period` | 1m, 5m, 15m, 30m, 1h, 4h, 1D, 1W, 1M |
| `duration` | annual, interim, both |
| `format` | plain, inherit |
| `dataColumn` | earnings, revenue, profile, dividends, balance_sheet, income_statements, statistics, cash_flow |

---

## Response Handling

```javascript
const response = await fcsapi.forex.getLatestPrice('FX:EURUSD');

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

---

## Common Response Fields

| Field | Description |
|-------|-------------|
| `o` | Open price |
| `h` | High price |
| `l` | Low price |
| `c` | Close/Current price |
| `v` | Volume |
| `t` | Unix timestamp |
| `ch` | Change amount |
| `chp` | Change percentage |

---

## Quick Examples

```javascript
// Initialize (uses settings from FcsConfig.js)
const fcsapi = new FcsApi();

// Or with specific config
const config = FcsConfig.withAccessKey('YOUR_KEY');
const fcsapi = new FcsApi(config);

// Crypto
await fcsapi.crypto.getLatestPrice('BINANCE:BTCUSDT');
await fcsapi.crypto.getHistory('BINANCE:BTCUSDT', '1D', 100);
await fcsapi.crypto.getCoinData(null, 50, 'perf.rank_asc');
await fcsapi.crypto.getTopByMarketCap(100);

// Forex
await fcsapi.forex.getLatestPrice('FX:EURUSD');
await fcsapi.forex.convert('EUR', 'USD', 100);
await fcsapi.forex.getEconomyCalendar('US');

// Stock
await fcsapi.stock.getLatestPrice('NASDAQ:AAPL');
await fcsapi.stock.getTopGainers('NASDAQ', 10);
await fcsapi.stock.getEarnings('NASDAQ:AAPL', 'annual');
await fcsapi.stock.getDividends('NASDAQ:AAPL');
await fcsapi.stock.getBalanceSheet('NASDAQ:AAPL', 'annual');
await fcsapi.stock.getStockData('NASDAQ:AAPL', 'profile,earnings,dividends');
```

---

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
├── FUNCTIONS.md            # This file
├── README.md               # Documentation
└── LICENSE                 # MIT License
```

---

## Get API Key

Get your API key at: https://fcsapi.com/dashboard
