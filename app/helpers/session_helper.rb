module SessionHelper
  def current_user
    @current_user ||= User.find_by(session_token: session[:token])
  end
  
  def log_in(user)
    session[:token] = user.reset_session_token!
    @current_user = user
  end
  
  def log_out_user
    current_user.reset_session_token!
    @current_user = nil
    session[:token] = nil
  end
  
  def require_logged_in
    redirect_to root_url unless current_user
  end
end
