import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <Skeleton className="h-1 w-full" />
    </div>
  );
}