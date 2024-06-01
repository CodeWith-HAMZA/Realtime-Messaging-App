import { Skeleton } from "@/components/ui/skeleton";

// this is not a function-component, it's just a normal function, returning jsx
interface UserSkeletonProps {
  n: number;
}
export const UserSkeleton: React.FC<UserSkeletonProps> = ({ n }) => (
  <>
    {createArray(n).map((n, i) => (
      <div key={i} className="py-2 px-4">
       
      </div>
    ))}
  </>
);

function createArray(n: number) {
  return Array.from({ length: n });
}

export const placeHolderImage =
  "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg";
