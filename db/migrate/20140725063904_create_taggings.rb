class CreateTaggings < ActiveRecord::Migration
  def change
    create_table :taggings do |t|
      t.integer :tag_id, null: false
      t.integer :note_id, null: false
      
      t.timestamps
    end
    
    add_index :taggings, [:tag_id, :note_id], unique: true
  end
end
