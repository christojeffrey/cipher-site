 
require_relative  './../../functions/a-vigenere-standard-cipher'

Handler = Proc.new do |request, response|
 
    response.status = 200
    response['Content-Type'] = 'application/json'
    # get body
    body = request.body
    body = JSON.parse(body)
    plaintext = body["plaintext"]
    key = body["key"]

    # handle error
    if plaintext.nil? || key.nil?
      response.status = 400
      return response.body = { error: "plaintext and key are required" }
    end

    response.body = vigenere_standard_cipher(plaintext, key)
  end