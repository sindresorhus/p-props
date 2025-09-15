import {expectType, expectAssignable} from 'tsd';
import pProps, {pPropsAllSettled, type Options} from './index.js';

const options: Options = {};

expectType<Promise<{[key in 'foo']: string}>>(pProps({foo: 'bar'}));
expectType<Promise<{[key in 'foo']: boolean}>>(
	pProps({foo: 'bar'}, async (value, key) => {
		expectType<string>(value);
		expectType<'foo'>(key);
		return Math.random() > 0.5 ? false : Promise.resolve(true);
	}),
);
expectType<Promise<{[key in 'foo']: boolean}>>(
	pProps(
		{foo: 'bar'},
		async (value, key) => {
			expectType<string>(value);
			expectType<'foo'>(key);
			return Math.random() > 0.5 ? false : Promise.resolve(true);
		},
		{
			concurrency: 1,
		},
	),
);

const hashMap = {
	unicorn: Promise.resolve(1),
	foo: 'bar',
};

// TODO: Should ideally be:
// expectType<Promise<{unicorn: 1; foo: 'bar'}>>(
expectType<Promise<{unicorn: number; foo: string}>>(
	pProps(hashMap),
);

const hashMap2 = {
	unicorn: Promise.resolve(1),
	foo: 'bar',
} as const;

// TODO: Should ideally be:
// expectType<Promise<{readonly unicorn: 1; readonly foo: 'bar'}>>(
expectType<Promise<{readonly unicorn: number; readonly foo: 'bar'}>>(
	pProps(hashMap2),
);

expectType<{bar: 'baz'; thud: 'qux'}>(
	await pProps({bar: 'baz' as const, thud: 'qux' as const}),
);

expectType<Promise<{[key in 'unicorn' | 'foo']: boolean}>>(
	pProps(hashMap, async (value, key) => {
		expectType<string | number>(value);
		expectAssignable<string>(key);
		return Math.random() > 0.5 ? false : Promise.resolve(true);
	}),
);
expectType<Promise<{[key in 'unicorn' | 'foo']: boolean}>>(
	pProps(
		hashMap,
		async (value, key) => {
			expectType<string | number>(value);
			expectAssignable<string>(key);
			return Math.random() > 0.5 ? false : Promise.resolve(true);
		},
		{
			concurrency: 1,
		},
	),
);

const partialMap: {foo?: Promise<string>} = {};
expectType<Promise<{foo?: string}>>(pProps(partialMap));

const map = new Map<number, string | Promise<string>>([
	[1, Promise.resolve('1')],
	[2, '2'],
]);

const result = await pProps(map);
expectType<Map<number, string>>(result);
expectType<string | undefined>(result.get(1));

expectType<Promise<Map<number, string>>>(pProps(map));
expectType<Promise<Map<number, number>>>(
	pProps(map, async (value, key) => {
		expectType<string>(value);
		expectType<number>(key);
		return Math.random() > 0.5 ? 1 : Promise.resolve(2);
	}),
);
expectType<Promise<Map<number, number>>>(
	pProps(
		map,
		async (value, key) => {
			expectType<string>(value);
			expectType<number>(key);
			return Math.random() > 0.5 ? 1 : Promise.resolve(2);
		},
		{
			concurrency: 1,
		},
	),
);

// PPropsAllSettled tests
expectType<Promise<{[key in 'foo']: PromiseSettledResult<string>}>>(pPropsAllSettled({foo: 'bar'}));
expectType<Promise<{[key in 'foo']: PromiseSettledResult<boolean>}>>(
	pPropsAllSettled({foo: 'bar'}, async (value, key) => {
		expectType<string>(value);
		expectType<'foo'>(key);
		return Math.random() > 0.5 ? false : Promise.resolve(true);
	}),
);

const settledHashMap = {
	unicorn: Promise.resolve(1),
	foo: 'bar',
};

expectType<Promise<{unicorn: PromiseSettledResult<number>; foo: PromiseSettledResult<string>}>>(
	pPropsAllSettled(settledHashMap),
);

expectType<Promise<{[key in 'unicorn' | 'foo']: PromiseSettledResult<boolean>}>>(
	pPropsAllSettled(settledHashMap, async (value, key) => {
		expectType<string | number>(value);
		expectAssignable<string>(key);
		return Math.random() > 0.5 ? false : Promise.resolve(true);
	}),
);

const settledMap = new Map<number, string | Promise<string>>([
	[1, Promise.resolve('1')],
	[2, '2'],
]);

expectType<Promise<Map<number, PromiseSettledResult<string>>>>(pPropsAllSettled(settledMap));
expectType<Promise<Map<number, PromiseSettledResult<number>>>>(
	pPropsAllSettled(settledMap, async (value, key) => {
		expectType<string>(value);
		expectType<number>(key);
		return Math.random() > 0.5 ? 1 : Promise.resolve(2);
	}),
);
