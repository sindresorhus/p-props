import {Options} from 'p-map';

export type Mapper<ValueType, KeyType, MappedValueType> = (
	element: PromiseLike<ValueType> | ValueType,
	key: KeyType
) => MappedValueType | PromiseLike<MappedValueType>;

/**
 * Like [`Promise.all()`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) but for `Map` and `Object`.
 *
 * @param input - Resolves entry values that are promises. Other values are passed through.
 * @param mapper - Receives the current value and key as parameters. Expected to return a `Promise` or value.
 * @param options - See the [`p-map` options](https://github.com/sindresorhus/p-map#options).
 * @returns A promise that is fulfilled when all promises in `input` and ones returned from `mapper` are fulfilled, or rejects if any of the promises reject. The fulfilled value is the same as `input`, but with a fulfilled version of each entry value, or the fulfilled value returned from `mapper`, if defined.
 */
export default function pProps<
	KeyType extends unknown,
	ValueType extends unknown,
	MappedValueType = ValueType
>(
	input: Map<KeyType, PromiseLike<ValueType> | ValueType>,
	mapper?: Mapper<ValueType, KeyType, MappedValueType>,
	options?: Options
): Promise<Map<KeyType, MappedValueType>>;
export default function pProps<
	KeyType extends string,
	ValueType extends unknown,
	MappedValueType = ValueType
>(
	input: {[key in KeyType]: PromiseLike<ValueType> | ValueType},
	mapper?: Mapper<ValueType, KeyType, MappedValueType>,
	options?: Options
): Promise<{[key in KeyType]: MappedValueType}>;

export {Options} from 'p-map';
