class CreateProjectMemberships < ActiveRecord::Migration
  def change
    create_table :project_memberships do |t|
      t.references :member, index: true
      t.references :project, index: true

      t.timestamps
    end
  end
end
