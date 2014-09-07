'use strict';

var fs = require('fs');
var gifsicle = require('../');
var Imagemin = require('imagemin');
var isGif = require('is-gif');
var path = require('path');
var test = require('ava');

test('optimize a GIF', function (t) {
	t.plan(4);

	var imagemin = new Imagemin()
		.src(path.join(__dirname, 'fixtures/test.gif'))
		.use(gifsicle());

	imagemin.optimize(function (err, file) {
		t.assert(!err);

		fs.stat(imagemin.src(), function (err, stats) {
			t.assert(!err);
			t.assert(file.contents.length < stats.size);
			t.assert(isGif(file.contents));
		});
	});
});
