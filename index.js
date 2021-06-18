'use strict';
const pMap = require('p-map');

const pProps = (input, mapper, options) => {
	const isMap = input instanceof Map;
	const entries = isMap ? [...map.entries()] : Object.entries(map);
	const awaitedEntries = entries.map(async ([key, value]) => [key, await value]);
	if (!mapper && !options) {
		return isMap ? new Map(awaitedEntries) : Object.fromEntries(awaitedEntries);
	}

	const values = await pMap(awaitedEntries, ([key, value]) => mapper(value, key), options);
	const mappedEntries = awaitedEntries.map(([key], index) => [key, value[index]]);
	return isMap ? new Map(mappedEntries) : Object.fromEntries(mappedEntries);
};

module.exports = pProps;
