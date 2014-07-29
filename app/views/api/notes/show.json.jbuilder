json.(@note, :id, :title, :content, :notebook_id, :created_at, :updated_at)

json.tags @note.tags

if @note.sharing && @note.sharing.active
  json.sharing @note.sharing
end
