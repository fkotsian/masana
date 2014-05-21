class Comment < ActiveRecord::Base
  belongs_to :item
  belongs_to :author, class_name: 'User', foreign_key: user_id, primary_key: id

  validates :body, presence: true
end
