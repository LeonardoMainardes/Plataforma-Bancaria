"use client";

import { useEffect, useState } from "react";
import { mockAccount } from "@/data/mock-account";
import type { Account } from "@/types/account-types";

export function useAccount() {
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        setAccount(mockAccount);
      } catch {
        setError("Erro ao carregar dados da conta.");
      } finally {
        setLoading(false);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return { account, loading, error };
}
