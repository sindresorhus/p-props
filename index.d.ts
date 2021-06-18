import {Options} from 'p-map';

export type PromiseResult<Value> = Value extends PromiseLike<infer Result> ? Result : Value;

export type Mapper<ValueType, KeyType, MappedValueType> = (
	value: ValueType,
	key: KeyType
) => MappedValueType | PromiseLike<MappedValueType>;

/**
Like [`Promise.all()`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) but for `Map` and `Object`.

@param map - Resolves entry values that are promises. Other values are passed through.
@param mapper - Receives the current value and key as parameters. Expected to return a `Promise` or value.
@param options - See the [`p-map` options](https://github.com/sindresorhus/p-map#options).
@returns A promise that is fulfilled when all promises in `map` and ones returned from `mapper` are fulfilled, or rejects if any of the promises reject. The fulfilled value is the same as `map`, but with a fulfilled version of each entry value, or the fulfilled value returned from `mapper`, if defined.

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
export default function pProps<
	KeyType,
	ValueType,
	MappedValueType = PromiseResult<ValueType>
>(
	map: ReadonlyMap<KeyType, ValueType>,
	mapper?: Mapper<PromiseResult<ValueType>, KeyType, MappedValueType>,
	options?: Options
): Promise<Map<KeyType, MappedValueType>>;
export default function pProps<
	InputType extends Record<string, any>,
	ValueType extends InputType[keyof InputType],
	MappedValueType = PromiseResult<ValueType>
>(
	map: InputType,
	mapper?: Mapper<PromiseResult<ValueType>, keyof InputType, MappedValueType>,
	options?: Options
): Promise<{[key in keyof InputType]: MappedValueType}>;

export {Options} from 'p-map';
