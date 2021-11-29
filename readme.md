# imagemin-gifsicle ![GitHub Actions Status](https://github.com/imagemin/imagemin-gifsicle/workflows/test/badge.svg?branch=main)

> Imagemin plugin for [Gifsicle](https://www.lcdf.org/gifsicle/)

## Install

```
$ npm install imagemin-gifsicle
```

## Usage

```js
import imagemin from 'imagemin';
import imageminGifsicle from 'imagemin-gifsicle';

(async () => {
	await imagemin(['images/*.gif'], {
		destination: 'build/images',
		plugins: [
			imageminGifsicle()
		]
	});

	console.log('Images optimized');
})();
```

## API

### imageminGifsicle(options?)(buffer)

Returns a `Promise<Buffer>` with the optimized image.

#### options

Type: `object`

##### interlaced

Type: `boolean`\
Default: `false`

Interlace gif for progressive rendering.

##### optimizationLevel

Type: `number`\
Default: `1`

Select an optimization level between `1` and `3`.

> The optimization level determines how much optimization is done; higher levels take longer, but may have better results.

1. Stores only the changed portion of each image.
2. Also uses transparency to shrink the file further.
3. Try several optimization methods (usually slower, sometimes better results)

##### colors

Type: `number`

Reduce the number of distinct colors in each output GIF to num or less. Num must be between 2 and 256.

#### buffer

Type: `Buffer`

Buffer to optimize.
