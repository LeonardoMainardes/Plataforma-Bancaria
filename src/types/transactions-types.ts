import z from "zod";
import { textAll, textEntries, textExits } from "@/data";

export type TransactionType = "income" | "expense";

export type Transaction = {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: TransactionType;
};

type FilterType = "all" | "income" | "expense";

export const FILTERS: { label: string; value: FilterType }[] = [
  { label: textAll, value: "all" },
  { label: textEntries, value: "income" },
  { label: textExits, value: "expense" },
];

export const transferSchema = (balance: number) =>
  z.object({
    bank: z.string().min(1, "Informe o banco destino."),
    recipient: z.string().min(1, "Informe o nome do favorecido."),
    amount: z
      .number("Informe um valor válido.")
      .positive("O valor deve ser maior que zero.")
      .max(balance, "Saldo insuficiente para esta transferência."),
    description: z.string().min(1, "Informe uma descrição."),
  });

export type TransferForm = z.infer<ReturnType<typeof transferSchema>>;
