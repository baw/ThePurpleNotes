require "rails_helper"

describe Notebook do
  it { should validate_presence_of :title }
  it { should validate_presence_of :user }
  it { should belong_to :user }
  it { should have_many(:notes).dependent(:destroy) }
end