"use client";

import { useTransactions } from "@/app/transactions/hooks/use-transactions";
import { LoadingRow } from "@/components/LoadinRow";
import { TransactionRow } from "@/components/TransactionRow";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { textErrorLoadingTransactions, textNotFoundTransactions } from "@/data";
import { SKELETON_KEYS } from "@/hooks/general";
import { FILTERS } from "@/types/transactions-types";

export default function TransactionsPage() {
  const { transactions, loading, error, search, setSearch, filter, setFilter } =
    useTransactions();

  return (
    <div className="p-6 space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          placeholder="Buscar por descrição..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1"
        />

        <div className="flex gap-2">
          {FILTERS.map((item) => (
            <Button
              key={item.value}
              onClick={() => setFilter(item.value)}
              className={`px-4 py-1.5 rounded-full text-sm border ${
                filter === item.value
                  ? "bg-yellow-500 text-white border-yellow-500"
                  : "text-muted-foreground border-border bg-white hover:bg-muted"
              }`}
            >
              {item.label}
            </Button>
          ))}
        </div>
      </div>

      <Card className="divide-y divide-border">
        {loading && SKELETON_KEYS.map((key) => <LoadingRow key={key} />)}

        {!loading && error && (
          <div className="py-16 text-center text-sm text-destructive">
            {textErrorLoadingTransactions}
          </div>
        )}

        {!loading && !error && transactions.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-sm font-medium">{textNotFoundTransactions}</p>
            <p className="text-xs text-muted-foreground">
              {search
                ? `Sem resultados para "${search}"`
                : "Você ainda não tem movimentações."}
            </p>
          </div>
        )}

        {!loading &&
          !error &&
          transactions.map((transactions) => (
            <TransactionRow key={transactions.id} value={transactions} />
          ))}
      </Card>
    </div>
  );
}
