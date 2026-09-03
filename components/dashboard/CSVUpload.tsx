"use client";

import { ChangeEvent, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDashboard } from "./DashboardProvider";
import { parseInvoiceCSV, downloadTextFile } from "@/lib/csv";
import { CSV_TEMPLATE_EXAMPLE } from "@/lib/sampleData";
import { Button } from "@/components/ui/Button";
import { IconAlert, IconCheck, IconDownload, IconUpload } from "./icons";

export function CSVUpload() {
  const { loadUploadedData, loadSampleData, dataSource, validationErrors, invoices } =
    useDashboard();
  const [fileName, setFileName] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File) {
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result || "");
      const { invoices: parsed, errors } = parseInvoiceCSV(text);
      loadUploadedData(parsed, errors);
    };
    reader.readAsText(file);
  }

  function onInputChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  return (
    <div className="rounded-2xl border border-border-gold bg-bg-elevated/60 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="eyebrow">Data</p>
          <h3 className="mt-1 font-serif text-xl text-cream">Load invoice data</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() =>
              downloadTextFile("nicomach-invoice-template.csv", CSV_TEMPLATE_EXAMPLE)
            }
          >
            <IconDownload width={14} height={14} /> Template
          </Button>
          <Button variant="secondary" size="sm" onClick={loadSampleData}>
            Use sample data
          </Button>
        </div>
      </div>

      <label
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          const file = e.dataTransfer.files?.[0];
          if (file) handleFile(file);
        }}
        className={`mt-5 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-6 py-8 text-center transition-colors ${
          dragOver ? "border-gold bg-gold/5" : "border-border-gold hover:border-gold/40"
        }`}
      >
        <IconUpload className="text-gold-light" />
        <p className="text-sm text-cream">
          Drop a CSV file here, or <span className="text-gold-light underline">browse</span>
        </p>
        <p className="text-xs text-muted">
          invoice_id, payer, recipient, amount, currency, due_date, verification_status,
          eligibility_status
        </p>
        <input
          ref={inputRef}
          type="file"
          accept=".csv,text/csv"
          onChange={onInputChange}
          className="sr-only"
        />
      </label>

      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted">
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            dataSource === "sample" ? "bg-gold" : "bg-success"
          }`}
        />
        {dataSource === "sample"
          ? `Using built-in sample data (${invoices.length} invoices)`
          : `Using ${fileName ?? "uploaded file"} (${invoices.length} invoices)`}
      </div>

      <AnimatePresence>
        {validationErrors.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 overflow-hidden rounded-xl border border-gold/30 bg-gold/5 p-4"
          >
            <p className="mb-2 flex items-center gap-2 text-sm text-gold-light">
              <IconAlert width={16} height={16} />
              {validationErrors.length} validation issue(s) found
            </p>
            <div className="max-h-40 space-y-1 overflow-y-auto pr-1 text-xs text-muted">
              {validationErrors.slice(0, 50).map((err, i) => (
                <p key={i}>
                  Row {err.row}
                  {err.invoice_id ? ` (${err.invoice_id})` : ""}: {err.message}
                </p>
              ))}
            </div>
          </motion.div>
        )}
        {validationErrors.length === 0 && dataSource === "upload" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 flex items-center gap-2 rounded-xl border border-success/30 bg-success/10 p-3 text-sm text-success"
          >
            <IconCheck width={16} height={16} /> File loaded with no validation errors.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
