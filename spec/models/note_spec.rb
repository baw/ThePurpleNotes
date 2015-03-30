require "rails_helper"

describe Note do
  before :each do
    @note = create(:note)
  end
  
  it { should validate_presence_of :notebook}
  
  it { should belong_to :notebook }
  it { should delegate_method(:user).to(:notebook) }
  it { should have_one :sharing }
  it { should have_many(:taggings).dependent(:destroy) }
  it { should have_many :tags }
  
  describe "#mark_sharing_as_inactive" do
    it "should set sharing inactive" do
      expect(@note.sharing.active).to be true
      
      @note.mark_sharing_as_inactive
      
      expect(@note.sharing.active).to be false
    end
  end
  
  describe "before_destroy" do
    it "should call mark_sharing_as_inactive" do
      expect(@note).to receive :mark_sharing_as_inactive
      
      @note.destroy
    end
  end
end