require_relative './../../../vercel/functions/functions'

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

end