import {Buffer} from 'node:buffer';
import {execa} from 'execa';
import isGif from 'is-gif';
import gifsicle from 'gifsicle';

const imageminGifsicle = (options = {}) => async buffer => {
	if (!Buffer.isBuffer(buffer)) {
		throw new TypeError(`Expected \`buffer\` to be of type \`Buffer\` but received type \`${typeof buffer}\``);
	}

	if (!isGif(buffer)) {
		return buffer;
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
		input: buffer,
		maxBuffer: Number.POSITIVE_INFINITY,
	});

	return stdout;
};

export default imageminGifsicle;
