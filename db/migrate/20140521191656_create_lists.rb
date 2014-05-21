class CreateLists < ActiveRecord::Migration
  def change
    create_table :lists do |t|
      t.string :title, null: false
      t.references :project, index: true

      t.timestamps
    end

    add_index :lists, :title
  end
end
