class Api::TagsController < ApplicationController
  def index
    @note = Note.find(params[:note_id])
    @tags = @note.tags
    
    render json: @tags
  end
  
  def create
    @tag = Tag.find_by(name: params[:name])
    
    unless @tag
      @tag = Tag.new(name: params[:name])
      
      unless @tag.save
        render json: @tag.errors, status: :unprocessable_entity
        return
      end
    end
    
    @taggings = Tagging.new({note_id: params[:note_id], tag_id: @tag.id})
    
    if @taggings.save
      render json: @taggings
    else
      render json: @taggings.errors, status: :unprocessable_entity
    end
  end
  
  def destroy
    @tagging = Tagging.find_by(
      note_id: params[:note_id],
      tag_id: params[:tag_id]
    )
    @tagging.destroy
    
    render json: @tagging
  end
end