require_relative  './../../functions/d-playfair-cipher'

Handler = Proc.new do |request, response|

  response.status = 200
  response['Content-Type'] = 'application/json'
  # get body
  body = request.body

  response.body = playfair_cipher_controller(body)
end
