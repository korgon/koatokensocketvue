<template>
	<div class="header">
		<img class="icon" src="/images/icon.png">
		<span class="title">control</span>
		<div class="controls">
			<span v-if="user" @click="logout">logout</span>
		</div>
	</div>
</template>

<script>
	module.exports = {
		name: 'above',
		props: ['user'],
		methods: {
			logout: function() {
				// TODO destroy jwt
				this.$emit('invalidated');
			}
		}
	}
</script>

<style lang="scss">
	.header {
		display: flex;
		justify-content: left;
		align-content: center;
		align-items: center;
		color: #8a9f9f;

		.icon {
			height: 4em;
		}

		.title {
			font-size: 2em;
		}

		.controls {
			flex: 1;
			text-align: right;
			span {
				cursor: pointer;
			}
		}
	}
</style>
