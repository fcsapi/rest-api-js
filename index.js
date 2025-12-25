/**
 * FCS API - JavaScript & Node.js REST Client
 *
 * @package fcsapi-rest
 * @author FCS API <support@fcsapi.com>
 * @link https://fcsapi.com
 */

const FcsConfig = require('./src/FcsConfig.js');
const FCS_Forex = require('./src/FCS_Forex.js');
const FCS_Crypto = require('./src/FCS_Crypto.js');
const FCS_Stock = require('./src/FCS_Stock.js');
const FcsApi = require('./src/FcsApi.js');

module.exports = { FcsConfig, FCS_Forex, FCS_Crypto, FCS_Stock, FcsApi };
module.exports.default = FcsApi;
