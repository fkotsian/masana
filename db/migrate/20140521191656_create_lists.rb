class CreateLists < ActiveRecord::Migration
  def change
    create_table :lists do |t|
      t.string :title
      t.references :project, index: true

      t.timestamps
    end
  end
end
