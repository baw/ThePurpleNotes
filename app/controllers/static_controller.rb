class StaticController < ApplicationController
  before_action :require_logged_in, only: [:backbone]
  def root
    render :root
  end
  
  def backbone
    @taggings = current_user.taggings.includes :tag

    @notebooks = current_user.notebooks.includes :notes
    
    render :backbone
  end
end