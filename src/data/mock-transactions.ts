import type { Transaction } from "@/types/transactions-types";

export const mockTransactions: Transaction[] = [
  {
    id: "1",
    date: "2025-05-01",
    description: "Salário",
    amount: 5000,
    type: "income",
  },
  {
    id: "2",
    date: "2025-05-03",
    description: "Mercado",
    amount: 320,
    type: "expense",
  },
  {
    id: "3",
    date: "2025-05-10",
    description: "Freelance",
    amount: 1200,
    type: "income",
  },
  {
    id: "4",
    date: "2025-05-15",
    description: "Conta de luz",
    amount: 180,
    type: "expense",
  },
  {
    id: "5",
    date: "2025-05-20",
    description: "Transferência",
    amount: 500,
    type: "expense",
  },
];
