<template>
	<div id="main">
		<header id="above" class="box">header</header>
		<div id="center" class="box">
			<main id="content" class="box">
				<h1>{{ msg }}</h1>
				<component :is="currentView"></component>
			</main>
			<nav id="sinister" class="box">left</nav>
			<aside id="dexter" class="box">right</aside>
		</div>
		<footer id="below" class="box">footer</footer>
	</div>
</template>

<script>
	// components
	var gears = require('./components/gears.vue');

	module.exports = {
		name: 'app',
		components: {
			gears
		},
		data: function() {
			return {
				msg: 'Getting Started with Vue. I like Vue. It makes this easier.',
				currentView: gears
			}
		}
	}
</script>

<style lang="scss">
	@import 'scss/_frame.scss';

	body {
		margin: 0;
	}

	#main {
		display: flex;
		min-height: 100vh;
		flex-direction: column;

		#above {
			background-color: #555;
		}

		#center {
			display: flex;
			flex-direction: column;
			flex: 1;
			#content {

			}

			#sinister {
				order: -1;
			}

			#dexter, #sinister {
				border-radius: .2em;
				background-color: #999;
			}
		}

		#below {
			background-color: #555;
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

				#dexter, #sinister {
					flex: 0 0 12em;
				}
			}
		}
	}
</style>
