# p-props

> Like [`Promise.all()`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) but for `Map` and `Object`

Useful when you need to run multiple promises concurrently and keep track of the fulfilled values by name.

## Install

```sh
npm install p-props
```

## Usage

```js
import pProps from 'p-props';
import got from 'got';

const fetch = async url => {
	const {body} = await got(url);
	return body;
};

const sites = {
	ava: fetch('https://avajs.dev'),
	todomvc: fetch('https://todomvc.com'),
	github: fetch('https://github.com'),
	foo: 'bar'
};

console.log(await pProps(sites));
/*
{
	ava: '<!doctype …',
	todomvc: '<!doctype …',
	github: '<!doctype …',
	foo: 'bar'
}
*/
```

## API

### pProps(input, mapper?, options?)

Returns a `Promise` that is fulfilled when all promises in `input` and ones returned from `mapper` are fulfilled, or rejects if any of the promises reject. The fulfilled value is the same as `input`, but with a fulfilled version of each entry value, or the fulfilled value returned from `mapper`, if defined.

#### input

Type: `Map | object`

Resolves entry values that are promises. Other values are passed through.

#### mapper(value, key)

Type: `Function`

Receives the current value and key as parameters. If a value is a `Promise`, `mapper` will receive the value this `Promise` resolves to. Expected to return a `Promise` or value.

#### options

Type: `object`

See the [`p-map` options](https://github.com/sindresorhus/p-map#options).

### pPropsAllSettled(input, mapper?, options?)

Like [`Promise.allSettled()`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled) but for `Map` and `Object`.

```js
import {pPropsAllSettled} from 'p-props';
import got from 'got';

const fetch = async url => {
	const {body} = await got(url);
	return body;
};

const sites = {
	ava: fetch('https://avajs.dev'),
	todomvc: fetch('https://todomvc.com'),
	github: fetch('https://github.com'),
	foo: 'bar'
};

console.log(await pPropsAllSettled(sites));
/*
{
	ava: { status: 'fulfilled', value: '<!doctype …' },
	todomvc: { status: 'fulfilled', value: '<!doctype …' },
	github: { status: 'fulfilled', value: '<!doctype …' },
	foo: { status: 'fulfilled', value: 'bar' }
}
*/
```

Returns a `Promise` that is fulfilled when all promises in `input` and ones returned from `mapper` are settled. The fulfilled value is the same as `input`, but with a settled version of each entry value, or the settled value returned from `mapper`, if defined.

#### input

Type: `Map | object`

Resolves entry values that are promises. Other values are passed through.

#### mapper(value, key)

Type: `Function`

Receives the current value and key as parameters. If a value is a `Promise`, `mapper` will receive the value this `Promise` resolves to. Expected to return a `Promise` or value.

#### options

Type: `object`

See the [`p-map` options](https://github.com/sindresorhus/p-map#options).

## Related

- [p-all](https://github.com/sindresorhus/p-all) - Run promise-returning & async functions concurrently with optional limited concurrency
- [p-map](https://github.com/sindresorhus/p-map) - Map over promises concurrently
- [More…](https://github.com/sindresorhus/promise-fun)
