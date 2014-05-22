json.extract! item, :id, :title, :description, :due_date, :completed, :user_id, :list_id, :created_at, :updated_at
json.comments item.comments, partial: 'api/comments/comment', as: :comment