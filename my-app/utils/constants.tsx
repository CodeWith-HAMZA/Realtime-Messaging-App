'use client'
import { Skeleton } from "@/components/ui/skeleton";

// this is not a function-component, it's just a normal function, returning jsx
interface UserSkeletonProps {
  n: number;
}
export const UserSkeleton: React.FC<UserSkeletonProps> = ({ n }) => (
  <div className="px-4 py-2">
    {createArray(n).map(() => (
      <div className="py-2">
        <Skeleton className="w-[16rem] mb-1 h-[1.2rem] border-2" />
        <Skeleton className="w-[4rem] h-[0.8rem]  border-2" />
      </div>
    ))}
  </div>
);

function createArray(n: number) {
  return Array.from({ length: n });
}
