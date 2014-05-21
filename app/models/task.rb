class Task < ActiveRecord::Base
  belongs_to :owner, class_name: 'User', foreign_key: user_id, primary_key: id

  validates :title, presence: true
end
