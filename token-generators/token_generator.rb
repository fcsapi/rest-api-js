# FCS API - Token Generator (Ruby)
#
# Generate secure tokens for frontend JavaScript authentication
#
# Usage:
# 1. Set your access_key and public_key
# 2. Call generate_token()
# 3. Pass the token data to your frontend JavaScript
#
# @package FcsApi
# @author FCS API <support@fcsapi.com>
# @link https://fcsapi.com

require 'openssl'
require 'json'

class FcsTokenGenerator
  # Token expiry options (in seconds):
  # 300 (5min), 900 (15min), 1800 (30min), 3600 (1hr), 86400 (24hr)

  # @param access_key [String] Your API access key (get from https://fcsapi.com/dashboard)
  # @param public_key [String] Your public key (get from https://fcsapi.com/dashboard)
  # @param token_expiry [Integer] Token expiry in seconds (default: 3600 = 1 hour)
  def initialize(access_key = 'YOUR_ACCESS_KEY_HERE', public_key = 'YOUR_PUBLIC_KEY_HERE', token_expiry = 3600)
    @access_key = access_key
    @public_key = public_key
    @token_expiry = token_expiry
  end

  # Generate token for frontend authentication
  # @return [Hash] Token data with _token, _expiry, _public_key
  def generate_token
    expiry = Time.now.to_i + @token_expiry
    message = "#{@public_key}#{expiry}"
    token = OpenSSL::HMAC.hexdigest('sha256', @access_key, message)

    {
      '_token' => token,
      '_expiry' => expiry,
      '_public_key' => @public_key
    }
  end

  # Generate token and return as JSON string
  # @return [String] JSON string of token data
  def to_json
    generate_token.to_json
  end

  # Generate HTML meta tags for token
  # @return [String] HTML meta tags
  def get_meta_tags
    token = generate_token
    <<~HTML
      <meta name="fcs-public-key" content="#{token['_public_key']}">
      <meta name="fcs-token" content="#{token['_token']}">
      <meta name="fcs-token-expiry" content="#{token['_expiry']}">
    HTML
  end
end

# ============================================
# USAGE EXAMPLES
# ============================================

if __FILE__ == $0
  # Example 1: Generate token
  generator = FcsTokenGenerator.new('your_access_key', 'your_public_key')
  token_data = generator.generate_token
  puts "Token Data: #{token_data}"

  # Example 2: Get as JSON
  puts "\nJSON: #{generator.to_json}"

  # Example 3: Get meta tags
  puts "\nMeta Tags:"
  puts generator.get_meta_tags
end

# Rails example:
# class ApiController < ApplicationController
#   def fcs_token
#     generator = FcsTokenGenerator.new(ENV['FCS_ACCESS_KEY'], ENV['FCS_PUBLIC_KEY'])
#     render json: generator.generate_token
#   end
# end
