class CreateSharings < ActiveRecord::Migration
  def change
    create_table :sharings do |t|
      t.integer :note_id, null: false
      t.string :url, null: false
      
      t.timestamps
    end
    
    add_index :sharings, :url, unique: true
  end
end
