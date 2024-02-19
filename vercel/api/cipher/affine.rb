require_relative  './../../functions/e-affine-cipher'

Handler = Proc.new do |request, response|
  # handle cors
  response['Access-Control-Allow-Origin'] = '*'
  response['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
  
  response.status = 200
  response['Content-Type'] = 'application/json'
  # get body
  body = request.body

  response.body = affine_cipher_controller(body)
end
