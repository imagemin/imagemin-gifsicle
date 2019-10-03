import fs from 'fs';
import path from 'path';
import isGif from 'is-gif';
import pify from 'pify';
import test from 'ava';
import getStream from 'get-stream';
import imageminGifsicle from '.';

const fsP = pify(fs);

test('Buffer', async t => {
	const buf = await fsP.readFile(path.join(__dirname, 'fixture.gif'));
	const data = await imageminGifsicle()(buf);

	t.true(data.length < buf.length);
	t.true(isGif(data));
});

test('Buffer - non-binary', async t => {
	const buf = Buffer.from('string');
	const data = await imageminGifsicle()(buf);

	t.is(data.toString(), 'string');
});

test('stream', async t => {
	const stream = fsP.createReadStream(path.join(__dirname, 'fixture.gif'));
	const buf = await fsP.readFile(path.join(__dirname, 'fixture.gif'));
	const data = await getStream.buffer(imageminGifsicle.stream()(stream));

	t.true(data.length < buf.length);
	t.true(isGif(data));
});
