class List < ActiveRecord::Base
  belongs_to :project
  has_many :items, dependent: :destroy

  validates :title, presence: true
end
