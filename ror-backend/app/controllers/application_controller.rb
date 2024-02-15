class ApplicationController < ActionController::API
    def vehicles
        # get query params
      render json: { name: 'Tesla Model 3' }
    end
    def bob
      render json: { name: 'bob Model 3' }
    end
  end