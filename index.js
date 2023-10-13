import pMap from 'p-map';

export default async function pProps(input, mapper = (value => value), options = undefined) {
	const isMap = input instanceof Map;
	const entries = isMap ? [...input] : Object.entries(input);
	const values = await pMap(entries, async ([key, value]) => mapper(await value, key), options);
	const mappedEntries = entries.map(([key], index) => [key, values[index]]);
	return isMap ? new Map(mappedEntries) : Object.fromEntries(mappedEntries);
}
