/**
 * FCS API - Token Generator (Java)
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

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

public class TokenGenerator {

    private String accessKey;
    private String publicKey;
    private int tokenExpiry;

    /**
     * Initialize token generator with default 1 hour expiry
     * @param accessKey Your API access key (get from https://fcsapi.com/dashboard)
     * @param publicKey Your public key (get from https://fcsapi.com/dashboard)
     */
    public TokenGenerator(String accessKey, String publicKey) {
        this(accessKey, publicKey, 3600);
    }

    /**
     * Initialize token generator
     * @param accessKey Your API access key
     * @param publicKey Your public key
     * @param tokenExpiry Token expiry in seconds (300, 900, 1800, 3600, 86400)
     */
    public TokenGenerator(String accessKey, String publicKey, int tokenExpiry) {
        this.accessKey = accessKey;
        this.publicKey = publicKey;
        this.tokenExpiry = tokenExpiry;
    }

    /**
     * Generate token for frontend authentication
     * @return Map with _token, _expiry, _public_key
     */
    public Map<String, Object> generateToken() {
        long expiry = (System.currentTimeMillis() / 1000) + tokenExpiry;
        String message = publicKey + expiry;
        String token = hmacSha256(message, accessKey);

        Map<String, Object> result = new HashMap<>();
        result.put("_token", token);
        result.put("_expiry", expiry);
        result.put("_public_key", publicKey);

        return result;
    }

    /**
     * Generate HMAC-SHA256 hash
     */
    private String hmacSha256(String message, String secret) {
        try {
            Mac mac = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKeySpec = new SecretKeySpec(
                secret.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
            mac.init(secretKeySpec);
            byte[] hash = mac.doFinal(message.getBytes(StandardCharsets.UTF_8));

            // Convert to hex string
            StringBuilder hexString = new StringBuilder();
            for (byte b : hash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) hexString.append('0');
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (Exception e) {
            throw new RuntimeException("Error generating HMAC", e);
        }
    }

    /**
     * Generate token as JSON string
     * @return JSON string
     */
    public String toJson() {
        Map<String, Object> token = generateToken();
        return String.format(
            "{\"_token\":\"%s\",\"_expiry\":%d,\"_public_key\":\"%s\"}",
            token.get("_token"),
            token.get("_expiry"),
            token.get("_public_key")
        );
    }

    /**
     * Generate HTML meta tags
     * @return HTML meta tags string
     */
    public String getMetaTags() {
        Map<String, Object> token = generateToken();
        return String.format(
            "<meta name=\"fcs-public-key\" content=\"%s\">\n" +
            "<meta name=\"fcs-token\" content=\"%s\">\n" +
            "<meta name=\"fcs-token-expiry\" content=\"%d\">",
            token.get("_public_key"),
            token.get("_token"),
            token.get("_expiry")
        );
    }

    // ============================================
    // USAGE EXAMPLES
    // ============================================

    public static void main(String[] args) {
        // Example 1: Generate token
        TokenGenerator generator = new TokenGenerator("your_access_key", "your_public_key");
        Map<String, Object> tokenData = generator.generateToken();
        System.out.println("Token Data: " + tokenData);

        // Example 2: Get as JSON
        System.out.println("\nJSON: " + generator.toJson());

        // Example 3: Get meta tags
        System.out.println("\nMeta Tags:");
        System.out.println(generator.getMetaTags());
    }
}
