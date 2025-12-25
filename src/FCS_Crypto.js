/**
 * FCS API - Crypto Module
 *
 * @package FcsApi
 * @author FCS API <support@fcsapi.com>
 * @link https://fcsapi.com
 */

class FCS_Crypto {
    constructor(api) {
        this.api = api;
        this.base = 'crypto/';
    }

    // ==================== Symbol List ====================

    /**
     * Get symbols list
     * @param {string} type - crypto, coin, futures, dex, dominance
     * @param {string} subType - spot, swap, index
     * @param {string} exchange - BINANCE, COINBASE, KRAKEN, BYBIT
     */
    async getSymbolsList(type = 'crypto', subType = null, exchange = null) {
        const params = { type };
        if (subType) params.sub_type = subType;
        if (exchange) params.exchange = exchange;
        return this.api.request(this.base + 'list', params);
    }

    /**
     * Get coins list (with market cap)
     */
    async getCoinsList() {
        return this.api.request(this.base + 'list', { type: 'coin' });
    }

    // ==================== Latest Price ====================

    /**
     * Get latest price
     * @param {string} symbol - BINANCE:BTCUSDT, BTCUSDT
     * @param {string} period - 1m, 5m, 15m, 30m, 1h, 4h, 1D, 1W, 1M
     * @param {string} type - crypto, coin
     * @param {string} exchange - BINANCE, COINBASE
     * @param {boolean} getProfile - Include profile data
     */
    async getLatestPrice(symbol, period = null, type = null, exchange = null, getProfile = false) {
        const params = { symbol };
        if (period) params.period = period;
        if (type) params.type = type;
        if (exchange) params.exchange = exchange;
        if (getProfile) params.merge = 'profile';
        return this.api.request(this.base + 'latest', params);
    }

    /**
     * Get all prices from exchange
     * @param {string} exchange - BINANCE, COINBASE
     * @param {string} period - Time period
     * @param {string} type - crypto, coin
     */
    async getAllPrices(exchange = 'BINANCE', period = null, type = 'crypto') {
        const params = { exchange, type };
        if (period) params.period = period;
        return this.api.request(this.base + 'latest', params);
    }

    // ==================== Coin Data (Market Cap, Rank, Supply) ====================

    /**
     * Get coin data with rank, market cap, supply, performance
     * @param {string} symbol - BTCUSD, ETHUSD (optional)
     * @param {number} limit - Number of results
     * @param {string} sortBy - perf.rank_asc, perf.market_cap_desc
     */
    async getCoinData(symbol = null, limit = 100, sortBy = 'perf.rank_asc') {
        const params = {
            type: 'coin',
            sort_by: sortBy,
            per_page: limit,
            merge: 'latest,perf'
        };
        if (symbol) params.symbol = symbol;
        return this.api.request(this.base + 'advance', params);
    }

    /**
     * Get top coins by market cap
     * @param {number} limit - Number of results
     */
    async getTopByMarketCap(limit = 100) {
        return this.getCoinData(null, limit, 'perf.market_cap_desc');
    }

    /**
     * Get top coins by rank
     * @param {number} limit - Number of results
     */
    async getTopByRank(limit = 100) {
        return this.getCoinData(null, limit, 'perf.rank_asc');
    }

    // ==================== Crypto Converter ====================

    /**
     * Convert crypto to fiat or crypto to crypto
     * @param {string} pair1 - From: BTC, ETH
     * @param {string} pair2 - To: USD, EUR, BTC
     * @param {number} amount - Amount to convert
     */
    async convert(pair1, pair2, amount = 1) {
        return this.api.request(this.base + 'converter', {
            pair1, pair2, amount
        });
    }

    // ==================== Base Prices ====================

    /**
     * Get base currency prices
     * @param {string} symbol - BTC, ETH, USD
     * @param {string} exchange - BINANCE, COINBASE
     * @param {string} fallback - Fallback exchange
     */
    async getBasePrices(symbol, exchange = null, fallback = null) {
        const params = { symbol };
        if (exchange) params.exchange = exchange;
        if (fallback) params.fallback = fallback;
        return this.api.request(this.base + 'base_latest', params);
    }

    // ==================== Cross Rates ====================

    /**
     * Get cross rates
     * @param {string} symbol - BTC, ETH, USD
     * @param {string} exchange - BINANCE
     * @param {string} type - crypto
     * @param {string} period - 1D
     * @param {string} crossrates - Specific cross rates
     * @param {string} fallback - Fallback exchange
     */
    async getCrossRates(symbol, exchange = null, type = 'crypto', period = '1D', crossrates = null, fallback = null) {
        const params = { symbol, type, period };
        if (exchange) params.exchange = exchange;
        if (crossrates) params.crossrates = crossrates;
        if (fallback) params.fallback = fallback;
        return this.api.request(this.base + 'crossrate', params);
    }

    // ==================== Historical Data ====================

    /**
     * Get historical candle data
     * @param {string} symbol - BINANCE:BTCUSDT
     * @param {string} period - 1m, 5m, 15m, 30m, 1h, 4h, 1D, 1W, 1M
     * @param {number} length - Number of candles
     * @param {string} from - Start date (YYYY-MM-DD)
     * @param {string} to - End date (YYYY-MM-DD)
     * @param {number} page - Page number
     * @param {boolean} isChart - Return chart format
     */
    async getHistory(symbol, period = '1D', length = 300, from = null, to = null, page = null, isChart = false) {
        const params = { symbol, period, length };
        if (from) params.from = from;
        if (to) params.to = to;
        if (page) params.page = page;
        if (isChart) params.candle = 'chart';
        return this.api.request(this.base + 'history', params);
    }

