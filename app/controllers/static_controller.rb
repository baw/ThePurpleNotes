class StaticController < ApplicationController
  before_action :require_logged_in, only: [:backbone]
  def root
    if current_user.nil?
      render :root
    else
      redirect_to backbone_url
    end
  end
  
  def backbone
    @taggings = current_user.taggings.includes [:tag, :note]
    @notebooks = current_user.notebooks.includes notes: :sharing
    
    render :backbone
  end
end
