"use client";

import { useAccount } from "@/app/dashboard/hooks/use-account";
import { LoadingRow } from "@/components/LoadinRow";
import { TransactionRow } from "@/components/TransactionRow";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  textAvailableBalance,
  textEntries,
  textExits,
  textGoodMorning,
  textLatestMovements,
  textTransactions,
} from "@/data";
import { mockTransactions } from "@/data/mock-transactions";
import { formatPrice, SKELETON_KEYS } from "@/hooks/general";

const totalIncome = mockTransactions
  .filter((t) => t.type === "income")
  .reduce((acc, t) => acc + t.amount, 0);

const totalExpense = mockTransactions
  .filter((t) => t.type === "expense")
  .reduce((acc, t) => acc + t.amount, 0);

export default function DashboardPage() {
  const { account, loading } = useAccount();

  const summary = [
    {
      label: textEntries,
      value: formatPrice(totalIncome),
      color: "text-emerald-600",
    },
    {
      label: textExits,
      value: formatPrice(totalExpense),
      color: "text-orange-600",
    },
    {
      label: textTransactions,
      value: String(mockTransactions.length),
      color: "text-foreground",
    },
  ];

  return (
    <div className="p-6 space-y-4">
      <Card className="bg-yellow-500 text-white p-6 space-y-4">
        <div className="flex justify-between items-start">
          {loading ? (
            <>
              <Skeleton className="h-10 w-32 bg-yellow-400" />
              <Skeleton className="h-5 w-24 bg-yellow-400" />
            </>
          ) : (
            <>
              <div>
                <p className="text-xs text-yellow-100">{textGoodMorning},</p>
                <p className="text-base font-medium">{account?.name}</p>
              </div>
              <span className="text-xs text-yellow-100 bg-yellow-400 px-2 py-1 rounded">
                {account?.accountNumber}
              </span>
            </>
          )}
        </div>

        <div>
          <p className="text-xs text-yellow-100 mb-1">{textAvailableBalance}</p>

          {loading ? (
            <Skeleton className="h-9 w-40 bg-yellow-400" />
          ) : (
            <p className="text-3xl font-medium">
              {formatPrice(account?.balance ?? 0)}
            </p>
          )}
        </div>
      </Card>

      <div className="grid grid-cols-3 gap-3">
        {summary.map((item) => (
          <Card key={item.label} className="p-3 bg-muted/50">
            <p className="text-xs text-muted-foreground mb-1">{item.label}</p>

            {loading ? (
              <Skeleton className="h-6 w-20" />
            ) : (
              <p className={`text-lg font-medium ${item.color}`}>
                {item.value}
              </p>
            )}
          </Card>
        ))}
      </div>

      <div>
        <p className="text-sm font-medium text-muted-foreground mb-2">
          {textLatestMovements}
        </p>

        <Card className="divide-y divide-border">
          {loading
            ? SKELETON_KEYS.map((key) => <LoadingRow key={key} />)
            : mockTransactions
                .slice(0, 4)
                .map((t) => <TransactionRow key={t.id} value={t} />)}
        </Card>
      </div>
    </div>
  );
}
