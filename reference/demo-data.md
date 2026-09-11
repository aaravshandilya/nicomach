# The demonstration ledger

The numbers in the console are not decoration; they net.

## The nine obligations

| Invoice | Payer | Payee | Amount | Status |
| --- | --- | --- | ---: | --- |
| INV-4471 | Cascade Orchards | Northline Freight | 18,420 | verified |
| INV-4488 | Northline Freight | Ridgeline Packaging | 18,420 | verified |
| INV-4502 | Ridgeline Packaging | Harbor Provisions | 18,420 | verified |
| INV-4510 | Harbor Provisions | Sunset Markets | 18,420 | verified |
| INV-4517 | Sunset Markets | Cascade Orchards | 2,000 | verified |
| INV-4521 | Copperfield Labs | Cascade Orchards | 10,000 | verified |
| INV-4526 | Ridgeline Packaging | Cascade Orchards | 6,420 | verified |
| INV-4523 | Copperfield Labs | Sunset Markets | 6,150 | **disputed — excluded** |
| INV-4529 | Cascade Orchards | Copperfield Labs | 4,780 | **pending — excluded** |

Eligible gross = 18,420 × 4 + 2,000 + 10,000 + 6,420 = **92,100**.

## Net positions of the seven eligible rows

| Party | Owed | Owes | Net |
| --- | ---: | ---: | ---: |
| Cascade Orchards | 2,000 + 10,000 + 6,420 = 18,420 | 18,420 | 0 |
| Northline Freight | 18,420 | 18,420 | 0 |
| Ridgeline Packaging | 18,420 | 18,420 + 6,420 = 24,840 | −6,420 |
| Harbor Provisions | 18,420 | 18,420 | 0 |
| Sunset Markets | 18,420 | 2,000 | +16,420 |
| Copperfield Labs | 0 | 10,000 | −10,000 |

The positions sum to zero, as they must.

## The settlement

Two parties are short and one is owed, so two transfers are the minimum:

- **STL-001** Copperfield Labs → Sunset Markets, 10,000 (closes 4 obligations)
- **STL-002** Ridgeline Packaging → Sunset Markets, 6,420 (closes 3 obligations)

**16,420** moves instead of **92,100** — an 82% reduction, which is the figure
the console derives at runtime rather than hard-codes.
