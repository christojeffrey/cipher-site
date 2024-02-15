require_relative './../../../vercel/functions/functions'
require_relative './../../../vercel/functions/a-vigenere-standard-cipher'

class ApplicationController < ActionController::API
  def testing
    render json: { name: 'hello' }
  end
  
  def hello_controller
      render json: hello("world")
  end

  def testing_post_controller
    # get body
    body = request.body.read
    body = JSON.parse(body)
    data = body["data"]

    render json: testing_post(data)
  end

  def vigenere_standard_cipher_controller
    # get body
    body = request.body.read
    body = JSON.parse(body)
    plaintext = body["plaintext"]
    key = body["key"]

    # handle error
    if plaintext.nil? || key.nil?
      response.status = 400
      return render json: { error: "plaintext and key are required" }
    end
    
    render json: vigenere_standard_cipher(plaintext, key)
  end

end