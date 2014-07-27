class Api::TaggingsController < ApplicationController
  def index
    @taggings = current_user.taggings.includes :tag
    render "_index", locals: { taggings: @taggings }
  end
  
  def create
    @tag = Tag.find_by(name: params[:name])
    
    unless @tag
      @tag = Tag.new(name: params[:name])
      
      unless @tag.save
        render json: @tag, status: :unprocessable_entity
        return
      end
    end
    
    @tagging = Tagging.new({
      note_id: params[:note_id],
      tag_id: @tag.id
    })
    
    if @tagging.save()
      render partial: "tagging.json.jbuilder", locals: {
        tagging: {
          id: @tagging.id,
          tag_id: @tagging.tag_id,
          note_id: @tagging.note_id,
          name: @tag.name
        }
      }
    else
      render json: @tagging.errors, status: :unprocessable_entity
    end
  end
  
  def destroy
    @tagging = Tagging.find(params[:id])
    
    render json: @tagging
  end
end