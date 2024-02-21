require_relative  './../../functions/bonus-enigma-cipher'

Handler = Proc.new do |request, response|

  response.status = 200
  response['Content-Type'] = 'application/json'
  # get body
  body = request.body

  response.body = enigma_cipher_controller(body)
end
