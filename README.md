# imagemin-gifsicle [![Build Status](http://img.shields.io/travis/imagemin/imagemin-gifsicle.svg?style=flat)](https://travis-ci.org/imagemin/imagemin-gifsicle) [![Build status](https://ci.appveyor.com/api/projects/status/51vfu1ntxwx7t949)](https://ci.appveyor.com/project/ShinnosukeWatanabe/imagemin-gifsicle)


> gifsicle image-min plugin


## Install

```sh
$ npm install --save imagemin-gifsicle
```


## Usage

```js
var Imagemin = require('image-min');
var gifsicle = require('imagemin-gifsicle');

var imagemin = new Imagemin()
	.src('foo.gif')
	.dest('foo-optimized.gif')
	.use(gifsicle({ interlaced: true }));

imagemin.optimize();
```


## Options

### interlaced

Type: `Boolean`  
Default: `false`

Interlace gif for progressive rendering.


## License

MIT © [imagemin](https://github.com/imagemin)
