class Api::NotesController < ApplicationController
  def index
    @notes = Note.all
    render json: @notes
  end
  
  def show
    @note = Note.find(params[:id])
    render json: @note
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
  
  private
  
  def note_params
    params.permit(:title)
  end
end