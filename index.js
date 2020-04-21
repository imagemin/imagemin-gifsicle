'use strict';
const execa = require('execa');
const gifsicle = require('gifsicle');
const isGif = require('is-gif');

module.exports = (options = {}) => async input => {
	if (!Buffer.isBuffer(input)) {
		throw new TypeError(`Expected \`input\` to be of type \`Buffer\` but received type \`${typeof input}\``);
	}

	if (!isGif(input)) {
		return input;
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

	if (options.lossy) {
		args.push(`--lossy=${options.lossy}`)
	}

	if (options.colorMethod) {
		args.push(`--color-method=${options.colorMethod}`)
	}

	if (options.ditherMethod) {
		args.push(`--dither=${options.ditherMethod}`)
	}

	if (options.resize) {
		args.push(`--resize=${options.resize}`)
	}

	if (options.resizeMethod) {
		args.push(`--resize-method=${options.resizeMethod}`)
	}

	if (options.resizeColors) {
		args.push(`--resize-colors=${options.resizeColors}`)
	}

	const {stdout} = await execa(gifsicle, args, {
		encoding: null,
		input
	});

	return stdout;
};
