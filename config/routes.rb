Rails.application.routes.draw do
  resources :users
  resource :session
  
  root to: "static#root"
end
