class Item < ActiveRecord::Base
  belongs_to :list
  belongs_to :owner, class_name: 'User', foreign_key: user_id, primary_key: id
  has_many :comments, dependent: :destroy

  validates :title, presence: true
end
