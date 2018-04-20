# p-props [![Build Status](https://travis-ci.org/sindresorhus/p-props.svg?branch=master)](https://travis-ci.org/sindresorhus/p-props)

> Like [`Promise.all()`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) but for `Map` and `Object`

Useful when you need to run multiple promises concurrently and keep track of the fulfilled values by name.


## Install

```
$ npm install p-props
```


## Usage

```js
const pProps = require('p-props');
const got = require('got');

const fetch = url => got(url).then(res => res.body);

const sites = {
	ava: fetch('ava.li'),
	todomvc: fetch('todomvc.com'),
	github: fetch('github.com'),
	foo: 'bar'
};

pProps(sites).then(result => {
	console.log(result);
	//=> {ava: '<!doctype ...', todomvc: '<!doctype ...', github: '<!doctype ...', foo: 'bar'}
});
```


## API

### pProps(input, [mapper], [options])

Returns a `Promise` that is fulfilled when all promises in `input` and ones returned from `mapper` are fulfilled, or rejects if any of the promises reject. The fulfilled value is the same as `input`, but with a fulfilled version of each entry value, or the fulfilled value returned from `mapper`, if defined.

#### input

Type: `Map` `Object`

Resolves entry values that are promises. Other values are passed through.

#### mapper(element, index)

Type: `Function`

Expected to return a `Promise` or value.

#### options

Type: `Object`

See the [`p-map` options](https://github.com/sindresorhus/p-map#options).

## Related

- [p-all](https://github.com/sindresorhus/p-all) - Run promise-returning & async functions concurrently with optional limited concurrency
- [p-map](https://github.com/sindresorhus/p-map) - Map over promises concurrently
- [More…](https://github.com/sindresorhus/promise-fun)


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
