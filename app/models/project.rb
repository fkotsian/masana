class Project < ActiveRecord::Base
  belongs_to :owner, class_name: 'User', foreign_key: :user_id, primary_key: :id, inverse_of: :owned_projects
  has_many :lists, dependent: :destroy

  has_many :project_memberships
  has_many :members, through: :project_memberships, source: :member,
            inverse_of: :projects_where_i_am_a_member

  validates :title, presence: true
end
