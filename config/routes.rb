Rails.application.routes.draw do
  root to: 'rooms#index'

  resources :rooms do
    resources :messages
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
  # Serve websocket cable requests in-process
  # mount ActionCable.server => '/cable'
end
