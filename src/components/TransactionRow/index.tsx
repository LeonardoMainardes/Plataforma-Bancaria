import { formatDate, formatPrice } from "@/hooks/general";
import type { Transaction } from "@/types/transactions-types";

export function TransactionRow({ value }: { value: Transaction }) {
  const isIncome = value.type === "income";

  return (
    <div className="flex justify-between items-center px-4 py-3">
      <div className="flex items-center gap-3">
        <div
          className={`w-2 h-2 rounded-full ${isIncome ? "bg-emerald-500" : "bg-red-500"}`}
        />
        <div>
          <p className="text-sm">{value.description}</p>
          <p className="text-xs text-muted-foreground">
            {formatDate(value.date)}
          </p>
        </div>
      </div>

      <span
        className={`text-sm font-medium ${isIncome ? "text-emerald-600" : "text-red-600"}`}
      >
        {isIncome ? "+" : "−"}
        {formatPrice(value.amount)}
      </span>
    </div>
  );
}
