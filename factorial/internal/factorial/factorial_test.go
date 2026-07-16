package factorial

import (
	"testing"
)

func TestCompute(t *testing.T) {
	tests := []struct {
		name    string
		n       int
		want    string
		wantErr bool
	}{
		{name: "zero", n: 0, want: "1"},
		{name: "one", n: 1, want: "1"},
		{name: "five", n: 5, want: "120"},
		{name: "twenty_past_int64_overflow", n: 20, want: "2432902008176640000"},
		{name: "negative", n: -1, wantErr: true},
		{name: "boundary_rejected", n: MaxN + 1, wantErr: true},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, err := Compute(tt.n)

			if tt.wantErr {
				if err == nil {
					t.Fatalf("Compute(%d): expected error, got nil", tt.n)
				}
				return
			}

			if err != nil {
				t.Fatalf("Compute(%d): unexpected error: %v", tt.n, err)
			}

			if got.String() != tt.want {
				t.Errorf("Compute(%d) = %s, want %s", tt.n, got.String(), tt.want)
			}
		})
	}
}

func TestCompute_NegativeReturnsErrNegative(t *testing.T) {
	_, err := Compute(-1)
	if err != ErrNegative {
		t.Errorf("Compute(-1) error = %v, want ErrNegative", err)
	}
}

func TestCompute_MaxNBoundaryAccepted(t *testing.T) {
	got, err := Compute(MaxN)
	if err != nil {
		t.Fatalf("Compute(%d): unexpected error: %v", MaxN, err)
	}
	if got.Sign() <= 0 {
		t.Errorf("Compute(%d) = %s, want a positive number", MaxN, got.String())
	}
}
