json.set! :notebooks do
  json.partial! "api/notebooks/index.json.jbuilder", notebooks: notebooks
end

json.set! :taggings do
  json.partial! "api/taggings/index.json.jbuilder", taggings: taggings
end