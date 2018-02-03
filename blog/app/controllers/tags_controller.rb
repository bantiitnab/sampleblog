class TagsController < ApplicationController
  def index
  	@tags = Tag.all
  end

  def new
  end

  def create
  	# get parameters
  	name = params[:name]
  	description = params[:description]

  	# create tag
  	tag = Tag.create(name: name, description: description)

  	# create json response
  	msg = {tag: tag, status: 200}

  	render json: msg
  end

  def show
  	@tag = Tag.find(params[:id])
  end

  def edit
	@tag = Tag.find(params[:id])  	
  end
  
  def update
  	# get parameters
  	name = params[:name]
  	description = params[:description]
  	tag = Tag.find(params[:id])

  	puts "hhhhhhhhh"
  	
  	# update tag
  	tag.name = name
  	tag.description = description
	tag.save

  	# create json response
  	msg = {tag: tag, status: 200}

  	# new we can send different response for different kind of request,
  	# separate response for ajax and normal post request
  	respond_to do |format|
	    format.html { redirect_to "/tags/index" }
	    format.json { render json: msg}
	end
  	
  end

  def destroy
  	tag = Tag.find(params[:id])
  	tag.destroy()
  	render json: {status: 200}
  end
end
