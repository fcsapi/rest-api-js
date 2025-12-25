/**
 * FCS API - Stock Module
 *
 * @package FcsApi
 * @author FCS API <support@fcsapi.com>
 * @link https://fcsapi.com
 */

class FCS_Stock {
    constructor(api) {
        this.api = api;
        this.base = 'stock/';
    }

    // ==================== Symbol List ====================

    /**
     * Get symbols list
     * @param {string} exchange - NASDAQ, NYSE, LSE
     * @param {string} country - united-states, united-kingdom
     * @param {string} sector - technology, healthcare
     * @param {string} indices - NASDAQ:NDX
     */
    async getSymbolsList(exchange = null, country = null, sector = null, indices = null) {
        const params = {};
        if (exchange) params.exchange = exchange;
        if (country) params.country = country;
        if (sector) params.sector = sector;
        if (indices) params.indices = indices;
        return this.api.request(this.base + 'list', params);
    }

    // ==================== Search ====================

    /**
     * Search stock symbols
     * @param {string} query - Search query
     * @param {string} exchange - NASDAQ, NYSE
     * @param {string} country - united-states
     */
    async search(query, exchange = null, country = null) {
        const params = { search: query };
        if (exchange) params.exchange = exchange;
        if (country) params.country = country;
        return this.api.request(this.base + 'search', params);
    }

    // ==================== Indices ====================

    /**
     * Get indices list
     * @param {string} country - united-states
     * @param {string} exchange - NASDAQ
     */
    async getIndicesList(country = null, exchange = null) {
        const params = { type: 'index' };
        if (country) params.country = country;
        if (exchange) params.exchange = exchange;
        return this.api.request(this.base + 'list', params);
    }

    /**
     * Get indices latest prices
     * @param {string} symbol - NASDAQ:NDX, SP:SPX
     * @param {string} country - united-states
     * @param {string} exchange - NASDAQ
     */
    async getIndicesLatest(symbol = null, country = null, exchange = null) {
        const params = { type: 'index' };
        if (symbol) params.symbol = symbol;
        if (country) params.country = country;
        if (exchange) params.exchange = exchange;
        return this.api.request(this.base + 'latest', params);
    }

    // ==================== Latest Price ====================

    /**
     * Get latest price
     * @param {string} symbol - NASDAQ:AAPL, AAPL
     * @param {string} period - 1m, 5m, 15m, 30m, 1h, 4h, 1D, 1W, 1M
     * @param {string} exchange - NASDAQ
     * @param {boolean} getProfile - Include profile data
     */
    async getLatestPrice(symbol, period = null, exchange = null, getProfile = false) {
        const params = { symbol };
        if (period) params.period = period;
        if (exchange) params.exchange = exchange;
        if (getProfile) params.merge = 'profile';
        return this.api.request(this.base + 'latest', params);
    }

    /**
     * Get all prices from exchange
     * @param {string} exchange - NASDAQ, NYSE
     * @param {string} period - Time period
     */
    async getAllPrices(exchange, period = null) {
        const params = { exchange };
        if (period) params.period = period;
        return this.api.request(this.base + 'latest', params);
    }

    /**
     * Get latest prices by country
     * @param {string} country - united-states
     * @param {string} sector - technology
     * @param {string} period - Time period
     */
    async getLatestByCountry(country, sector = null, period = null) {
        const params = { country };
        if (sector) params.sector = sector;
        if (period) params.period = period;
        return this.api.request(this.base + 'latest', params);
    }

    /**
     * Get latest prices by indices
     * @param {string} indices - NASDAQ:NDX
     * @param {string} period - Time period
     */
    async getLatestByIndices(indices, period = null) {
        const params = { indices };
        if (period) params.period = period;
        return this.api.request(this.base + 'latest', params);
    }

    // ==================== Historical Data ====================

    /**
     * Get historical candle data
     * @param {string} symbol - NASDAQ:AAPL
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
     * Get stock profile
     * @param {string} symbol - AAPL, NASDAQ:AAPL
     */
    async getProfile(symbol) {
        return this.api.request(this.base + 'profile', { symbol });
    }

    // ==================== Exchanges ====================

    /**
     * Get list of exchanges
     * @param {string} type - stock, index
     * @param {string} subType - spot, cfd
     */
    async getExchanges(type = null, subType = null) {
        const params = {};
        if (type) params.type = type;
        if (subType) params.sub_type = subType;
        return this.api.request(this.base + 'exchanges', params);
    }

    // ==================== Financial Data ====================

    /**
     * Get earnings data (EPS, Revenue)
     * @param {string} symbol - NASDAQ:AAPL
     * @param {string} duration - annual, interim, both
     */
    async getEarnings(symbol, duration = 'both') {
        return this.api.request(this.base + 'earnings', { symbol, duration });
    }

    /**
     * Get revenue segmentation data
     * @param {string} symbol - NASDAQ:AAPL
     */
    async getRevenue(symbol) {
        return this.api.request(this.base + 'revenue', { symbol });
    }

    /**
     * Get dividends data
     * @param {string} symbol - NASDAQ:AAPL
     * @param {string} format - plain, inherit
     */
    async getDividends(symbol, format = 'plain') {
        return this.api.request(this.base + 'dividend', { symbol, format });
    }

    /**
     * Get balance sheet data
     * @param {string} symbol - NASDAQ:AAPL
     * @param {string} duration - annual, interim
     * @param {string} format - plain, inherit
     */
    async getBalanceSheet(symbol, duration = 'annual', format = 'plain') {
        return this.api.request(this.base + 'balance_sheet', { symbol, duration, format });
    }

