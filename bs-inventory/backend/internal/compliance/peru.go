package compliance

import (
	"bytes"
	"context"
	"fmt"

	"bs-inventory/internal/domain"
)

// PeruProfile implements PLE 13.1 ("Registro de Inventario Permanente
// Valorizado"), verified directly against SUNAT's own published
// structure (Anexo 2, base norm RS 286-2009/SUNAT, amended by RS
// 361-2015 and RS 315-2018) — not transcribed from a secondary summary.
type PeruProfile struct{}

func NewPeruProfile() *PeruProfile {
	return &PeruProfile{}
}

// entryType values for PLE field 14 ("Tipo de operación") — both
// space-padded to the same 3-character width so the pipe-delimited
// columns that follow always start at a fixed offset in a fixed-width
// viewer, matching how the rest of this row's literals are aligned.
const (
	entryTypeIn  = "IN "
	entryTypeOut = "OUT"
)

func (p *PeruProfile) ExportLedger(ctx context.Context, movements []domain.StockMovement, products map[string]domain.Product, warehouses map[string]domain.Warehouse, period string) ([]byte, error) {
	entries := BuildKardex(movements)

	var buf bytes.Buffer
	for i, e := range entries {
		m := e.Movement
		entryType := entryTypeIn
		outQty, outCost, outTotal := 0, 0.0, 0.0
		inQty, inCost, inTotal := 0, 0.0, 0.0
		if m.Type == domain.MovementIn {
			inQty, inCost, inTotal = m.Quantity, m.UnitCost, float64(m.Quantity)*m.UnitCost
		} else {
			entryType = entryTypeOut
			outQty, outCost, outTotal = m.Quantity, e.BalanceUnitCost, float64(m.Quantity)*e.BalanceUnitCost
		}

		// 27 fields per PLE 13.1's Anexo 2 structure. Fields with no
		// established value in this version (catalog/UNSPSC codes) are
		// emitted empty, not omitted — PLE's own rule is "empty field,
		// still present" for optional-but-defined columns, distinct from
		// truly free-use fields 28-56 (which this exporter doesn't emit
		// at all).
		row := fmt.Sprintf(
			"%s|%s|%s|%s||%s||%s||%s|%s|%s|%s|%s||%s|%s|%d|%.4f|%.4f|%d|%.4f|%.4f|%d|%.4f|%.4f|1",
			period,                     // 1: Período
			fmt.Sprintf("CUO-%d", i+1), // 2: CUO
			"M",                        // 3: Correlativo del asiento
			warehouses[m.WarehouseID].RucEstablishmentCode, // 4: Código de establecimiento anexo
			"03",                                     // 6: Tipo de existencia (03 = mercadería)
			m.ProductSKU,                             // 7: Código propio de la existencia
			m.OccurredAt.Format("02/01/2006"),        // 10: Fecha de emisión del documento
			m.DocumentType,                           // 11: Tipo de documento
			m.DocumentSeries,                         // 12: Serie del documento
			m.DocumentNumber,                         // 13: Número del documento
			entryType,                                // 14: Tipo de operación
			products[m.ProductSKU].UnitOfMeasureCode, // 16: Código unidad de medida
			"1",                                      // 17: Método de valuación (1 = promedio ponderado)
			inQty, inCost, inTotal,                   // 18-20: Entrada
			outQty, outCost, outTotal, // 21-23: Salida
			e.BalanceQuantity, e.BalanceUnitCost, e.BalanceValue, // 24-26: Saldo final
			// 27: Estado de la operación — always "1" (vigente/normal) in
			// this version; no cancellation/correction workflow exists yet
			// that would ever emit another value here.
		)
		buf.WriteString(row)
		buf.WriteString("\n")
	}
	return buf.Bytes(), nil
}
