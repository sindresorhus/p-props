import test from 'ava';
import delay from 'delay';
import pProps from './index.js';

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
