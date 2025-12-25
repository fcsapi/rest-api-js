/**
 * FCS API - Configuration
 *
 * Authentication options:
 * 1. access_key - Simple API key authentication
 * 2. ip_whitelist - No key needed if IP is whitelisted in your account https://fcsapi.com/dashboard/profile
 * 3. token - Secure token-based authentication (recommended for frontend)
 *
 * You can set values here OR use meta tags in your file like below:
 * <meta name="fcs-public-key" content="YOUR_PUBLIC_KEY">
 * <meta name="fcs-token" content="TOKEN_FROM_BACKEND">
 * <meta name="fcs-token-expiry" content="TOKEN_EXPIRY_TIMESTAMP">
 *
 * @package FcsApi
 * @author FCS API <support@fcsapi.com>
 */

class FcsConfig {
    /**
     * Authentication method
     * Options: 'access_key', 'ip_whitelist', 'token'
     */
    authMethod = 'token';

    /**
     * API Access Key (Private Key)
     * Get from: https://fcsapi.com/dashboard
     */
    accessKey = 'YOUR_ACCESS_KEY_HERE';

    /**
     * Public Key (for token-based auth)
     * Get from: https://fcsapi.com/dashboard
     */
    publicKey = 'YOUR_PUBLIC_KEY_HERE';

    /**
     * Token (for token-based auth)
     * Generate from your backend and set here
     */
    token = null;

    /**
     * Token expiry timestamp (Unix timestamp)
     */
    tokenExpiry = null;

    /**
     * Request timeout in milliseconds
     */
    timeout = 30000;

    /**
     * Constructor - reads from meta tags if available
     */
    constructor() {
        this._readFromMetaTags();
    }

    /**
     * Read configuration from HTML meta tags
     * @private
     */
    _readFromMetaTags() {
        // Only run in browser environment
        if (typeof document === 'undefined') return;

        // Public key
        const publicKeyMeta = document.querySelector('meta[name="fcs-public-key"]');
        if (publicKeyMeta && publicKeyMeta.content) {
            this.publicKey = publicKeyMeta.content;
        }

        // Token
        const tokenMeta = document.querySelector('meta[name="fcs-token"]');
        if (tokenMeta && tokenMeta.content) {
            this.token = tokenMeta.content;
        }

        // Token expiry
        const tokenExpiryMeta = document.querySelector('meta[name="fcs-token-expiry"]');
        if (tokenExpiryMeta && tokenExpiryMeta.content) {
            this.tokenExpiry = parseInt(tokenExpiryMeta.content, 10);
        }
    }

    /**
     * Create config with access_key method
     * @param {string} accessKey - Your API access key
     * @returns {FcsConfig}
     */
    static withAccessKey(accessKey) {
        const config = new FcsConfig();
        config.authMethod = 'access_key';
        config.accessKey = accessKey;
        return config;
    }

    /**
     * Create config with IP whitelist method (no key needed)
     * @returns {FcsConfig}
     */
    static withIpWhitelist() {
        const config = new FcsConfig();
        config.authMethod = 'ip_whitelist';
        return config;
    }

    /**
     * Create config with token-based authentication
     * Token should be generated from your backend
     *
     * @param {string} publicKey - Your public key
     * @param {string} token - Token generated from your backend
     * @param {number} tokenExpiry - Token expiry Unix timestamp
     * @returns {FcsConfig}
     */
    static withToken(publicKey, token, tokenExpiry) {
        const config = new FcsConfig();
        config.authMethod = 'token';
        config.publicKey = publicKey;
        config.token = token;
        config.tokenExpiry = tokenExpiry;
        return config;
    }

    /**
     * Set token data (can be used after initialization)
     * @param {Object} tokenData - Token data object
     * @param {string} tokenData.token - The token
     * @param {number} tokenData.expiry - Expiry timestamp
     * @param {string} tokenData.publicKey - Public key
     * @returns {FcsConfig}
     */
    setToken(tokenData) {
        this.authMethod = 'token';
        this.token = tokenData.token || tokenData._token;
        this.tokenExpiry = tokenData.expiry || tokenData._expiry;
        this.publicKey = tokenData.publicKey || tokenData.public_key || tokenData._public_key;
        return this;
    }

    /**
     * Check if token is valid (not expired)
     * @returns {boolean}
     */
    isTokenValid() {
        if (this.authMethod !== 'token') {
            return true; // Not using token auth
        }
        if (!this.token || !this.tokenExpiry) {
            return false;
        }
        // Check if token expires in next 60 seconds
        return this.tokenExpiry > (Math.floor(Date.now() / 1000) + 60);
    }

    /**
     * Get authentication parameters for API request
     * @returns {Object}
     */
    getAuthParams() {
        switch (this.authMethod) {
            case 'ip_whitelist':
                return {};

            case 'token':
                if (!this.token || !this.tokenExpiry || !this.publicKey) {
                    console.error('FcsConfig: Token authentication requires token, expiry, and publicKey');
                    return {};
                }
                return {
                    _token: this.token,
                    _expiry: this.tokenExpiry,
                    _public_key: this.publicKey
                };

            case 'access_key':
            default:
                return { access_key: this.accessKey };
        }
    }
}

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FcsConfig;
}
