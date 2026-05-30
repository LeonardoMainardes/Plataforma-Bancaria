"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { useTransfer } from "@/app/transfers/hooks/use-transfer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  textAvailableBalance,
  textBalanceAfterTranfer,
  textDescripton,
  textDestinationBank,
  textDestinationName,
  textNewBalance,
  textNewTransfer,
  textPrice,
  textSuccessSend,
  textTransferMade,
} from "@/data";
import { formatPrice } from "@/hooks/general";
import { type TransferForm, transferSchema } from "@/types/transactions-types";

export default function TransferPage() {
  const { balance, transfer, status, reset } = useTransfer();

  const {
    register,
    handleSubmit,
    watch,
    reset: resetForm,
    formState: { errors },
  } = useForm<TransferForm>({
    resolver: zodResolver(transferSchema(balance)),
  });

  const amount = Number(watch("amount") || 0);
  const balanceAfter = balance - amount;

  function onSubmit(data: TransferForm) {
    transfer(data);
  }

  function handleReset() {
    reset();
    resetForm();
  }

  if (status === "success") {
    return (
      <div className="p-6">
        <Card className="p-8 flex flex-col items-center text-center gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center">
            <Check color="green" />
          </div>

          <div>
            <p className="font-medium">{textTransferMade}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {formatPrice(amount)} {textSuccessSend}
            </p>
          </div>

          <p className="text-xs text-muted-foreground">
            {textNewBalance}
            <span className="font-medium text-foreground">
              {formatPrice(balanceAfter)}
            </span>
          </p>

          <Button
            onClick={handleReset}
            className="text-sm text-white bg-yellow-500"
          >
            {textNewTransfer}
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Card className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="bank">{textDestinationBank}</Label>
              <Input id="bank" placeholder="Ex: Itaú" {...register("bank")} />
              {errors.bank && (
                <p className="text-xs text-destructive">
                  {errors.bank.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="nameHolder">{textDestinationName}</Label>
              <Input
                id="nameHolder"
                placeholder="Nome completo"
                {...register("recipient")}
              />
              {errors.recipient && (
                <p className="text-xs text-destructive">
                  {errors.recipient.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="price">{textPrice}</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                placeholder="0,00"
                {...register("amount", { valueAsNumber: true })}
              />

              {errors.amount ? (
                <p className="text-xs text-destructive">
                  {errors.amount.message}
                </p>
              ) : (
                amount > 0 && (
                  <p className="text-xs text-muted-foreground">
                    {textBalanceAfterTranfer}
                    <span
                      className={
                        balanceAfter < 0
                          ? "text-destructive"
                          : "text-foreground font-medium"
                      }
                    >
                      {formatPrice(balanceAfter)}
                    </span>
                  </p>
                )
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="description">{textDescripton}</Label>
              <Input
                id="description"
                placeholder="Ex: Aluguel"
                {...register("description")}
              />
              {errors.description && (
                <p className="text-xs text-destructive">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <p className="text-xs text-muted-foreground">
              {textAvailableBalance}:
              <span className="font-medium text-foreground">
                {formatPrice(balance)}
              </span>
            </p>

            <Button
              type="submit"
              disabled={status === "loading"}
              className="bg-yellow-500 text-white text-sm px-6 py-2"
            >
              {status === "loading" ? "Enviando..." : "Confirmar transferência"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
