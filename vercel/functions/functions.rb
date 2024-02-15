# every functions in this file will return json

def hello(name)
  return "Hello, #{name || 'world'}!".to_json
end

def testing_post(string_data)
  return { dataFromBody: string_data }.to_json
end