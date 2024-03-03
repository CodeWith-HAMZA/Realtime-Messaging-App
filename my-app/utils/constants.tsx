import { Skeleton } from "@/components/ui/skeleton";

// this is not a function-component, it's just a normal function, returning jsx
interface UserSkeletonProps {
  n: number;
}
export const UserSkeleton: React.FC<UserSkeletonProps> = ({ n }) => (
  <>
    {createArray(n).map(() => (
      <div className="py-2 px-4">
        <Skeleton className="w-[16rem] mb-1 h-[1.2rem] border-2" />
        <Skeleton className="w-[4rem] h-[0.8rem]  border-2" />
      </div>
    ))}
  </>
);

function createArray(n: number) {
  return Array.from({ length: n });
}


export const placeHolderImage = 'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg'