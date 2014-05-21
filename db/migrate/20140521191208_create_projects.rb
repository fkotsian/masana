class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
      t.string :title, null: false
      t.references :user, index: true

      t.timestamps
    end

    add_index :projects, :title
  end
end
