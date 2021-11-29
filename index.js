import {Buffer} from 'node:buffer';
import {execa} from 'execa';
import gifsicle from 'gifsicle';
import isGif from 'is-gif';

const main = (options = {}) => async input => {
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

	const {stdout} = await execa(gifsicle, args, {
		encoding: null,
		maxBuffer: Number.POSITIVE_INFINITY,
		input,
	});

	return stdout;
};

export default main;
