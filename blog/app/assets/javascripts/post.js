// define a object to store all variable and functions inside it.
// in javascript objects can store variable and functions.
// read js docs to understand more..

var Post = {}

// this command makes the code inside run only after th body is loaded


// this way we can store a function inside variable and call it.
// we are grouping all functions that relate to post inside Post variable
Post.init = function() {
	console.log(" Post init");
	$(".delete-post-btn").on('click', Post.deletePost);
	$("#add-comment-btn").on('click', Post.addComment);
}

Post.deletePost = function(e) {
	// get the id of post
	var id = $(e.target).attr('data-id');
	console.log("deleting post with id " + id);
	
	// get the authenticity token to tell server that we are sending valid request
	var auth_token = $("#authenticity_token").attr("value")

	// do an ajax request, read about ajax request
	// in nutshell , this kind of request does not reloads the page
	// it runs in background

	// ajax have various options, like on completion of request "success: function" block runs...
	$.ajax({
		url: "/posts/" + id,
		type: "delete",
		data: {'authenticity_token': auth_token},		
		success: function(result) {
			console.log("succesful", result)
			if (result.status == 200) {
				$("#post-" + id).remove()
			}
		},
		error: function() {
			console.log("error")
		},
		complete: function() {
			console.log("completed")
		}
	})
}

Post.addComment = function(e) {
	// get the id of post
	var postId = $(e.target).attr('post-id');
	console.log("adding comment to post with id " + postId);
	// get the comment text from the input
	var text = $("#comment-input").val()
	// get the authenticity token to tell server that we are sending valid request
	var authToken = $("#authenticity_token").attr("value")

	
	// ajax properties=> url : location of your url, type: method of your request [get/post], data: data you want to send
	// send the text and post_id as parameters 
	$.ajax({
		url: "/posts/" + postId + "/add_comment",
		type: "post",
		data: {'authenticity_token': authToken, 'text': text},		
		success: function(result) {
			console.log("succesful", result)
			if (result.status == 200) {
				// add the comment using jquery.. create an element with comment text and append it to post
				var comment = $("<div></div>")
				// this is just the way to access object property..
				// you can eith access using brackets[] or using dot notations
				comment.text(result['comment'].body)
				$("#post-" + postId).find(".comments").append(comment)
				// reset the input box
				$("#comment-input").val('');
			}
		},
		error: function() {
			console.log("error")
		},
		complete: function() {
			console.log("completed")
		}
	})
}


