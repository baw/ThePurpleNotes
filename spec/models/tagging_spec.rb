require "rails_helper"

describe Tagging do
  it { should validate_presence_of :tag }
  it { should validate_presence_of :note }
  it { should belong_to :tag }
  it { should belong_to :note }
end