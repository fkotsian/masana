class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.string :title, null: false
      t.text :description
      t.date :due_date
      t.boolean :completed, default: false
      t.references :user, index: true

      t.timestamps
    end

    add_index :tasks, :title
    add_index :tasks, :due_date
    add_index :tasks, :completed
  end
end
