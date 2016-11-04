/**
* @module logit
*/

let colors = require('colors');

function logit() {
	let color_options = ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white', 'gray', 'grey'];
	let color_states = { pass: 'green', fail: 'red', warn: 'yellow' }

	return {
		log: function log(entry) {
			let args = Array.prototype.slice.call(arguments);

			if (entry === undefined) return;

			if (typeof entry === 'string') {
				if (args.length) {
					let alert = args[0] || '';
					let message = args[1] || '';
					let color = args[2] || 'white';

					entry = {
						color,
						alert,
						message
					}
				}
			}

			if (typeof entry === 'object' && entry.alert.length) {
				if (color_options.indexOf(entry.color) == -1) {
					if (color_states[entry.color]) {
						entry.color = color_states[entry.color];
					} else {
						entry.color = 'white';
					}
				}
				if (!entry.message) {
					entry.message = '';
				}
			} else {
				return;
			}

			entry.alert = ' ' + entry.alert + ' ';

			colors.setTheme({
				custom: [entry.color]
			});

			if (entry.debug) {
				console.log(entry.alert.custom);
			} else {
				let boxtopper = '┌' + '─'.repeat(entry.alert.length) + '┐';
				let boxbottom = '└' + '─'.repeat(entry.alert.length) + '┘';

				console.log(boxtopper.custom);
				console.log('│'.custom + entry.alert.bold.custom + '│'.custom + ' ' + entry.message.custom);
				console.log(boxbottom.custom);
			}
		}
	}
}

/**
* Export Logit Object
* @type {object}
*/
module.exports = new logit();
