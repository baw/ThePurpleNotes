# == Schema Information
#
# Table name: users
#
#  id               :integer          not null, primary key
#  username         :string(255)      not null
#  password_diguest :string(255)      not null
#  session_token    :string(255)      not null
#  created_at       :datetime
#  updated_at       :datetime
#

class User < ActiveRecord::Base
  before_validation :ensure_session_token
  
  validates :username, :password_diguest, :session_token, presence: true
  
  has_many :notebooks
  
  def User.find_by_credentials(username, password)
    user = User.find_by(username: username)
    
    if user.is_password?(password)
      user
    else
      nil
    end
  end
  
  def generate_session_token
    SecureRandom.urlsafe_base64(16)
  end
  
  def is_password?(password)
    bcrypt_object = BCrypt::Password.new(self.password_diguest)
    
    bcrypt_object.is_password?(password)
  end
  
  def password=(password)
    self.password_diguest = BCrypt::Password.create(password)
  end
  
  def reset_session_token!
    self.session_token = self.generate_session_token
    self.save!
    self.session_token
  end
  
  private
  
  def ensure_session_token
    self.session_token ||= self.generate_session_token
  end
end
