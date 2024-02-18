require_relative  './../../functions/e-affine-cipher'

Handler = Proc.new do |request, response|

  response.status = 200
  response['Content-Type'] = 'application/json'
  # get body
  body = request.body

  response.body = affine_cipher_controller(body)
end
