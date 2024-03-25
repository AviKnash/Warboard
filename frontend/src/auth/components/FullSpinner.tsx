import { Skeleton } from "@/components/ui/skeleton";

const FullSpinner = () => {
  return (
    <div className="grid grid-cols-1 justify-items-center w-full h-screen items-center">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="grid grid-cols-2">
        <div className="p-4">

        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <Skeleton className="h-4 w-[200px]" />
        </div>
        <div className="p-4">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    </div>
  );
};

export default FullSpinner;
