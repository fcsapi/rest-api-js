/**
 * FCS API - Forex Module
 *
 * @package FcsApi
 * @author FCS API <support@fcsapi.com>
 * @link https://fcsapi.com
 */

class FCS_Forex {
    constructor(api) {
        this.api = api;
        this.base = 'forex/';
    }

    // ==================== Symbol List ====================

    /**
     * Get symbols list
     * @param {string} type - forex, commodity
     * @param {string} subType - spot, synthetic
     * @param {string} exchange - FX, ONA, SFO, FCM
     */
    async getSymbolsList(type = null, subType = null, exchange = null) {
        const params = {};
        if (type) params.type = type;
        if (subType) params.sub_type = subType;
        if (exchange) params.exchange = exchange;
        return this.api.request(this.base + 'list', params);
    }

    // ==================== Latest Price ====================

    /**
     * Get latest price
     * @param {string} symbol - EURUSD, FX:EURUSD
     * @param {string} period - 1m, 5m, 15m, 30m, 1h, 4h, 1D, 1W, 1M
     * @param {string} type - forex, commodity
     * @param {string} exchange - FX
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
     * @param {string} exchange - FX
     * @param {string} period - Time period
     * @param {string} type - forex, commodity
     */
    async getAllPrices(exchange = 'FX', period = null, type = null) {
        const params = { exchange };
        if (period) params.period = period;
        if (type) params.type = type;
        return this.api.request(this.base + 'latest', params);
    }

    // ==================== Commodities ====================

    /**
     * Get commodities prices
     * @param {string} symbol - XAUUSD, XAGUSD (optional)
     * @param {string} period - Time period
     */
    async getCommodities(symbol = null, period = null) {
        const params = { type: 'commodity' };
        if (symbol) params.symbol = symbol;
        if (period) params.period = period;
        return this.api.request(this.base + 'latest', params);
    }

    /**
     * Get commodity symbols list
     */
    async getCommoditySymbols() {
        return this.api.request(this.base + 'list', { type: 'commodity' });
    }

    // ==================== Currency Converter ====================

    /**
     * Convert currencies
     * @param {string} pair1 - From: EUR, USD
     * @param {string} pair2 - To: USD, EUR
     * @param {number} amount - Amount to convert
     * @param {string} type - forex
     */
    async convert(pair1, pair2, amount = 1, type = 'forex') {
        return this.api.request(this.base + 'converter', {
            pair1, pair2, amount, type
        });
    }

    // ==================== Base Prices ====================

    /**
     * Get base currency prices
     * @param {string} symbol - USD, EUR
     * @param {string} type - forex
     * @param {string} exchange - FX
     * @param {string} fallback - Fallback exchange
     */
    async getBasePrices(symbol, type = 'forex', exchange = null, fallback = null) {
        const params = { symbol, type };
        if (exchange) params.exchange = exchange;
        if (fallback) params.fallback = fallback;
        return this.api.request(this.base + 'base_latest', params);
    }

    // ==================== Cross Rates ====================

    /**
     * Get cross rates
     * @param {string} symbol - USD, EUR
     * @param {string} type - forex
     * @param {string} period - 1D
     * @param {string} exchange - FX
     * @param {string} crossrates - Specific cross rates
     * @param {string} fallback - Fallback exchange
     */
    async getCrossRates(symbol, type = 'forex', period = '1D', exchange = null, crossrates = null, fallback = null) {
        const params = { symbol, type, period };
        if (exchange) params.exchange = exchange;
        if (crossrates) params.crossrates = crossrates;
        if (fallback) params.fallback = fallback;
        return this.api.request(this.base + 'crossrate', params);
    }

    // ==================== Historical Data ====================

    /**
     * Get historical candle data
     * @param {string} symbol - EURUSD
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
     * Get currency profile
     * @param {string} symbol - EUR, USD, GBP
     */
    async getProfile(symbol) {
        return this.api.request(this.base + 'profile', { symbol });
    }

    // ==================== Exchanges ====================

    /**
     * Get list of exchanges
     * @param {string} type - forex, commodity
     * @param {string} subType - spot, synthetic
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
     * @param {string} symbol - EURUSD
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
     * @param {string} symbol - EURUSD
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
     * @param {string} symbol - EURUSD
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
     * @param {string} symbol - EURUSD
     * @param {string} exchange - Exchange
     */
    async getPerformance(symbol, exchange = null) {
        const params = { symbol };
        if (exchange) params.exchange = exchange;
        return this.api.request(this.base + 'performance', params);
    }

    // ==================== Economy Calendar ====================

    /**
     * Get economy calendar events
     * @param {string} symbol - Currency symbol
     * @param {string} country - US, GB, DE, JP
     * @param {string} from - Start date
     * @param {string} to - End date
     */
    async getEconomyCalendar(symbol = null, country = null, from = null, to = null) {
        const params = {};
        if (symbol) params.symbol = symbol;
        if (country) params.country = country;
        if (from) params.from = from;
        if (to) params.to = to;
        return this.api.request(this.base + 'economy_cal', params);
    }

    // ==================== Top Movers ====================

    /**
     * Get top gainers
     * @param {string} type - forex
     * @param {number} limit - Number of results
     * @param {string} period - Time period
     * @param {string} exchange - FX
     */
    async getTopGainers(type = 'forex', limit = 20, period = '1D', exchange = null) {
        return this.getSortedData('active.chp', 'desc', limit, type, exchange, period);
    }

    /**
     * Get top losers
     * @param {string} type - forex
     * @param {number} limit - Number of results
     * @param {string} period - Time period
     * @param {string} exchange - FX
     */
    async getTopLosers(type = 'forex', limit = 20, period = '1D', exchange = null) {
        return this.getSortedData('active.chp', 'asc', limit, type, exchange, period);
    }

    /**
     * Get most active
     * @param {string} type - forex
     * @param {number} limit - Number of results
     * @param {string} period - Time period
     * @param {string} exchange - FX
     */
    async getMostActive(type = 'forex', limit = 20, period = '1D', exchange = null) {
        return this.getSortedData('active.v', 'desc', limit, type, exchange, period);
    }

    /**
     * Get sorted data
     * @param {string} sortColumn - Column to sort by
     * @param {string} sortDirection - asc, desc
     * @param {number} limit - Number of results
     * @param {string} type - forex
     * @param {string} exchange - Exchange
     * @param {string} period - Time period
     */
    async getSortedData(sortColumn, sortDirection, limit = 20, type = 'forex', exchange = null, period = '1D') {
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
     * Search forex symbols
     * @param {string} query - Search query
     * @param {string} type - forex, commodity
     * @param {string} exchange - FX
     */
    async search(query, type = null, exchange = null) {
        const params = { search: query };
        if (type) params.type = type;
        if (exchange) params.exchange = exchange;
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
    module.exports = FCS_Forex;
}
