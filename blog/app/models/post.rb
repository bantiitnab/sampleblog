class Post < ApplicationRecord
	has_many :comments, dependent: :destroy
	has_many :tag_posts, dependent: :destroy
	has_many :tags, :through => :tag_posts
end
