json.array! taggings do |tagging|
  json.id tagging.id
  json.note_id tagging.note_id
  json.notebook_id tagging.note.notebook_id
  json.tag_id tagging.tag_id
  json.name tagging.tag.name
end
