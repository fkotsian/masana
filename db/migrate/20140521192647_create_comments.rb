class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.text :body, null: false
      t.references :item, index: true
      t.references :user, index: true

      t.timestamps
    end
  end
end
