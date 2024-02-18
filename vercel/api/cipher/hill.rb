require_relative  './../../functions/f-hill-cipher'

Handler = Proc.new do |request, response|

  response.status = 200
  response['Content-Type'] = 'application/json'
  # get body
  body = request.body

  response.body = hill_cipher_controller(body)
end
