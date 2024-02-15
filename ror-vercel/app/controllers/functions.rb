# every functions in this file will return json

def hello(params)
  return "Hello, #{params['name'] || 'world'}!".to_json
end