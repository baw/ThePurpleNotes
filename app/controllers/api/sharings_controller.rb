class Api::SharingsController < ApplicationController
  def show
    @sharing = Sharing.find_by(url: params[:id])
    
    if @sharing && @sharing.active
      @markdown = @sharing.note.content
      render :show
    else
      @markdown = "Note not found"
      render :show, status: 404
    end
  end
  
  def create
    @sharing = Sharing.find_by(note_id: params[:note_id])
    
    if @sharing
      @sharing.update_atrributes(active: true) unless @sharing.active
      
      render json: @sharing
      return
    end
    
    @sharing = Sharing.new()
    @sharing.note_id = params[:note_id]
    
    if @sharing.note.user == current_user
      @sharing.generate_unique_url
      
      if @sharing.save
        render json: @sharing
      else
        render json: @sharing.errors, status: :unprocessable_entity
      end
    else
      render json: "unathorized user", status: 401
    end
  end
  
  def update
    @sharing = Sharing.find(params[:id])
    
    if @sharing.note.user == current_user
      @sharing.active = params[:active]
      @sharing.save!
      render json: @sharing
    else
      render json: "unathorized user", status: 401
    end
  end
end