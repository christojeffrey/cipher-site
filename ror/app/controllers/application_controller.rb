require_relative './../../../vercel/functions/functions'

require_relative './../../../vercel/functions/a-vigenere-standard-cipher'

class ApplicationController < ActionController::API

  # EXAMPLES
  def testing
    render json: { name: 'hello' }
  end
  
  def hello
      render json: hello_controller("world")
  end

  def testing_post
    # get body
    body = request.body.read
    body = JSON.parse(body)
    data = body["data"]

    render json: testing_post_controller(data)
  end

  # CIPHERS

  def vigenere_standard_cipher
    # get body
    body = request.body.read
    
    vigenere_standard_cipher_controller(body)
  end

end