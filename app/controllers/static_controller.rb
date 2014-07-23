class StaticController < ApplicationController
  def root
    render :root
  end
  
  def backbone
    render :backbone
  end
end