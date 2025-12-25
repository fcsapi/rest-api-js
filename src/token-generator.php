<?php
/**
 * FCS API - Token Generator (PHP)
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

class FcsTokenGenerator {
    /**
     * Your API Access Key (Private Key)
     * Get from: https://fcsapi.com/dashboard
     */
    private string $accessKey = 'YOUR_ACCESS_KEY_HERE';

    /**
     * Your Public Key
     * Get from: https://fcsapi.com/dashboard
     */
    private string $publicKey = 'YOUR_PUBLIC_KEY_HERE';

    /**
     * Token expiry time in seconds
     * Options: 300 (5min), 900 (15min), 1800 (30min), 3600 (1hr), 86400 (24hr)
     */
    private int $tokenExpiry = 3600;

    /**
     * Constructor
     * @param string|null $accessKey Your API access key
     * @param string|null $publicKey Your public key
     * @param int $tokenExpiry Token expiry in seconds
     */
    public function __construct(?string $accessKey = null, ?string $publicKey = null, int $tokenExpiry = 3600) {
        if ($accessKey) $this->accessKey = $accessKey;
        if ($publicKey) $this->publicKey = $publicKey;
        $this->tokenExpiry = $tokenExpiry;
    }

    /**
     * Generate token for frontend authentication
     * @return array Token data with _token, _expiry, _public_key
     */
    public function generateToken(): array {
        $expiry = time() + $this->tokenExpiry;
        $message = $this->publicKey . $expiry;
        $token = hash_hmac('sha256', $message, $this->accessKey);

        return [
            '_token' => $token,
            '_expiry' => $expiry,
            '_public_key' => $this->publicKey
        ];
    }

    /**
     * Generate and output as JSON (for AJAX requests)
     */
    public function outputJson(): void {
        header('Content-Type: application/json');
        echo json_encode($this->generateToken());
    }

    /**
     * Generate meta tags for HTML head
     * @return string HTML meta tags
     */
    public function getMetaTags(): string {
        $token = $this->generateToken();
        return sprintf(
            '<meta name="fcs-public-key" content="%s">' . "\n" .
            '<meta name="fcs-token" content="%s">' . "\n" .
            '<meta name="fcs-token-expiry" content="%s">',
            htmlspecialchars($token['_public_key']),
            htmlspecialchars($token['_token']),
            $token['_expiry']
        );
    }
}

// ============================================
// USAGE EXAMPLES
// ============================================

// Example 1: Generate token and pass to frontend
// $generator = new FcsTokenGenerator('your_access_key', 'your_public_key');
// $tokenData = $generator->generateToken();
// Pass $tokenData to your JavaScript

// Example 2: Output as JSON for AJAX
// $generator = new FcsTokenGenerator('your_access_key', 'your_public_key');
// $generator->outputJson();

// Example 3: Generate meta tags for HTML
// $generator = new FcsTokenGenerator('your_access_key', 'your_public_key');
// echo $generator->getMetaTags();
