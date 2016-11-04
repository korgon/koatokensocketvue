// starting point for singleton project

// strictness!
'use strict';

// include packages
const logit = require('_/logit');

module.exports = new core();

function core() {
	let self = this;

	let options;					// object for holding config

	self.getOptions = function() {
		return Object.assign({}, options);
	}

	self.init = function(config) {
		return new Promise(function(resolve, reject) {
			options = config;

			// output version
			let title = '           ' + options.title + '           ';
			let ver = 'version [' + options.version +']';
			logit.log(title, ver, 'red');
			resolve();
		});
	}

	self.debug = function(debug) {
		if (options.debug) {
			if (typeof debug == 'string') {
				logit.log({ alert: 'debug', color: 'grey', message: debug });
			} else if (typeof debug == 'function') {
				debug();
			}
		}
	}
}
