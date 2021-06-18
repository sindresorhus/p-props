'use strict';
const pMap = require('p-map');

const pProps = async (input, mapper = (value => value), options = undefined) => {
	const isMap = input instanceof Map;
	const entries = isMap ? [...input.entries()] : Object.entries(input);
	const values = await pMap(entries, async ([key, value]) => mapper(await value, key), options);
	const mappedEntries = entries.map(([key], index) => [key, values[index]]);
	return isMap ? new Map(mappedEntries) : Object.fromEntries(mappedEntries);
};

module.exports = pProps;
