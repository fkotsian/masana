class Item < ActiveRecord::Base
  belongs_to
  belongs_to :owner, class_name: 'Item', foreign_key: user_id, primary_key: id

  validates :title, presence: true
end
