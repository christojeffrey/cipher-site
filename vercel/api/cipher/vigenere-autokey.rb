 require_relative  './../../functions/b-vigenere-autokey-cipher'

Handler = Proc.new do |request, response|
 
    response.status = 200
    response['Content-Type'] = 'application/json'
    # get body
    body = request.body

    response.body = vigenere_autokey_cipher_controller(body)
  end