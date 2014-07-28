# == Schema Information
#
# Table name: notes
#
#  id          :integer          not null, primary key
#  title       :string(255)
#  content     :string(255)
#  notebook_id :integer          not null
#  created_at  :datetime
#  updated_at  :datetime
#

class Note < ActiveRecord::Base
  validates :notebook, presence: true
  
  belongs_to :notebook
  
  has_many :taggings
  
  has_many :tags, through: :taggings, source: :tag
end
