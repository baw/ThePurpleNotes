class CreateNotes < ActiveRecord::Migration
  def change
    create_table :notes do |t|
      t.string :title
      t.string :content
      t.integer :notebook_id, null: false
      
      t.timestamps
    end
    
    add_index :notes, :notebook_id
  end
end
