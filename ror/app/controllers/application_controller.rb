require_relative './../../../functions/functions'

class ApplicationController < ActionController::API
  def testing
    render json: { name: 'hello' }
  end
  
  def hello_controller
      render json: hello("world")
  end

end