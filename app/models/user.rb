class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # has_many :projects, class_name: 'Project', foreign_key: user_id, primary_key: id
  # has_many :items, class_name: 'Item', foreign_key: user_id, primary_key: id

end
