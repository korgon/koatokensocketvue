// API

'use strict';

// must pass in the springboard dependency
module.exports = function(project) {
	let options = project.getOptions();

	return {
		// Get example
		// dealGet: function*() {
		// 	this.response.type = 'json';
		// 	this.response.body = yield springboard.getStatus();
		// },

		// Post example
		// dealPost: function*() {
		// 	this.response.type = 'json';
		// 	let postData = this.request.body.fields;
		// 	this.response.body = 'api response';
		// }
	}
}
