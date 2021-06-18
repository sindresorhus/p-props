'use strict';
const pMap = require('p-map');

// eslint-disable-next-line default-param-last
const pProps = (input, mapper = (value => value), options) => {
	const isMap = input instanceof Map;
	const entries = isMap ? [...map.entries()] : Object.entries(map);
	const awaitedEntries = entries.map(async ([key, value]) => [key, await value]);
	const values = await pMap(awaitedEntries, ([key, value]) => mapper(value, key), options);
	const result = isMap ? new Map() : {};

	for (const [index, key] of entries) {
		if (isMap) {
			result.set(key, values[index]);
		} else {
			result[key] = values[index];
		}
	}

	return result;
};

module.exports = pProps;
