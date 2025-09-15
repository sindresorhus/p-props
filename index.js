import pMap from 'p-map';

const toEntries = input => input instanceof Map ? [...input] : Object.entries(input);
const fromEntries = (input, entries) => input instanceof Map ? new Map(entries) : Object.fromEntries(entries);

export default async function pProps(input, mapper = (value => value), options) {
	const entries = toEntries(input);

	const values = await pMap(entries, async ([key, value]) => {
		const result = await value;
		return mapper(result, key);
	}, options);

	const mappedEntries = entries.map(([key], index) => [key, values[index]]);
	return fromEntries(input, mappedEntries);
}

export async function pPropsAllSettled(input, mapper, options) {
	const entries = toEntries(input);

	const settledEntries = await pMap(
		entries,
		async ([key, rawValue]) => {
			try {
				const resolvedValue = await rawValue;
				const mappedValue = mapper ? await mapper(resolvedValue, key) : resolvedValue;
				return [key, {status: 'fulfilled', value: mappedValue}];
			} catch (error) {
				return [key, {status: 'rejected', reason: error}];
			}
		},
		options,
	);

	return fromEntries(input, settledEntries);
}
