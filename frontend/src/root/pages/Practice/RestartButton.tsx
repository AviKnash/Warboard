import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { MdRefresh } from "react-icons/md";

const RestartButton = ({
  onRestart: handleRestart,
  className,
}: {
  onRestart: () => void;
  className?: string;

}) => {

const buttonRef = useRef<HTMLButtonElement>(null)

const handleClick =()=>{
    buttonRef.current?.blur();
    handleRestart()
}

  return (
    <Button
    tabIndex={-1}
    variant={"ghost"}
    ref={buttonRef}
      className={`block rounded px-8 py-2 hover:bg-slate-800 ${className}`}
      onClick={handleClick}
    >
      <MdRefresh className="w-6 h-6"/>
    </Button>
  );
};

export default RestartButton;
