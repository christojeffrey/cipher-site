# every functions in this file will return json

def hello(name)
  return "Hello, #{name || 'world'}!".to_json
end