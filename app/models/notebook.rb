# == Schema Information
#
# Table name: notebooks
#
#  id         :integer          not null, primary key
#  title      :string(255)      not null
#  user_id    :integer          not null
#  created_at :datetime
#  updated_at :datetime
#

class Notebook < ActiveRecord::Base
  validates :title, :user, presence: true
  
  belongs_to :user
  
  has_many :notes, dependent: :destroy
end
