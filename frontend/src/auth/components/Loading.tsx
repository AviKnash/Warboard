import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="grid grid-cols-1 justify-items-center w-full h-screen items-center">
      <div className="grid grid-cols-2">
        <div className="p-4">
          <Skeleton className="h-[25rem] w-[30rem] rounded-xl" />
        </div>
        <div className="p-4">
        <Skeleton className="h-[25rem] w-[30rem] rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
