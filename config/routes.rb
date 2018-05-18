Rails.application.routes.draw do
  root to: 'rooms#show'
  get "sandbox" => 'rooms#dummy'

  resources :rooms, shallow: true do
    resources :messages do
      collection do
        get 'old'
      end
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
  # Serve websocket cable requests in-process
  # mount ActionCable.server => '/cable'
end
