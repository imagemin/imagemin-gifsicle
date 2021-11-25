import {Buffer} from 'node:buffer';
import {promises as fs} from 'node:fs';
import {fileURLToPath} from 'node:url';
import isGif from 'is-gif';
import test from 'ava';
import imageminGifsicle from './index.js';

test('Buffer', async t => {
	const buf = await fs.readFile(fileURLToPath(new URL('fixture.gif', import.meta.url)));
	const data = await imageminGifsicle()(buf);

	t.true(data.length < buf.length);
	t.true(isGif(data));
});

test('Buffer - non-binary', async t => {
	const buf = Buffer.from('string');
	const data = await imageminGifsicle()(buf);

	t.is(data.toString(), 'string');
});
