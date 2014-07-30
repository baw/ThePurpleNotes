json.array! notebooks do |notebook|
  json.id notebook.id
  json.title notebook.title
  json.user_id notebook.user_id
  json.created_at notebook.created_at
  json.updated_at notebook.updated_at
  
  json.set! :notes do
    json.partial! "api/notes/index.json.jbuilder", notes: notebook.notes
  end
end
