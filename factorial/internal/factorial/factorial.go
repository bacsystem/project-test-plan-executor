package factorial

import (
	"errors"
	"fmt"
	"math/big"
)

// MaxN is the largest n accepted by Compute, bounding CPU/memory use per request.
const MaxN = 10000

// ErrNegative is returned by Compute when n is negative.
var ErrNegative = errors.New("n must not be negative")

// Compute returns n! as an arbitrary-precision integer.
// It returns ErrNegative if n < 0, or an error if n > MaxN.
func Compute(n int) (*big.Int, error) {
	if n < 0 {
		return nil, ErrNegative
	}
	if n > MaxN {
		return nil, fmt.Errorf("n must not exceed %d", MaxN)
	}

	result := big.NewInt(1)
	for i := 2; i <= n; i++ {
		result.Mul(result, big.NewInt(int64(i)))
	}
	return result, nil
}
