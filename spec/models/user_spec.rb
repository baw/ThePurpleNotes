require "rails_helper"

describe User do
  before :each do
    @password = "password"
    
    @user = create(:user, password: @password)
  end
  
  it { should have_many :notebooks }
  it { should have_many(:notes).through(:notebooks) }
  it { should have_many(:taggings).through(:notes) }
  it { should have_many(:tags).through(:notes) }
  
  it { should validate_presence_of :username }
  it { should validate_presence_of :password_diguest }
  
  it "should set the session_token before validating" do
    @user = build :user
    
    expect(@user.session_token).to be_nil
    @user.valid?
    expect(@user.session_token).not_to be_nil
  end
  
  describe ".find_by_credentials" do
    context "with correct password" do
      it "should find the user" do
        user = User.find_by_credentials(@user.username, @password)
        
        expect(user).not_to be_nil
        expect(user.id).to be @user.id
      end
    end
    
    context "with incorrect password" do
      it "should find the user" do
        user = User.find_by_credentials(@user.username, Faker::Internet.user_name)
        
        expect(user).to be_nil
      end
    end
  end
  
  describe "#is_password?" do
    it "should return true for correct password" do
      expect(@user.is_password?(@password)).to be true
    end
    
    it "should return false for not correct password" do
      expect(@user.is_password?(Faker::Internet.password)).to be false
    end
  end
  
  describe "#password=" do
    it "should change the password_diguest" do
      password_diguest = @user.password_diguest
      
      @user.password = "asdaf"
      
      expect(@user.password_diguest).not_to be password_diguest
    end
  end
  
  describe "#reset_session_token!" do
    it "should reset session_token" do
      session_token = @user.session_token
      
      expect(session_token).not_to be_nil
      @user.reset_session_token!
      expect(@user.session_token).not_to be_nil
      expect(@user.session_token).not_to be session_token
    end
  end
end