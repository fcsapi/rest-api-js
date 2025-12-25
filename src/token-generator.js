/**
 * FCS API - Token Generator (Node.js)
 *
 * Generate secure tokens for frontend JavaScript authentication
 *
 * Usage:
 * 1. Set your accessKey and publicKey
 * 2. Call generateToken()
 * 3. Pass the token data to your frontend JavaScript
 *
 * @package FcsApi
 * @author FCS API <support@fcsapi.com>
 * @link https://fcsapi.com
 */

const crypto = require('crypto');

class FcsTokenGenerator {
    /**
     * Initialize token generator
     * @param {string} accessKey - Your API access key (get from https://fcsapi.com/dashboard)
     * @param {string} publicKey - Your public key (get from https://fcsapi.com/dashboard)
     * @param {number} tokenExpiry - Token expiry in seconds (default: 3600 = 1 hour)
     *                               Options: 300 (5min), 900 (15min), 1800 (30min),
     *                                        3600 (1hr), 86400 (24hr)
     */
    constructor(accessKey = 'YOUR_ACCESS_KEY_HERE', publicKey = 'YOUR_PUBLIC_KEY_HERE', tokenExpiry = 3600) {
        this.accessKey = accessKey;
        this.publicKey = publicKey;
        this.tokenExpiry = tokenExpiry;
    }

    /**
     * Generate token for frontend authentication
     * @returns {Object} Token data with _token, _expiry, _public_key
     */
    generateToken() {
        const expiry = Math.floor(Date.now() / 1000) + this.tokenExpiry;
        const message = this.publicKey + expiry;
        const token = crypto.createHmac('sha256', this.accessKey)
            .update(message)
            .digest('hex');

        return {
            _token: token,
            _expiry: expiry,
            _public_key: this.publicKey
        };
    }

    /**
     * Generate token and return as JSON string
     * @returns {string} JSON string of token data
     */
    toJson() {
        return JSON.stringify(this.generateToken());
    }

    /**
     * Generate HTML meta tags for token
     * @returns {string} HTML meta tags
     */
    getMetaTags() {
        const token = this.generateToken();
        return `<meta name="fcs-public-key" content="${token._public_key}">
<meta name="fcs-token" content="${token._token}">
<meta name="fcs-token-expiry" content="${token._expiry}">`;
    }
}

// Export for Node.js
module.exports = FcsTokenGenerator;

// ============================================
// USAGE EXAMPLES
// ============================================

// Example 1: Generate token
// const FcsTokenGenerator = require('./token-generator.js');
// const generator = new FcsTokenGenerator('your_access_key', 'your_public_key');
// const tokenData = generator.generateToken();
// console.log(tokenData);

// Example 2: Express.js endpoint
// app.get('/api/fcs-token', (req, res) => {
//     const generator = new FcsTokenGenerator('your_access_key', 'your_public_key');
//     res.json(generator.generateToken());
// });

// Example 3: Get meta tags for SSR
// const generator = new FcsTokenGenerator('your_access_key', 'your_public_key');
// const metaTags = generator.getMetaTags();
