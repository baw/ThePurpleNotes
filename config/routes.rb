Rails.application.routes.draw do
  resources :users
  resource :session
  
  root to: "static#root"
  get "/notes", to: "static#backbone", as: "backbone"
  
  namespace :api do
    resources :notebooks
  end
end
