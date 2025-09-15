import {type Options} from 'p-map';

export type Mapper<ValueType, KeyType, MappedValueType> = (
	value: ValueType,
	key: KeyType
) => MappedValueType | PromiseLike<MappedValueType>;

/**
Like [`Promise.all()`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) but for `Map` and `Object`.

@param input - Resolves entry values that are promises. Other values are passed through.
@param mapper - Receives the current value and key as parameters. Expected to return a `Promise` or value.
@param options - See the [`p-map` options](https://github.com/sindresorhus/p-map#options).
@returns A promise that is fulfilled when all promises in `input` and ones returned from `mapper` are fulfilled, or rejects if any of the promises reject. The fulfilled value is the same as `input`, but with a fulfilled version of each entry value, or the fulfilled value returned from `mapper`, if defined.

@example
```
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
// {
// 	ava: '<!doctype …',
// 	todomvc: '<!doctype …',
// 	github: '<!doctype …',
// 	foo: 'bar'
// }
```
*/
export default function pProps< // This overload exists to get more accurate results when the mapper is not defined.
	InputType extends Record<PropertyKey, unknown>,
>(
	input: InputType,
	mapper?: undefined,
	options?: Options
): Promise<{[key in keyof InputType]: Awaited<InputType[key]>}>;
export default function pProps<
	InputType extends Record<string, unknown>,
	ValueType extends InputType[keyof InputType],
	MappedValueType = Awaited<ValueType>,
>(
	input: InputType,
	mapper?: Mapper<Awaited<ValueType>, keyof InputType, MappedValueType>,
	options?: Options
): Promise<{[key in keyof InputType]: MappedValueType}>;
export default function pProps<
	KeyType,
	ValueType,
	MappedValueType = Awaited<ValueType>,
>(
	input: ReadonlyMap<KeyType, ValueType>,
	mapper?: Mapper<Awaited<ValueType>, KeyType, MappedValueType>,
	options?: Options
): Promise<Map<KeyType, MappedValueType>>;

/**
Like [`Promise.allSettled()`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled) but for `Map` and `Object`.

@param input - Resolves entry values that are promises. Other values are passed through.
@param mapper - Receives the current value and key as parameters. Expected to return a `Promise` or value.
@param options - See the [`p-map` options](https://github.com/sindresorhus/p-map#options).
@returns A promise that is fulfilled when all promises in `input` and ones returned from `mapper` are settled. The fulfilled value is the same as `input`, but with a settled version of each entry value, or the settled value returned from `mapper`, if defined.

@example
```
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
// {
// 	ava: { status: 'fulfilled', value: '<!doctype …' },
// 	todomvc: { status: 'fulfilled', value: '<!doctype …' },
// 	github: { status: 'fulfilled', value: '<!doctype …' },
// 	foo: { status: 'fulfilled', value: 'bar' }
// }
```
*/
export function pPropsAllSettled< // This overload exists to get more accurate results when the mapper is not defined.
	InputType extends Record<PropertyKey, unknown>,
>(
	input: InputType,
	mapper?: undefined,
	options?: Options
): Promise<{[key in keyof InputType]: PromiseSettledResult<Awaited<InputType[key]>>}>;
export function pPropsAllSettled<
	InputType extends Record<string, unknown>,
	ValueType extends InputType[keyof InputType],
	MappedValueType = Awaited<ValueType>,
>(
	input: InputType,
	mapper?: Mapper<Awaited<ValueType>, keyof InputType, MappedValueType>,
	options?: Options
): Promise<{[key in keyof InputType]: PromiseSettledResult<MappedValueType>}>;
export function pPropsAllSettled<
	KeyType,
	ValueType,
	MappedValueType = Awaited<ValueType>,
>(
	input: ReadonlyMap<KeyType, ValueType>,
	mapper?: Mapper<Awaited<ValueType>, KeyType, MappedValueType>,
	options?: Options
): Promise<Map<KeyType, PromiseSettledResult<MappedValueType>>>;

export {Options} from 'p-map';
