import { Skeleton } from "@/components/ui/skeleton";

export function LoadingRow() {
  return (
    <div className="flex justify-between items-center px-4 py-3">
      <div className="flex items-center gap-3">
        <Skeleton className="w-2 h-2 rounded-full" />
        <div className="space-y-1">
          <Skeleton className="h-3.5 w-28" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
      <Skeleton className="h-4 w-20" />
    </div>
  );
}
