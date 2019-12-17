'use strict';
const execa = require('execa');
const gifsicle = require('gifsicle');
const isGif = require('is-gif');

module.exports = (options = {}) => input => {
	if (!Buffer.isBuffer(input)) {
		return Promise.reject(new TypeError(`Expected \`input\` to be of type \`Buffer\` but received type \`${typeof input}\``));
	}

	if (!isGif(input)) {
		return Promise.resolve(input);
	}

	const args = ['--no-warnings', '--no-app-extensions'];

	if (options.interlaced) {
		args.push('--interlace');
	}

	if (options.optimizationLevel) {
		args.push(`--optimize=${options.optimizationLevel}`);
	}

	if (options.colors) {
		args.push(`--colors=${options.colors}`);
	}

	if (options.resize) {
		const width = options.resize.width && Number.isInteger(options.resize.width) ? options.resize.width : '_';
		const height = options.resize.height && Number.isInteger(options.resize.height) ? options.resize.height : '_';

		if (!(width === '_' && height === '_')) {
			args.push(`--resize=${width}x${height}`);
		}

		if (options.resize.method) {
			if (['sample', 'mix'].indexOf(options.resize.method) > -1) {
				args.push(`--resize-method=${options.resize.method}`);
			} else {
				return Promise.reject(new Error('Resize method only takes \'sample\' or \'mix\' as value.'));
			}
		}
	}

	return execa(gifsicle, args, {
		encoding: null,
		input
	})
		.then(({stdout}) => stdout);
};
