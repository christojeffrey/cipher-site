Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end


Rails.application.routes.draw do
  # examples
  get 'api/testing', to: 'application#testing'
  get 'api/hello', to: 'application#hello'
  post 'api/testing-post', to: 'application#testing_post'

  # ciphers
  post 'api/cipher/vigenere-standard', to: 'application#vigenere_standard_cipher'
  post 'api/cipher/vigenere-autokey', to: 'application#vigenere_autokey_cipher'
  post 'api/cipher/vigenere-extended', to: 'application#vigenere_extended_cipher'
  post 'api/cipher/affine', to: 'application#affine_cipher'
  post 'api/cipher/hill', to: 'application#hill_cipher'
  post 'api/cipher/playfair', to: 'application#playfair_cipher'
  post 'api/cipher/enigma', to: 'application#enigma_cipher'
  post 'api/cipher/super-encryption', to: 'application#super_encryption_cipher'
end
