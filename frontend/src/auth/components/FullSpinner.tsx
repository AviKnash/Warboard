import { Skeleton } from "@/components/ui/skeleton"

const FullSpinner = () => {
  return (
    <div className="grid grid-cols-1 justify-items-center w-full h-screen items-center border border-white">
         <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}

export default FullSpinner
