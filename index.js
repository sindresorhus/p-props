'use strict';
const pMap = require('p-map');

// eslint-disable-next-line default-param-last
const pProps = (input, mapper = (value => value), options) => {
	const isMap = input instanceof Map;
	const entries = isMap ? [...map.entries()] : Object.entries(map);
	const awaitedEntries = entries.map(async ([key, value]) => [key, await value]);
	const values = await pMap(awaitedEntries, ([key, value]) => mapper(value, key), options);
	const mappedEntries = values.map((value, index) => [entries[index], value]);
	return isMap ? new Map(mappedEntries) : Object.fromEntries(mappedEntries);
};

module.exports = pProps;
