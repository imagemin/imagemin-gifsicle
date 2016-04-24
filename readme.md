# imagemin-gifsicle [![Build Status](http://img.shields.io/travis/imagemin/imagemin-gifsicle.svg?style=flat)](https://travis-ci.org/imagemin/imagemin-gifsicle) [![Build status](https://ci.appveyor.com/api/projects/status/51vfu1ntxwx7t949?svg=true)](https://ci.appveyor.com/project/ShinnosukeWatanabe/imagemin-gifsicle)

> gifsicle imagemin plugin


## Install

```
$ npm install --save imagemin-gifsicle
```


## Usage

```js
const imagemin = require('imagemin');
const imageminGifsicle = require('imagemin-gifsicle');

imagemin('images/*.gif', 'build/images', {use: [imageminGifsicle()]}).then(() => {
	console.log('Images optimized');
});
```


## API

### imageminGifsicle(options)(buffer)

Returns a promise for a buffer.

#### options

##### interlaced

Type: `boolean`
Default: `false`

Interlace gif for progressive rendering.

#### buffer

Type: `buffer`

Buffer to optimize.


## License

MIT © [imagemin](https://github.com/imagemin)
