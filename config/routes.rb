Rails.application.routes.draw do
  resources :users
  resource :session
  
  root to: "static#root"
  get "/notes", to: "static#backbone", as: "backbone"
  
  namespace :api, defaults: { format: :json } do
    resources :notebooks do
      resources :notes do
        resources :tags
      end
    end
    
    resources :taggings
  end
end
