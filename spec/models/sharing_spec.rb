require "rails_helper"

describe Sharing do
  before :each do
    @sharing = create :sharing
  end
  
  it { should validate_presence_of :note }
  it { should validate_presence_of :url }
  it { should validate_uniqueness_of :url }
  it { should belong_to :note }
  
  describe "#generate_unique_url" do
    it "should create a new url" do
      url = @sharing.url
      
      @sharing.generate_unique_url
      
      expect(@sharing.url).not_to be url
    end
    
    it "should not save the sharing" do
      @sharing.generate_unique_url
      
      expect(@sharing.changed?).to be true
    end
  end
end