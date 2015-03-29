require "rails_helper"

describe User do
  before :each do
    @user = create(:user)
  end
  
  it { should have_many :notebooks }
  it { should have_many(:notes).through(:notebooks) }
  it { should have_many(:taggings).through(:notes) }
  it { should have_many(:tags).through(:notes) }
end