import { useState } from "react";
import { mockAccount } from "@/data/mock-account";

export type TransferForm = {
  bank: string;
  recipient: string;
  amount: number;
  description: string;
};

type Status = "idle" | "loading" | "success" | "error";

const validate = (form: TransferForm, balance: number): string | null => {
  if (!form.bank || !form.recipient || !form.description)
    return "Preencha todos os campos obrigatórios.";
  if (form.amount <= 0) return "O valor deve ser maior que zero.";
  if (form.amount > balance) return "Saldo insuficiente.";
  return null;
};

export function useTransfer() {
  const [balance, setBalance] = useState(mockAccount.balance);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const transfer = (form: TransferForm) => {
    const err = validate(form, balance);

    if (err) {
      setErrorMessage(err);
      setStatus("error");
      return;
    }

    setStatus("loading");
    setTimeout(() => {
      setBalance((prev) => prev - form.amount);
      setStatus("success");
    }, 1000);
  };

  const reset = () => {
    setStatus("idle");
    setErrorMessage(null);
  };

  return { balance, transfer, status, errorMessage, reset };
}
