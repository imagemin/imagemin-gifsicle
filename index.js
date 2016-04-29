'use strict';
const execBuffer = require('exec-buffer');
const gifsicle = require('gifsicle');
const isGif = require('is-gif');

module.exports = opts => buf => {
	opts = Object.assign({}, opts);

	if (!Buffer.isBuffer(buf)) {
		return Promise.reject(new TypeError('Expected a buffer'));
	}

	if (!isGif(buf)) {
		return Promise.resolve(buf);
	}

	const args = [
		'--no-warnings',
		'--output', execBuffer.output,
		execBuffer.input
	];

	if (opts.interlaced) {
		args.push('--interlace');
	}

	if (opts.optimizationLevel) {
		args.push('--optimize', opts.optimizationLevel);
	}

	return execBuffer({
		input: buf,
		bin: gifsicle,
		args
	}).catch(err => {
		err.message = err.stderr || err.message;
		throw err;
	});
};
