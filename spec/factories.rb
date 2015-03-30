FactoryGirl.define do
  factory :user do
    username { Faker::Internet.user_name }
    password { Faker::Internet.password }
  end
  
  factory :note do
    title { Faker::Name.title }
    content { Faker::Lorem.paragraph(2) }
    association :notebook, factory: :notebook
  end
  
  factory :notebook do
    title { Faker::Name.title }
    association :user, factory: :user
  end
end