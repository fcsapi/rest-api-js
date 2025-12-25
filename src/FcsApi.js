/**
 * FCS API - JavaScript & Node.js REST Client
 *
 * JavaScript/AJAX client for Forex, Cryptocurrency, and Stock market data
 *
 * Authentication options:
 * 1. access_key - Simple API key authentication
 * 2. ip_whitelist - No key needed if IP is whitelisted
 * 3. token - Secure token-based authentication
 *
 * @package FcsApi
 * @author FCS API <support@fcsapi.com>
 * @link https://fcsapi.com
 */

class FcsApi {
    /**
     * Create FcsApi instance
     * @param {FcsConfig|Object} config - Configuration object or FcsConfig instance
     */
    constructor(config = null) {
        this.baseUrl = 'https://api-v4.fcsapi.com/';
        this.lastResponse = null;

        // Use provided config or create default
        if (config instanceof FcsConfig) {
            this.config = config;
        } else if (config && typeof config === 'object') {
            // Legacy support: config object with token data
            this.config = new FcsConfig();
            if (config.accessKey) {
                this.config.authMethod = 'access_key';
                this.config.accessKey = config.accessKey;
            }
            if (config.token) {
                this.config.setToken(config);
            }
            if (config.timeout) {
                this.config.timeout = config.timeout;
            }
        } else {
            // Use default config (reads from FcsConfig defaults)
            this.config = new FcsConfig();
        }

        // Initialize modules (check if class exists for browser compatibility)
        this.forex = typeof FCS_Forex !== 'undefined' ? new FCS_Forex(this) : null;
        this.crypto = typeof FCS_Crypto !== 'undefined' ? new FCS_Crypto(this) : null;
        this.stock = typeof FCS_Stock !== 'undefined' ? new FCS_Stock(this) : null;
    }

    /**
     * Set token data (received from backend)
     * @param {Object} tokenData - { token, expiry, publicKey }
     * @returns {FcsApi}
     */
    setToken(tokenData) {
        this.config.setToken(tokenData);
        return this;
    }

    /**
     * Set access key
     * @param {string} accessKey - Your API access key
     * @returns {FcsApi}
     */
    setAccessKey(accessKey) {
        this.config.authMethod = 'access_key';
        this.config.accessKey = accessKey;
        return this;
    }

    /**
     * Use IP whitelist authentication
     * @returns {FcsApi}
     */
    useIpWhitelist() {
        this.config.authMethod = 'ip_whitelist';
        return this;
    }

    /**
     * Check if token is valid
     * @returns {boolean}
     */
    isTokenValid() {
        return this.config.isTokenValid();
    }

    /**
     * Get authentication parameters
     * @returns {Object}
     */
    getAuthParams() {
        return this.config.getAuthParams();
    }

    /**
     * Make API request
     * @param {string} endpoint - API endpoint
     * @param {Object} params - Request parameters
     * @returns {Promise<Object>}
     */
    async request(endpoint, params = {}) {
        // Add auth params
        const authParams = this.getAuthParams();
        const allParams = { ...params, ...authParams };

        const url = this.baseUrl + endpoint;

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                },
                body: new URLSearchParams(allParams).toString(),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            const data = await response.json();
            this.lastResponse = data;
            return data;
        } catch (error) {
            this.lastResponse = {
                status: false,
                code: 0,
                msg: 'Request failed: ' + error.message,
                response: null
            };
            return this.lastResponse;
        }
    }

    /**
     * Get last response
     * @returns {Object}
     */
    getLastResponse() {
        return this.lastResponse;
    }

    /**
     * Check if last request was successful
     * @returns {boolean}
     */
    isSuccess() {
        return this.lastResponse?.status === true;
    }

    /**
     * Get error message
     * @returns {string|null}
     */
    getError() {
        if (this.isSuccess()) return null;
        return this.lastResponse?.msg || 'Unknown error';
    }

    /**
     * Get response data only
     * @returns {*}
     */
    getResponseData() {
        return this.lastResponse?.response || null;
    }
}

// Export for different module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FcsApi;
}
