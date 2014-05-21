class Project < ActiveRecord::Base
  belongs_to :owner, class_name: 'User', foreign_key: user_id, primary_key: id
  has_many :lists, dependent: :destroy

  validates :title, presence: true
end
