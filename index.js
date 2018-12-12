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

	const args = ['--no-warnings', '--no-app-extensions'];

	if (opts.interlaced) {
		args.push('--interlace');
	}

	if (opts.optimizationLevel) {
		args.push(`--optimize=${opts.optimizationLevel}`);
	}

	if (opts.colors) {
		args.push(`--colors=${opts.colors}`);
	}
	
	if (opts.resize) {
        args.push(`--resize=${opts.resize}`)
    }

    if (opts.resizeWidth) {
        args.push(`--resize-width=${opts.resizeWidth}`)
    }

    if (opts.resizeHeight) {
        args.push(`--resize-height=${opts.resizeHeight}`)
    }

	args.push('--output', execBuffer.output, execBuffer.input);

	return execBuffer({
		input: buf,
		bin: gifsicle,
		args
	}).catch(error => {
		error.message = error.stderr || error.message;
		throw error;
	});
};
