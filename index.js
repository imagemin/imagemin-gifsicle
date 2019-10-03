'use strict';
const execBuffer = require('exec-buffer');
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

	args.push('--output', execBuffer.output, execBuffer.input);

	return execBuffer({
		args,
		bin: gifsicle,
		input
	}).catch(error => {
		error.message = error.stderr || error.message;
		throw error;
	});
};
