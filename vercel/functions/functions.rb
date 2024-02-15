# every functions in this file will return json

def hello_controller(name)
  return "Hello, #{name || 'world'}!".to_json
end

def testing_post_controller(string_data)
  return { dataFromBody: string_data }.to_json
end


def result_outputer(result_text, isBase64)
  if isBase64
    # encode the result_text to base64
    result_text_base64 = Base64.encode64(result_text)
    return {
    result_text: result_text,
    result_text_base64: result_text_base64
    }.to_json
  else
    return {
      result_text: result_text
    }.to_json
  end

end