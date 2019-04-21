import {Options} from 'p-map';

export type PromiseResult<Value> = Value extends PromiseLike<infer Result> ? Result : Value;

export type Mapper<ValueType, KeyType, MappedValueType> = (
	element: ValueType,
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
	MappedValueType = PromiseResult<ValueType>
>(
	input: Map<KeyType, ValueType>,
	mapper?: Mapper<ValueType, KeyType, MappedValueType>,
	options?: Options
): Promise<Map<KeyType, MappedValueType>>;
export default function pProps<
	InputType extends {[key: string]: unknown},
	ValueType extends InputType[keyof InputType],
	MappedValueType = PromiseResult<ValueType>
>(
	input: InputType,
	mapper?: Mapper<ValueType, keyof InputType, MappedValueType>,
	options?: Options
): Promise<{[key in keyof InputType]: MappedValueType}>;

export {Options} from 'p-map';
