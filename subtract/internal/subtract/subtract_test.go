package subtract

import "testing"

func TestCompute(t *testing.T) {
	tests := []struct {
		name string
		a, b int
		want int
	}{
		{name: "positive_result", a: 5, b: 3, want: 2},
		{name: "negative_result", a: 3, b: 5, want: -2},
		{name: "zero", a: 4, b: 4, want: 0},
		{name: "subtract_zero", a: 7, b: 0, want: 7},
		{name: "both_negative", a: -3, b: -5, want: 2},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := Compute(tt.a, tt.b)
			if got != tt.want {
				t.Errorf("Compute(%d, %d) = %d, want %d", tt.a, tt.b, got, tt.want)
			}
		})
	}
}
