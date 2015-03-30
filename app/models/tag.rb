# == Schema Information
#
# Table name: tags
#
#  id         :integer          not null, primary key
#  name       :string(255)      not null
#  created_at :datetime
#  updated_at :datetime
#

class Tag < ActiveRecord::Base
  validates :name, presence: true, uniqueness: true
  
  has_many :taggings
  has_many :notes, through: :taggings, source: :note
end
