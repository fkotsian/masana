json.extract! list, :id, :title, :project_id, :created_at, :updated_at
json.items list.items, partial: 'api/items/item', as: :item