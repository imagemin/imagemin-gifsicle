'use strict';
var fs = require('fs');
var path = require('path');
var isGif = require('is-gif');
var pify = require('pify');
var test = require('ava');
var imageminGifsicle = require('../');

test('optimize a GIF', function (t) {
	t.plan(2);

	pify(fs.readFile)(path.join(__dirname, 'fixtures/test.gif')).then(function (buf) {
		imageminGifsicle()(buf).then(function (data) {
			t.assert(data.length < buf.length, data.length);
			t.assert(isGif(data));
		});
	});
});
