class List < ActiveRecord::Base
  belongs_to :project
  has_many :items

  validates :title, presence: true
end
