class Api::NotebooksController < ApplicationController
  def index
    @notebooks = Notebook.where(user_id: current_user.id)
    render json: @notebooks, include: :notes
  end
  
  def show
    @notebook = Notebook.find(params[:id])
    render json: @notebook, include: :notes
  end
  
  def create
    @notebook = Notebook.new(notebook_params)
    @notebook.user_id = current_user.id
    
    if @notebook.save
      render json: @notebook
    else
      render json: @notebook.errors, status: :unprocessable_entity
    end
  end
  
  def update
    @notebook = Notebook.find(params[:id])
    
    if @notebook.update_attributes(notebook_params)
      render json: @notebook
    else
      render json: @notebook.errors, status: :unprocessable_entity
    end
  end
  
  def destroy
    @notebook = Notebook.find(params[:id])
    @notebook.destroy
    
    render @notebook
  end
  
  private
  
  def notebook_params
    params.permit(:title)
  end
end