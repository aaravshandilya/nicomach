"use client";

import { CSVUpload } from "../CSVUpload";
import { InvoiceTable } from "../InvoiceTable";

export function Obligations() {
  return (
    <div className="space-y-6">
      <CSVUpload />
      <InvoiceTable />
    </div>
  );
}
