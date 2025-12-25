"""
FCS API - Token Generator (Python)

Generate secure tokens for frontend JavaScript authentication

Usage:
1. Set your access_key and public_key
2. Call generate_token()
3. Pass the token data to your frontend JavaScript

@package FcsApi
@author FCS API <support@fcsapi.com>
@link https://fcsapi.com
"""

import hmac
import hashlib
import time
import json


class FcsTokenGenerator:
    """
    Token generator for FCS API frontend authentication
    """

    def __init__(self, access_key: str = 'YOUR_ACCESS_KEY_HERE',
                 public_key: str = 'YOUR_PUBLIC_KEY_HERE',
                 token_expiry: int = 3600):
        """
        Initialize token generator

        Args:
            access_key: Your API access key (get from https://fcsapi.com/dashboard)
            public_key: Your public key (get from https://fcsapi.com/dashboard)
            token_expiry: Token expiry in seconds (default: 3600 = 1 hour)
                         Options: 300 (5min), 900 (15min), 1800 (30min),
                                  3600 (1hr), 86400 (24hr)
        """
        self.access_key = access_key
        self.public_key = public_key
        self.token_expiry = token_expiry

    def generate_token(self) -> dict:
        """
        Generate token for frontend authentication

        Returns:
            dict: Token data with _token, _expiry, _public_key
        """
        expiry = int(time.time()) + self.token_expiry
        message = f"{self.public_key}{expiry}"
        token = hmac.new(
            self.access_key.encode('utf-8'),
            message.encode('utf-8'),
            hashlib.sha256
        ).hexdigest()

        return {
            '_token': token,
            '_expiry': expiry,
            '_public_key': self.public_key
        }

    def to_json(self) -> str:
        """
        Generate token and return as JSON string

        Returns:
            str: JSON string of token data
        """
        return json.dumps(self.generate_token())

    def get_meta_tags(self) -> str:
        """
        Generate HTML meta tags for token

        Returns:
            str: HTML meta tags
        """
        token = self.generate_token()
        return f'''<meta name="fcs-public-key" content="{token['_public_key']}">
<meta name="fcs-token" content="{token['_token']}">
<meta name="fcs-token-expiry" content="{token['_expiry']}">'''


# ============================================
# USAGE EXAMPLES
# ============================================

if __name__ == '__main__':
    # Example 1: Generate token
    generator = FcsTokenGenerator('your_access_key', 'your_public_key')
    token_data = generator.generate_token()
    print("Token Data:", token_data)

    # Example 2: Get as JSON
    print("\nJSON:", generator.to_json())

    # Example 3: Get meta tags
    print("\nMeta Tags:")
    print(generator.get_meta_tags())
