'use strict';
const {PassThrough} = require('stream');
const execa = require('execa');
const gifsicle = require('gifsicle');
const isGif = require('is-gif');
const isStream = require('is-stream');

const createGifsicleStream = (input, options = {}) => {
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

	const gifsicleStream = execa(gifsicle, args, {
		buffer: options.buffer,
		encoding: null,
		input
	});

	return gifsicleStream;
};

module.exports = (options = {}) => input => {
	if (!Buffer.isBuffer(input)) {
		return Promise.reject(new TypeError(`Expected \`input\` to be of type \`Buffer\` but received type \`${typeof input}\``));
	}

	if (!isGif(input)) {
		return Promise.resolve(input);
	}

	return createGifsicleStream(input, Object.assign(options, {buffer: true})).then(({stdout}) => stdout);
};

module.exports.stream = (options = {}) => input => {
	if (!isStream.readable(input)) {
		throw new TypeError(`Expected \`input\` to be of type \`stream.Readable\` but received type \`${typeof input}\``);
	}

	const gifsicleStream = createGifsicleStream(input, Object.assign(options, {buffer: false}));
	const outStream = new PassThrough();

	gifsicleStream.on('error', error => {
		outStream.emit('error', error);
	});

	gifsicleStream.stderr.setEncoding('utf8');
	gifsicleStream.stderr.on('data', data => {
		outStream.emit('error', data);
	});

	gifsicleStream.stdout.pipe(outStream);

	return outStream;
};
