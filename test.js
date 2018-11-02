import fs from 'fs';
import path from 'path';
import isGif from 'is-gif';
import pify from 'pify';
import test from 'ava';
import m from '.';

test('Buffer', async t => {
	const buf = await pify(fs.readFile)(path.join(__dirname, 'fixture.gif'));
	const data = await m()(buf);
	t.true(data.length < buf.length);
	t.true(isGif(data));
});

test('Buffer - non-binary', async t => {
	const buf = Buffer.from('string');
	const data = await m()(buf);
	t.is(data.toString(), 'string');
});
