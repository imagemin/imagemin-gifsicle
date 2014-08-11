/*global describe, it */
'use strict';

var assert = require('assert');
var fs = require('fs');
var gifsicle = require('../');
var Imagemin = require('imagemin');
var path = require('path');

describe('gifsicle()', function () {
    it('should optimize a GIF', function (cb) {
        var imagemin = new Imagemin();

        imagemin
            .src(path.join(__dirname, 'fixtures/test.gif'))
            .use(gifsicle())
            .optimize(function (err, file) {
                assert(file.contents.length < fs.statSync(imagemin.src()).size);
                assert(file.contents.length > 0);
                cb();
            });
    });
});
