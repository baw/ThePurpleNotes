# == Schema Information
#
# Table name: sharings
#
#  id         :integer          not null, primary key
#  note_id    :integer          not null
#  url        :string(255)      not null
#  created_at :datetime
#  updated_at :datetime
#  active     :boolean          default(TRUE), not null
#

class Sharing < ActiveRecord::Base
  validates :note, :url, presence: true
  validates :url, uniqueness: true
  
  belongs_to :note
  
  def generate_unique_url
    url = SecureRandom::urlsafe_base64(16)
    
    @sharing = Sharing.find_by(url: url)
    
    if @sharing
      self.generate_unique_url
    else
      self.url = url
    end
  end
end
