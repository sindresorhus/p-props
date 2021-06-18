'use strict';
const pMap = require('p-map');

const pProps = async (input, mapper = (value => value), options = undefined) => {
	const isMap = input instanceof Map;
	const entries = isMap ? [...input.entries()] : Object.entries(input);
	const promisedEntries = entries.map(async ([key, value]) => [key, await value]);
	const values = await pMap(promisedEntries, ([key, value]) => mapper(value, key), options);
	const mappedEntries = entries.map(([key], index) => [key, values[index]]);
	return isMap ? new Map(mappedEntries) : Object.fromEntries(mappedEntries);
};

module.exports = pProps;
