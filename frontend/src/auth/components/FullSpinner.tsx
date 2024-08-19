import { Skeleton } from "@/components/ui/skeleton";

const FullSpinner = () => {
  return (
    <div className="flex-col h-full">
      <div className="h-1/2 flex items-center justify-center">
        <Skeleton className="h-[20rem] w-[20rem] rounded-xl" />
      </div>
      <div className="grid grid-cols-2">
        <div className="p-4">
          <Skeleton className="h-[10rem] w-[30rem] rounded-xl" />
        </div>
        <div className="p-4">
          <Skeleton className="h-[10rem] w-[30rem] rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export default FullSpinner;
