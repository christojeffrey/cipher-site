 require_relative  './../../functions/a-vigenere-standard-cipher'

Handler = Proc.new do |request, response|
 
    response.status = 200
    response['Content-Type'] = 'application/json'
    # get body
    body = request.body

    vigenere_standard_cipher_controller(body)
  end