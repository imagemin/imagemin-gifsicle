'use strict';

var path = require('path');
var isGif = require('is-gif');
var read = require('vinyl-file').read;
var test = require('ava');
var imageminGifsicle = require('../');

test('optimize a GIF', function (t) {
	t.plan(3);

	read(path.join(__dirname, 'fixtures/test.gif'), function (err, file) {
		t.assert(!err, err);

		var stream = imageminGifsicle()();
		var size = file.contents.length;

		stream.on('data', function (data) {
			t.assert(data.contents.length < size, data.contents.length);
			t.assert(isGif(data.contents));
		});

		stream.end(file);
	});
});
