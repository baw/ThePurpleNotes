FactoryGirl.define do
  factory :user do
    username { Faker::Internet.user_name }
    password { Faker::Internet.password }
  end
  
  factory :note do
    title { Faker::Name.title }
    content { Faker::Lorem.paragraph(2) }
    association :notebook, factory: :notebook
    association :sharing, factory: :sharing
  end
  
  factory :notebook do
    title { Faker::Name.title }
    association :user, factory: :user
  end
  
  factory :sharing do
    url { Faker::Internet.slug }
    active true
    association :note, factory: :note
  end
end