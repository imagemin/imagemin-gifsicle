import {Buffer} from 'node:buffer';
import {promises as fs} from 'node:fs';
import isGif from 'is-gif';
import test from 'ava';
import imageminGifsicle from './index.js';

test('Buffer', async t => {
	const buffer = await fs.readFile(new URL('fixture.gif', import.meta.url));
	const data = await imageminGifsicle()(buffer);

	t.true(data.length < buffer.length);
	t.true(isGif(data));
});

test('Buffer - non-binary', async t => {
	const buffer = Buffer.from('string');
	const data = await imageminGifsicle()(buffer);

	t.is(data.toString(), 'string');
});
