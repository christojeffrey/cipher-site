require_relative  'functions'

class ApplicationController < ActionController::API
    def vehicles
        # get query params
      render json: { name: 'Tesla Model 3' }
    end
    def bob_controller
      render json: { name: 'bob Model 3' }
    end
    def hello_controller
        render json: hello("world")
    end

  end