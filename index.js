'use strict';

var gifsicle = require('gifsicle').path;
var isGif = require('is-gif');
var spawn = require('child_process').spawn;

/**
 * gifsicle imagemin plugin
 *
 * @param {Object} opts
 * @api public
 */

module.exports = function (opts) {
	opts = opts || {};

	return function (file, imagemin, cb) {
		if (!isGif(file.contents)) {
			cb();
			return;
		}

		var args = ['-w'];
		var ret = [];
		var len = 0;

		if (opts.interlaced) {
			args.push('--interlace');
		}

		var cp = spawn(gifsicle, args);

		cp.on('error', function (err) {
			cb(err);
			return;
		});

		cp.stderr.setEncoding('utf8');
		cp.stderr.on('data', function (data) {
			cb(data);
			return;
		});

		cp.stdout.on('data', function (data) {
			ret.push(data);
			len += data.length;
		});

		cp.on('close', function () {
			file.contents = Buffer.concat(ret, len);
			cb();
		});

		cp.stdin.end(file.contents);
	};
};
