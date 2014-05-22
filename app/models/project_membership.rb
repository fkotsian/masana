class ProjectMembership < ActiveRecord::Base
  belongs_to :project, inverse_of: :project_memberships
  belongs_to :member,
    class_name: 'User',
    foreign_key: :member_id,
    primary_key: :id,
    inverse_of: :project_memberships
end
