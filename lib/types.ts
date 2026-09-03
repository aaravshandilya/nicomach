export type VerificationStatus = "verified" | "pending" | "disputed";
export type EligibilityStatus = "eligible" | "restricted" | "excluded";

export interface Invoice {
  invoice_id: string;
  payer: string;
  recipient: string;
  amount: number;
  currency: string;
  due_date: string;
  verification_status: VerificationStatus;
  eligibility_status: EligibilityStatus;
}

export interface ValidationError {
  row: number;
  invoice_id?: string;
  field: string;
  message: string;
}

export interface ParsedInvoices {
  invoices: Invoice[];
  errors: ValidationError[];
}

export interface CompanyPosition {
  company: string;
  currency: string;
  grossPayable: number;
  grossReceivable: number;
  netPosition: number; // positive = net receiver, negative = net payer
}

export interface SettlementPayment {
  id: string;
  from: string; // payer
  to: string; // recipient
  amount: number;
  currency: string;
  /** ids of eligible invoices touching `from` or `to`, used for explainability */
  contributingInvoiceIds: string[];
}

export interface OptimizationGroup {
  currency: string;
  positions: CompanyPosition[];
  originalPayments: SettlementPayment[];
  optimizedPayments: SettlementPayment[];
}

export interface OptimizationResult {
  groups: OptimizationGroup[];
  totalInvoiceValue: number;
  eligibleInvoiceValue: number;
  originalGrossVolume: number;
  optimizedGrossVolume: number;
  originalPaymentCount: number;
  optimizedPaymentCount: number;
  reductionAmount: number;
  reductionPct: number;
  paymentsRemoved: number;
  participatingCompanies: string[];
  excludedInvoices: Invoice[];
}
