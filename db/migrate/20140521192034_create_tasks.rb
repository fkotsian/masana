class CreateTasks < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.string :title, null: false
      t.text :description
      t.date :due_date
      t.boolean :completed, default: false
      t.references :user, index: true
      t.references :list, index: true

      t.timestamps
    end

    add_index :items, :title
    add_index :items, :due_date
    add_index :items, :completed
  end
end
