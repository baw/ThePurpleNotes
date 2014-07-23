class SessionsController < ApplicationController
  def new
    render :new
  end
  
  def create
    @user = User.find_by_credentials(params[:username], params[:password])
    
    if @user
      log_in(@user)
      redirect_to backbone_url
    else
      flash.now[:errors] = ["Invalid username or password"]
      render :new
    end
  end
  
  def destroy
    log_out_user
    redirect_to new_session_url
  end
end