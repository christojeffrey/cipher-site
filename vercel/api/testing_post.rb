 
require_relative  './../functions/functions'

Handler = Proc.new do |request, response|
 
    response.status = 200
    response['Content-Type'] = 'application/json'
    # get body
    body = request.body.read
    body = JSON.parse(body)
    data = body["data"]


    response.body = testing_post(data)
  end