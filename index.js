'use strict';
const pMap = require('p-map');

const map = async (map, mapper, options) => {
	const awaitedEntries = [...map.entries()].map(async ([key, value]) => [key, await value]);
	const values = await pMap(awaitedEntries, ([key, value]) => mapper(value, key), options);
	const result = new Map();

	for (const [index, key] of [...map.keys()].entries()) {
		result.set(key, values[index]);
	}

	return result;
};

const object = async (map, mapper, options) => {
	const awaitedEntries = Object.entries(map).map(async ([key, value]) => [key, await value]);
	const values = await pMap(awaitedEntries, ([key, value]) => mapper(value, key), options);
	const result = {};

	for (const [index, key] of Object.keys(map).entries()) {
		result[key] = values[index];
	}

	return result;
};

// eslint-disable-next-line default-param-last
const pProps = (input, mapper = (value => value), options) => {
	return input instanceof Map ?
		map(input, mapper, options) :
		object(input, mapper, options);
};

module.exports = pProps;
