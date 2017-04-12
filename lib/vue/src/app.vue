<template>
	<div id="main" v-cloak>
		<header id="above" class="box"><above :user="user" @invalidated="invalidated"></above></header>
		<div id="center" class="box">
			<main id="content" class="box">
				<component :is="currentView" @validated="validated"></component>
			</main>
		</div>
		<footer id="below" class="box"><below></below></footer>
	</div>
</template>

<script>
	// components
	var above = require('./views/above.vue');
	var below = require('./views/below.vue');
	var login = require('./views/login.vue');
	var control = require('./views/control.vue');
	var user = require('./views/user.vue');

	module.exports = {
		name: 'app',
		components: {
			above,
			below,
			login,
			control,
			user
		},
		data: function() {
			return {
				currentView: undefined,
				user: undefined
			}
		},
		created: function() {
			// TODO
			// check localstorage for jwt
			// attempt to connect
			this.currentView = 'login';
		},
		methods: {
			validated: function(user) {
				this.user = user;
				this.currentView = 'control';
			},
			invalidated: function() {
				this.user = undefined;
				this.currentView = 'login';
			},
		}
	}
</script>

<style lang="scss">
	@import 'scss/_frame.scss';

	body {
		margin: 0;
		color: #8a9f9f;
	}

	#main {
		display: flex;
		min-height: 100vh;
		flex-direction: column;

		#above {

		}

		#center {
			display: flex;
			flex-direction: column;
			flex: 1;
			#content {

			}
		}

		#below {

		}
	}

	@include respond(768) {
		#main {
			#center {
				flex: 1;
				flex-direction: row;

				#content {
					flex: 1;
				}
			}
		}
	}
</style>
