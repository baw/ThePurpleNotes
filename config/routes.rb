Rails.application.routes.draw do
  resources :users
  resource :session
  
  root to: "static#root"
  get "/notes", to: "static#backbone", as: "backbone"
  
  namespace :api do
    resources :notebooks do
      resources :notes, except: [:show]
    end
    
    resources :notes, only: [:show]
  end
end
