// define a object to store all variable and functions inside it.
// in javascript objects can store variable and functions.
// read js docs to understand more..

var App = {}

// this command makes the code inside run only after th body is loaded
$(function() {

	// this way we can store a function inside variable and call it.
	// we are grouping all functions inside App variable
	App.init = function() {
		console.log(" App init");
	}

	App.init();

})