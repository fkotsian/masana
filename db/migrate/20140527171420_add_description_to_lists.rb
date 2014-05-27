class AddDescriptionToLists < ActiveRecord::Migration
  def change
    add_column :lists, :description, :text, default: "Add a description"
  end
end
