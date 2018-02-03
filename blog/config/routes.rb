Rails.application.routes.draw do
	
 

  	get '/', to:'welcome#index'
	get 'welcome/index', to:'welcome#index'

	# if url and controller#action mapping follow same name as above
	# we can just type url(controller/action) and rails will map it to desired controller#action 
	# just like below 'tutorial/index' is mapped to TutorialController's index action.
	get 'tutorial/index'

	get 'posts/tag_posts'
	get 'posts/index'
	get 'posts/new'
	post 'posts', to: 'posts#create'
	get 'posts/:id', to: 'posts#show'
	get 'posts/:id/edit', to: 'posts#edit'
	post 'posts/:id', to: 'posts#update'
	delete 'posts/:id', to: 'posts#destroy'

	post 'posts/:id/add_comment', to: 'posts#add_comment'

	resources :tags

end
