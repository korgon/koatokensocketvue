<template>
	<div class="login-wrapper">
		<p v-if="message">{{ message }}</p>
		<input name="username" v-model="username"></input>
		<input name="password" v-model="password"></input>
		<button @click="login">login</button>
	</div>
</template>

<script>
	var axios = require('axios');
	
	module.exports = {
		name: 'login',
		data: function() {
			return {
				username: undefined,
				password: undefined,
				message: 'please login'
			}
		},
		created: function() {
		},
		methods: {
			login: function() {
				var self = this;
				this.message = '...authenticating...';

				// TODO ajax login
				// set user
				// save jwt into localstorage
				var user = {
					name: 'kevin',
					lastlogin: 'moments ago...'
				}

				// simulate logging in
				setTimeout(function() {
					self.$emit('validated', user);
				}, 777);
			}
		}
	}
</script>

<style lang="scss">
</style>
