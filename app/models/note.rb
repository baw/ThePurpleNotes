# == Schema Information
#
# Table name: notes
#
#  id          :integer          not null, primary key
#  title       :string(255)
#  content     :text
#  notebook_id :integer          not null
#  created_at  :datetime
#  updated_at  :datetime
#

class Note < ActiveRecord::Base
  before_destroy :mark_sharing_as_inactive
  
  validates :notebook, presence: true
  
  belongs_to :notebook
  delegate :user, to: :notebook
  
  has_many :taggings, dependent: :destroy
  has_one :sharing

  has_many :tags, through: :taggings, source: :tag
  
  def mark_sharing_as_inactive
    return if self.sharing.nil?
    
    sharing = self.sharing
    sharing.active = false
    sharing.save!
  end
end
