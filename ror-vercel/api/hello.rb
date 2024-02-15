
# take functions from ror-vercel/app/controllers/functions.rb
require_relative  './../app/controllers/functions'

Handler = Proc.new do |request, response|
    name = request.query['name'] || 'World'
   
    response.status = 200
    response['Content-Type'] = 'application/json'
      response.body = hello(name)
  end