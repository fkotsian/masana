Rails.application.routes.draw do
  root 'asana_pages#root'

  devise_for :users
  devise_scope :user do
    get 'signin', to: 'devise/sessions#new'
    get 'signup', to: 'devise/registrations#new'
  end

  namespace :api, defaults: { format: :json } do
    resources :projects, except: [:new, :edit] do
      resources :lists, except: [:new, :edit]
    end

    resources :lists, only: [:show, :update, :destroy] do
      resources :items, only: [:index, :show, :create, :update, :destroy]
    end

    resources :project_memberships, only: :destroy
  end

end
