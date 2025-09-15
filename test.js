import test from 'ava';
import delay from 'delay';
import pProps, {pPropsAllSettled} from './index.js';

test('main', async t => {
	t.deepEqual(
		await pProps({
			foo: delay(100).then(() => 1),
			bar: Promise.resolve(2),
			faz: 3,
		}),
		{
			foo: 1,
			bar: 2,
			faz: 3,
		},
	);
});

test('`Map` input', async t => {
	t.deepEqual(
		await pProps(new Map([
			['foo', Promise.resolve(1)],
			['bar', 2],
		])),
		new Map([
			['foo', 1],
			['bar', 2],
		]),
	);
});

test('rejects if any of the input promises reject', async t => {
	await t.throwsAsync(
		pProps({
			foo: Promise.resolve(1),
			bar: Promise.reject(new Error('bar')),
		}),
		{message: 'bar'},
	);
});

test('handles empty object', async t => {
	t.deepEqual(await pProps({}), {});
	t.deepEqual((await pProps(new Map([]))), new Map([]));
});

test('with mapper', async t => {
	t.plan(3);

	t.deepEqual(
		await pProps({
			foo: 1,
			baz: Promise.resolve(2),
		}, async (value, key) => {
			if (key === 'foo') {
				t.is(value, 1);
			}

			if (key === 'baz') {
				t.is(value, 2);
			}

			return key + value;
		}),
		{
			foo: 'foo1',
			baz: 'baz2',
		},
	);
});

test('`Map` input with mapper', async t => {
	t.plan(3);

	t.deepEqual(
		await pProps(new Map([
			['foo', 1],
			['bar', Promise.resolve(2)],
		]), async (value, key) => {
			if (key === 'foo') {
				t.is(value, 1);
			}

			if (key === 'bar') {
				t.is(value, 2);
			}

			return key + value;
		}),
		new Map([
			['foo', 'foo1'],
			['bar', 'bar2'],
		]),
	);
});

test('pPropsAllSettled: main', async t => {
	t.deepEqual(
		await pPropsAllSettled({
			foo: delay(100).then(() => 1),
			bar: Promise.resolve(2),
			faz: 3,
		}),
		{
			foo: {status: 'fulfilled', value: 1},
			bar: {status: 'fulfilled', value: 2},
			faz: {status: 'fulfilled', value: 3},
		},
	);
});

test('pPropsAllSettled: `Map` input', async t => {
	t.deepEqual(
		await pPropsAllSettled(new Map([
			['foo', Promise.resolve(1)],
			['bar', 2],
		])),
		new Map([
			['foo', {status: 'fulfilled', value: 1}],
			['bar', {status: 'fulfilled', value: 2}],
		]),
	);
});

test('pPropsAllSettled: handles rejected promises', async t => {
	t.deepEqual(
		await pPropsAllSettled({
			foo: Promise.resolve(1),
			bar: Promise.reject(new Error('bar')),
		}),
		{
			foo: {status: 'fulfilled', value: 1},
			bar: {status: 'rejected', reason: new Error('bar')},
		},
	);
});

test('pPropsAllSettled: handles empty object', async t => {
	t.deepEqual(await pPropsAllSettled({}), {});
	t.deepEqual((await pPropsAllSettled(new Map([]))), new Map([]));
});

test('pPropsAllSettled: with mapper', async t => {
	t.plan(3);

	t.deepEqual(
		await pPropsAllSettled({
			foo: 1,
			baz: Promise.resolve(2),
		}, async (value, key) => {
			if (key === 'foo') {
				t.is(value, 1);
			}

			if (key === 'baz') {
				t.is(value, 2);
			}

			return key + value;
		}),
		{
			foo: {status: 'fulfilled', value: 'foo1'},
			baz: {status: 'fulfilled', value: 'baz2'},
		},
	);
});

test('pPropsAllSettled: `Map` input with mapper', async t => {
	t.plan(3);

	t.deepEqual(
		await pPropsAllSettled(new Map([
			['foo', 1],
			['bar', Promise.resolve(2)],
		]), async (value, key) => {
			if (key === 'foo') {
				t.is(value, 1);
			}

			if (key === 'bar') {
				t.is(value, 2);
			}

			return key + value;
		}),
		new Map([
			['foo', {status: 'fulfilled', value: 'foo1'}],
			['bar', {status: 'fulfilled', value: 'bar2'}],
		]),
	);
});

test('pPropsAllSettled: mapper rejection', async t => {
	t.deepEqual(
		await pPropsAllSettled({
			foo: Promise.resolve(1),
			bar: 2,
		}, async (value, key) => {
			if (key === 'bar') {
				throw new Error('mapper error');
			}

			return value + 10;
		}),
		{
			foo: {status: 'fulfilled', value: 11},
			bar: {status: 'rejected', reason: new Error('mapper error')},
		},
	);
});
