class UsersController < ApplicationController
  def new
    render :new
  end
  
  def create
    @user = User.new(user_params)
    
    if @user.save
      log_in(@user)
      redirect_to backbone_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end
  
  def guest_account
    if session[:username] && session[:password]
      @user = User.find_by_credentials(session[:username], session[:password])
      log_in(@user)
    else
      userCount = User.count
      username = "Guest " + userCount.to_s
      password = SecureRandom::urlsafe_base64(16)
      
      @user = User.new(username: username, password: password)
      
      log_in(@user)
      session[:username] = username
      session[:password] = password
      
    end
    
    redirect_to backbone_url
  end
  
  private
  
  def user_params
    params.require(:user).permit(:username, :password)
  end
end