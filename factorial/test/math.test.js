import test from 'node:test';
import assert from 'node:assert';
import { factorial } from '../math.js';

test('Factorial math logic tests', async (t) => {
  await t.test('calculates factorial of 0 to be 1', () => {
    assert.strictEqual(factorial(0n).toString(), '1');
  });

  await t.test('calculates factorial of 1 to be 1', () => {
    assert.strictEqual(factorial(1n).toString(), '1');
  });

  await t.test('calculates factorial of a small number (5)', () => {
    assert.strictEqual(factorial(5n).toString(), '120');
  });

  await t.test('calculates factorial of a larger number exceeding safe integer limit (20)', () => {
    assert.strictEqual(factorial(20n).toString(), '2432902008176640000');
  });

  await t.test('throws an error for negative numbers', () => {
    assert.throws(() => factorial(-1n), /not defined for negative numbers/);
  });
});
