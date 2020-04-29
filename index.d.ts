import {Options as PMapOptions} from 'p-map';

declare namespace pProps {
	type Options = PMapOptions;

	type PromiseResult<Value> = Value extends PromiseLike<infer Result> ? Result : Value;

	type Mapper<ValueType, KeyType, MappedValueType> = (
		value: ValueType,
		key: KeyType
	) => MappedValueType | PromiseLike<MappedValueType>;
}

/**
Like [`Promise.all()`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) but for `Map` and `Object`.

@param map - Resolves entry values that are promises. Other values are passed through.
@param mapper - Receives the current value and key as parameters. Expected to return a `Promise` or value.
@param options - See the [`p-map` options](https://github.com/sindresorhus/p-map#options).
@returns A promise that is fulfilled when all promises in `map` and ones returned from `mapper` are fulfilled, or rejects if any of the promises reject. The fulfilled value is the same as `map`, but with a fulfilled version of each entry value, or the fulfilled value returned from `mapper`, if defined.

@example
```
import pProps = require('p-props');
import got = require('got');

(async () => {
	const fetch = async url => {
		const {body} = await got(url);
		return body;
	};

	const sites = {
		ava: fetch('ava.li'),
		todomvc: fetch('todomvc.com'),
		github: fetch('github.com'),
		foo: 'bar'
	};

	console.log(await pProps(sites));
	// {
	// 	ava: '<!doctype …',
	// 	todomvc: '<!doctype …',
	// 	github: '<!doctype …',
	// 	foo: 'bar'
	// }
})();
```
*/
declare function pProps<
	KeyType,
	ValueType,
	MappedValueType = pProps.PromiseResult<ValueType>
>(
	// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
	map: ReadonlyMap<KeyType, ValueType>,
	mapper?: pProps.Mapper<pProps.PromiseResult<ValueType>, KeyType, MappedValueType>,
	options?: pProps.Options
): Promise<Map<KeyType, MappedValueType>>;
declare function pProps<
	InputType extends {[key: string]: any},
	ValueType extends InputType[keyof InputType],
	MappedValueType = pProps.PromiseResult<ValueType>
>(
	map: InputType,
	mapper?: pProps.Mapper<pProps.PromiseResult<ValueType>, keyof InputType, MappedValueType>,
	options?: pProps.Options
): Promise<{[key in keyof InputType]: MappedValueType}>;

export = pProps;
