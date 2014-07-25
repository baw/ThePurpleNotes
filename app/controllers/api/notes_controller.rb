class Api::NotesController < ApplicationController
  def index
    @notes = Note.all
    render json: @notes
  end
  
  def show
    @note = Note.find(params[:id])
    render json: @note, include: :tags
  end
  
  def create
    @note = Note.new(note_params)
    @note.notebook_id = params[:notebook_id]
    
    if @note.save
      render json: @note
    else
      render json: @note.errors, status: :unprocessable_entity
    end
  end
  
  def update
    @note = Note.find(params[:id])
    
    if @note.update_attributes(note_params)
      render json: @note
    else
      render json: @note.errors, status: :unprocessable_entity
    end
  end
  
  def destroy
    @note = Note.find(params[:id])
    @note.destroy
    render json: @note
  end
  
  private
  
  def note_params
    params.permit(:title, :content)
  end
end