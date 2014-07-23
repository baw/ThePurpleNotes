class StaticController < ApplicationController
  before_action :require_logged_in, only: [:backbone]
  def root
    render :root
  end
  
  def backbone
    render :backbone
  end
end