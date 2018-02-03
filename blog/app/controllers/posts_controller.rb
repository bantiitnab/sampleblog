class PostsController < ApplicationController
	def index
		# adding @ makes this variable availbe inside views
		@posts = Post.all
	end

	def new
		# rails uses view with same name as action...
		# rails will by default render 'posts/new' view, but you can change it , if you want
	end

	def create
		# get data from params
		title = params[:title]
		body = params[:body]
		user_name = params[:user_name]
		# get tags , first strip white spaces , then split them to make array of tags
		tagNames = params[:tags].strip().split(',')

		# create new Post object			
		post = Post.new(title: title, body: body, created_by: user_name)
		post.save

		# there are few different way to connect many to many relationship between 
		# post and tag

		
		for tagName in tagNames
			# first , we can create tag separately and then connect post usinf tagPost model
			# get the tag using where property, if there is not tag then we will
			# get nil, equivalent to null in other lanaguages
			tag = Tag.where(name: tagName).first

			# there are various ways to check if element is nil or not
			# we can use : if tag == nil 
			# we can use : if tag.nil?, this is a ruby specific way
			if tag == nil
				tag = Tag.create(name: tagName.strip)
			end
			# create connection between post and tag in TagPost model
			TagPost.create(post: post, tag: tag)

			# second way is to use rails specific ways, use the connections function
			# that we get when we define them in model
			# so post has many tag_posts, we can use it to create connection
			# but still we have to create tag first if it is not there..
			# we can use rails function to do so
			# tag = Tag.where(name: tagName.trim).first_create
			# TagPost.create(post: post, tag: tag)
		end

		# redirect user to post page
		redirect_to '/posts/' + post.id.to_s
	end

	def show		
		post = Post.find(params[:id])		
		# if you want to explicity tell rails to use some template other than
		# default one , in this case it's "posts/show".. 		
		# you can use below syntax,
		# if you want to send some data explicitly , you can sent inside 'locals' variable
		render :template => "posts/show", locals: {post: post}
	end

	def edit		
		id = params[:id]
		# where function return array of objects
		@post = Post.where(id: id)[0]
	end

	def update
		# get data from params
		id = params[:id]
		title = params[:title]
		body = params[:body]
		
		# get post object
		post = Post.find(id)
		# update its properties
		post.title = title
		post.body = body
		# save the changes
		post.save

		# redirect back to post
		redirect_to "/posts/#{post.id}"
	end


	def destroy
		# read about begin and rescue blocks (normally called as try-catch blocks in other langaues)
		# if begin block gets any error, rescue block is executed (its there to help in any error situations)
		# rescue block saves program from breaking....
		
		# get the post
		post = Post.find(params[:id])
		# destroy the post
		post.destroy()
		# return a json response
		# read about json objects
		render json: {status: 200}
		
	end


	def add_comment
		text = params[:text]

		post_id = params[:id]
		post = Post.find(post_id)

		# create comment
		# there are various ways to create comment
		# first is to use Comment class , direct way
		comment = Comment.create(body: text, post: post)
		# comment = Comment.create(body: text, post_id: post.id)

		# second way is to use post and it's relationship which commen which is 1 to many
		# here we dont need to tell post , since we are using post object
		# comment = post.comments.create(body: text)
		msg = {comment: comment, status: 200}
		render json: msg
	end


	def tag_posts
		@tags = Tag.all
	end

end


