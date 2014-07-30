json.array! notes do |note|
  json.id note.id
  json.title note.title
  json.content note.content
  json.notebook_id note.notebook_id
  json.created_at note.created_at
  json.updated_at note.updated_at
  if note.sharing
    json.set! :sharing do
      json.partial! "api/sharings/sharing.json.jbuilder", sharing: note.sharing
    end
  end
end