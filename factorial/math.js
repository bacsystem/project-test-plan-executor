/**
 * Calculates the factorial of a non-negative integer using BigInt.
 * @param {bigint} n
 * @returns {bigint}
 */
export function factorial(n) {
  const bigN = typeof n === 'bigint' ? n : BigInt(n);
  if (bigN < 0n) {
    throw new Error('Factorial is not defined for negative numbers');
  }
  let result = 1n;
  for (let i = 2n; i <= bigN; i++) {
    result *= i;
  }
  return result;
}