    // ==================== Profile ====================

    /**
     * Get crypto profile
     * @param {string} symbol - BTC, ETH, SOL
     */
    async getProfile(symbol) {
        return this.api.request(this.base + 'profile', { symbol });
    }

    // ==================== Exchanges ====================

    /**
     * Get list of exchanges
     * @param {string} type - crypto, coin
     * @param {string} subType - spot, swap
     */
    async getExchanges(type = null, subType = null) {
        const params = {};
        if (type) params.type = type;
        if (subType) params.sub_type = subType;
        return this.api.request(this.base + 'exchanges', params);
    }

    // ==================== Technical Analysis ====================

    /**
     * Get Moving Averages (EMA & SMA)
     * @param {string} symbol - BINANCE:BTCUSDT
     * @param {string} period - Time period
     * @param {string} exchange - Exchange
     */
    async getMovingAverages(symbol, period = '1D', exchange = null) {
        const params = { symbol, period };
        if (exchange) params.exchange = exchange;
        return this.api.request(this.base + 'ma', params);
    }

    /**
     * Get Technical Indicators (RSI, MACD, etc.)
     * @param {string} symbol - BINANCE:BTCUSDT
     * @param {string} period - Time period
     * @param {string} exchange - Exchange
     */
    async getIndicators(symbol, period = '1D', exchange = null) {
        const params = { symbol, period };
        if (exchange) params.exchange = exchange;
        return this.api.request(this.base + 'indicators', params);
    }

    /**
     * Get Pivot Points
     * @param {string} symbol - BINANCE:BTCUSDT
     * @param {string} period - Time period
     * @param {string} exchange - Exchange
     */
    async getPivotPoints(symbol, period = '1D', exchange = null) {
        const params = { symbol, period };
        if (exchange) params.exchange = exchange;
        return this.api.request(this.base + 'pivot_points', params);
    }

    // ==================== Performance ====================

    /**
     * Get performance data (highs, lows, volatility)
     * @param {string} symbol - BINANCE:BTCUSDT
     * @param {string} exchange - Exchange
     */
    async getPerformance(symbol, exchange = null) {
        const params = { symbol };
        if (exchange) params.exchange = exchange;
        return this.api.request(this.base + 'performance', params);
    }

    // ==================== Top Movers ====================

    /**
     * Get top gainers
     * @param {string} exchange - BINANCE
     * @param {number} limit - Number of results
     * @param {string} period - Time period
     * @param {string} type - crypto, coin
     */
    async getTopGainers(exchange = null, limit = 20, period = '1D', type = 'crypto') {
        return this.getSortedData('active.chp', 'desc', limit, type, exchange, period);
    }

    /**
     * Get top losers
     * @param {string} exchange - BINANCE
     * @param {number} limit - Number of results
     * @param {string} period - Time period
     * @param {string} type - crypto, coin
     */
    async getTopLosers(exchange = null, limit = 20, period = '1D', type = 'crypto') {
        return this.getSortedData('active.chp', 'asc', limit, type, exchange, period);
    }

    /**
     * Get highest volume
     * @param {string} exchange - BINANCE
     * @param {number} limit - Number of results
     * @param {string} period - Time period
     * @param {string} type - crypto, coin
     */
    async getHighestVolume(exchange = null, limit = 20, period = '1D', type = 'crypto') {
        return this.getSortedData('active.v', 'desc', limit, type, exchange, period);
    }

    /**
     * Get sorted data
     * @param {string} sortColumn - Column to sort by
     * @param {string} sortDirection - asc, desc
     * @param {number} limit - Number of results
     * @param {string} type - crypto, coin
     * @param {string} exchange - Exchange
     * @param {string} period - Time period
     */
    async getSortedData(sortColumn, sortDirection, limit = 20, type = 'crypto', exchange = null, period = '1D') {
        const params = {
            type,
            period,
            sort_by: sortColumn + '_' + sortDirection,
            per_page: limit,
            merge: 'latest'
        };
        if (exchange) params.exchange = exchange;
        return this.api.request(this.base + 'advance', params);
    }

    // ==================== Search ====================

    /**
     * Search crypto symbols
     * @param {string} query - Search query
     * @param {string} type - crypto, coin
     */
    async search(query, type = null) {
        const params = { search: query };
        if (type) params.type = type;
        return this.api.request(this.base + 'search', params);
    }

    // ==================== Advanced Query ====================

    /**
     * Advanced query with custom parameters
     * @param {object} params - Custom parameters
     */
    async advanced(params) {
        return this.api.request(this.base + 'advance', params);
    }

    // ==================== Multi URL ====================

    /**
     * Fetch multiple URLs in one request
     * @param {array} urls - Array of URLs
     * @param {string} base - Base URL
     */
    async multiUrl(urls, base = null) {
        const params = { url: urls };
        if (base) params.base = base;
        return this.api.request(this.base + 'multi_url', params);
    }
}

// Export for different module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FCS_Crypto;
}