    /**
     * Get income statement data
     * @param {string} symbol - NASDAQ:AAPL
     * @param {string} duration - annual, interim
     * @param {string} format - plain, inherit
     */
    async getIncomeStatements(symbol, duration = 'annual', format = 'plain') {
        return this.api.request(this.base + 'income_statements', { symbol, duration, format });
    }

    /**
     * Get cash flow statement data
     * @param {string} symbol - NASDAQ:AAPL
     * @param {string} duration - annual, interim
     * @param {string} format - plain, inherit
     */
    async getCashFlow(symbol, duration = 'annual', format = 'plain') {
        return this.api.request(this.base + 'cash_flow', { symbol, duration, format });
    }

    /**
     * Get stock statistics and financial ratios
     * @param {string} symbol - NASDAQ:AAPL
     * @param {string} duration - annual, interim
     */
    async getStatistics(symbol, duration = 'annual') {
        return this.api.request(this.base + 'statistics', { symbol, duration });
    }

    /**
     * Get price target forecast from analysts
     * @param {string} symbol - NASDAQ:AAPL
     */
    async getForecast(symbol) {
        return this.api.request(this.base + 'forecast', { symbol });
    }

    /**
     * Get combined financial data
     * @param {string} symbol - NASDAQ:AAPL
     * @param {string} dataColumn - earnings,revenue,profile,dividends,balance_sheet,income_statements,statistics,cash_flow
     * @param {string} duration - annual, interim
     * @param {string} format - plain, inherit
     */
    async getStockData(symbol, dataColumn = 'profile,earnings,dividends', duration = 'annual', format = 'plain') {
        return this.api.request(this.base + 'stock_data', {
            symbol,
            data_column: dataColumn,
            duration,
            format
        });
    }

    // ==================== Technical Analysis ====================

    /**
     * Get Moving Averages (EMA & SMA)
     * @param {string} symbol - NASDAQ:AAPL
     * @param {string} period - Time period
     */
    async getMovingAverages(symbol, period = '1D') {
        return this.api.request(this.base + 'ma', { symbol, period });
    }

    /**
     * Get Technical Indicators (RSI, MACD, etc.)
     * @param {string} symbol - NASDAQ:AAPL
     * @param {string} period - Time period
     */
    async getIndicators(symbol, period = '1D') {
        return this.api.request(this.base + 'indicators', { symbol, period });
    }

    /**
     * Get Pivot Points
     * @param {string} symbol - NASDAQ:AAPL
     * @param {string} period - Time period
     */
    async getPivotPoints(symbol, period = '1D') {
        return this.api.request(this.base + 'pivot_points', { symbol, period });
    }

    // ==================== Performance ====================

    /**
     * Get performance data (highs, lows, volatility)
     * @param {string} symbol - NASDAQ:AAPL
     */
    async getPerformance(symbol) {
        return this.api.request(this.base + 'performance', { symbol });
    }

    // ==================== Top Movers ====================

    /**
     * Get top gainers
     * @param {string} exchange - NASDAQ
     * @param {number} limit - Number of results
     * @param {string} period - Time period
     * @param {string} country - united-states
     */
    async getTopGainers(exchange = null, limit = 20, period = '1D', country = null) {
        return this.getSortedData('active.chp', 'desc', limit, exchange, country, period);
    }

    /**
     * Get top losers
     * @param {string} exchange - NASDAQ
     * @param {number} limit - Number of results
     * @param {string} period - Time period
     * @param {string} country - united-states
     */
    async getTopLosers(exchange = null, limit = 20, period = '1D', country = null) {
        return this.getSortedData('active.chp', 'asc', limit, exchange, country, period);
    }

    /**
     * Get most active
     * @param {string} exchange - NASDAQ
     * @param {number} limit - Number of results
     * @param {string} period - Time period
     * @param {string} country - united-states
     */
    async getMostActive(exchange = null, limit = 20, period = '1D', country = null) {
        return this.getSortedData('active.v', 'desc', limit, exchange, country, period);
    }

    /**
     * Get sorted data
     * @param {string} sortColumn - Column to sort by
     * @param {string} sortDirection - asc, desc
     * @param {number} limit - Number of results
     * @param {string} exchange - Exchange
     * @param {string} country - Country
     * @param {string} period - Time period
     */
    async getSortedData(sortColumn, sortDirection, limit = 20, exchange = null, country = null, period = '1D') {
        const params = {
            period,
            sort_by: sortColumn + '_' + sortDirection,
            per_page: limit,
            merge: 'latest'
        };
        if (exchange) params.exchange = exchange;
        if (country) params.country = country;
        return this.api.request(this.base + 'advance', params);
    }

    // ==================== Filter ====================

    /**
     * Get stocks by sector
     * @param {string} sector - technology, healthcare
     * @param {number} limit - Number of results
     * @param {string} exchange - NASDAQ
     */
    async getBySector(sector, limit = 50, exchange = null) {
        const params = { sector, per_page: limit, merge: 'latest' };
        if (exchange) params.exchange = exchange;
        return this.api.request(this.base + 'advance', params);
    }

    /**
     * Get stocks by country
     * @param {string} country - united-states
     * @param {number} limit - Number of results
     * @param {string} exchange - NASDAQ
     */
    async getByCountry(country, limit = 50, exchange = null) {
        const params = { country, per_page: limit, merge: 'latest' };
        if (exchange) params.exchange = exchange;
        return this.api.request(this.base + 'advance', params);
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
    module.exports = FCS_Stock;
}
