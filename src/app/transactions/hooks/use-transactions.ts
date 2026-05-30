"use client";

import { useEffect, useMemo, useState } from "react";
import { mockTransactions } from "@/data/mock-transactions";
import type { Transaction, TransactionType } from "@/types/transactions-types";

type Filter = "all" | TransactionType;

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    const timer = setTimeout(() => {
      setTransactions(mockTransactions);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const filtered = useMemo(
    () =>
      transactions.filter(
        (t) =>
          t.description.toLowerCase().includes(search.toLowerCase()) &&
          (filter === "all" || t.type === filter),
      ),
    [transactions, search, filter],
  );

  return {
    transactions: filtered,
    loading,
    error,
    setError,
    search,
    setSearch,
    filter,
    setFilter,
  };
}
