 
Handler = Proc.new do |request, response|
 
  response.status = 200
  response['Content-Type'] = 'application/json'
  response.body = { name: 'hello' }.to_json
end