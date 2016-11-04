var Vue = require('vue');
var App = require('./app.vue');

var vm = new Vue({
	el: '#app',
	render: function(create) {
		return create(App);
	}
});
