class ChangeNoteContentToText < ActiveRecord::Migration
  def change
    change_column :notes, :content, :text
  end
end
