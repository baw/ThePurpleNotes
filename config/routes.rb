Rails.application.routes.draw do
  resources :users
  resource :session
  
  root to: "static#root"
  get "/notes", to: "static#backbone", as: "backbone"
  resources :sharings, only: :show
  
  namespace :api, defaults: { format: :json } do
    resources :notebooks do
      resources :notes
    end
    
    resources :sharings, only: [:create, :delete]
    resources :taggings
  end
end
