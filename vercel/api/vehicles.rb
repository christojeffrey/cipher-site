 
Handler = Proc.new do |request, response|
  name = request.query['name'] || 'World'
 
  response.status = 200
  response['Content-Type'] = 'application/json'
    response.body = { name: 'Tesla Model 3' }.to_json
end