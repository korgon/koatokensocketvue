<template>
	<div>
		<img src="/images/gears_color.png">
		<h3>{{ msg }}</h3>
	</div>
</template>

<script>
	// socket instance
	var socket = io();

	module.exports = {
		name: 'gears',
		data: function() {
			return {
				msg: 'Get moving.'
			}
		},
		created: function() {
			socket.on('moved', function(data) {
				this.msg = data.msg;
			}.bind(this));
		}
	}
</script>

<style lang="scss">
</style>
