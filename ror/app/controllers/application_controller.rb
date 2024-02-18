require_relative './../../../vercel/functions/functions'

require_relative './../../../vercel/functions/a-vigenere-standard-cipher'
require_relative './../../../vercel/functions/b-vigenere-autokey-cipher'
require_relative './../../../vercel/functions/d-playfair-cipher'
require_relative './../../../vercel/functions/f-hill-cipher'


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

    render json: vigenere_standard_cipher_controller(body)
  end
  def vigenere_autokey_cipher
    # get body
    body = request.body.read

    render json: vigenere_autokey_cipher_controller(body)
  end

  def hill_cipher
    # get body
    body = request.body.read

    render json: hill_cipher_controller(body)
  end
  
  def playfair_cipher
    # get body
    body = request.body.read

    render json: playfair_cipher_controller(body)
  end

end
