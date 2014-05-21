Rails.application.routes.draw do

  get 'comments/index'

  get 'comments/create'

  get 'comments/update'

  get 'comments/destroy'

  get 'items/index'

  get 'items/create'

  get 'items/update'

  get 'items/destroy'

  get 'lists/index'

  get 'lists/create'

  get 'lists/update'

  get 'lists/destroy'

  get 'projects/index'

  get 'projects/show'

  get 'projects/new'

  get 'projects/create'

  get 'projects/edit'

  get 'projects/update'

  get 'projects/destroy'

  devise_for :users
  devise_scope :user do
    get 'signin', to: 'devise/sessions#new'
    get 'signup', to: 'devise/registrations#new'
  end

  root 'asana_pages#root'
end
