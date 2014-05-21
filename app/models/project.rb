class Project < ActiveRecord::Base
  belongs_to :owner, class_name: 'Project', foreign_key: user_id, primary_key: id
  has_many :lists

  validates :title, presence: true
end
