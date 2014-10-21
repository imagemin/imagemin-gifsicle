'use strict';

var File = require('vinyl');
var fs = require('fs');
var gifsicle = require('../');
var isGif = require('is-gif');
var path = require('path');
var test = require('ava');

test('optimize a GIF', function (t) {
	t.plan(3);

	fs.readFile(path.join(__dirname, 'fixtures/test.gif'), function (err, buf) {
		t.assert(!err);

		var stream = gifsicle();
		var file = new File({
			contents: buf
		});

		stream.on('data', function (data) {
			t.assert(data.contents.length < buf.length);
			t.assert(isGif(data.contents));
		});

		stream.end(file);
	});
});

test('optimize a GIF using ctor', function (t) {
	t.plan(3);

	var Gifsicle = gifsicle.ctor();

	fs.readFile(path.join(__dirname, 'fixtures/test.gif'), function (err, buf) {
		t.assert(!err);

		var stream = new Gifsicle();
		var file = new File({
			contents: buf
		});

		stream.on('data', function (data) {
			t.assert(data.contents.length < buf.length);
			t.assert(isGif(data.contents));
		});

		stream.end(file);
	});
});
