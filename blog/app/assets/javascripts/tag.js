
var Tag = {}

Tag.init = function() {
	console.log(" Tag init");
	$("#add-tag-btn").on('click', Tag.addTag);	
	$(".edit-tag-btn").on('click', Tag.editTag)
	$(".delete-tag-btn").on('click', Tag.deleteTag)
}

Tag.deleteTag = function(e) {
	// get the id of tag whose button is clicked
	var id = $(e.target).parents('.tag').attr('data-id');
	console.log("deleting tag with id " + id);
	var auth_token = $("#authenticity_token").attr("value")

	$.ajax({
		url: "/tags/" + id,
		type: "delete",
		data: {'authenticity_token': auth_token},		
		success: function(result) {
			console.log("succesful", result)
			if (result.status == 200) {
				$("#tag-" + id).remove()
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

Tag.editTag = function(e) {
	// get the id of post
	var id = $(e.target).attr('data-id');
	console.log("deleting tag with id " + id);
	var auth_token = $("#authenticity_token").attr("value")

	$.ajax({
		url: "/tags/" + id,
		type: "delete",
		data: {'authenticity_token': auth_token},		
		success: function(result) {
			console.log("succesful", result)
			if (result.status == 200) {
				$("#tag-" + id).remove()
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

Tag.addTag = function(e) {
	// get the name and description
	var tagName = $("#tag-name").val()
	var tagDescription = $("#tag-description").val()
	// get the authenticity token to tell server that we are sending valid request
	var authToken = $("#authenticity_token").attr("value")

	
	// ajax properties=> url : location of your url, type: method of your request [get/post], data: data you want to send
	// send the text and post_id as parameters 
	$.ajax({
		url: "/tags",
		type: "post",
		data: {'authenticity_token': authToken, 'name': tagName, 'description': tagDescription},		
		success: function(result) {
			console.log("succesful", result)
			if (result.status == 200) {
				// add the tag in list
				var tag = Tag.buildTag(result['tag'])				
				$(".tags-list").append(tag)
				// reset the input box
				$("#tag-name").val('');
				$("#tag-description").val('');
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

Tag.buildTag = function(tag) {
	var tagClone = $(".tag-clone").clone().removeClass("tag-clone").removeClass("d-none")
	tagClone.attr('data-id', tag.id)
	tagClone.attr('id', 'tag-' + tag.id)
	tagClone.find(".name").text(tag.name)
	tagClone.find(".description").text(tag.description)
	tagClone.find(".edit-tag-link").attr('href', '/tags/' + tag.id + '/edit')
	tagClone.find(".delete-tag-btn").on('click', Tag.deleteTag)
	return tagClone;
}

