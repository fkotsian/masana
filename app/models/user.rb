class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :owned_projects, dependent: :destroy
  has_many :items, dependent: :nullify
  has_many :comments, dependent: :nullify

  has_many :project_memberships
  has_many :projects_where_i_am_a_member,
            through: :project_memberships,
            source: :project,
            inverse_of: :members

end
