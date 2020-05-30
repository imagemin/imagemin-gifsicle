const {promisify} = require('util');
const fs = require('fs');
const path = require('path');
const isGif = require('is-gif');
const test = require('ava');
const imageminGifsicle = require('.');

const readFile = promisify(fs.readFile);

test('Buffer', async t => {
	const buf = await readFile(path.join(__dirname, 'fixture.gif'));
	const data = await imageminGifsicle()(buf);

	t.true(data.length < buf.length);
	t.true(isGif(data));
});

test('Buffer - non-binary', async t => {
	const buf = Buffer.from('string');
	const data = await imageminGifsicle()(buf);

	t.is(data.toString(), 'string');
});
