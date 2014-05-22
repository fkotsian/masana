json.extract! project, :id, :title, :user_id, :created_at, :updated_at
json.lists project.lists, partial: 'api/lists/list', as: :list