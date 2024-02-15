
require_relative  './../../functions/functions'

Handler = Proc.new do |request, response|
    name = request.query['name'] || 'World'
   
    response.status = 200
    response['Content-Type'] = 'application/json'
    response.body = hello(name)
  end