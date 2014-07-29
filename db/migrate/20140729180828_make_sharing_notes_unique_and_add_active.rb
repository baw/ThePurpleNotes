class MakeSharingNotesUniqueAndAddActive < ActiveRecord::Migration
  def change
    add_index :sharings, :note_id, unique: true
    add_column :sharings, :active, :boolean, default: true, null: false
  end
end
