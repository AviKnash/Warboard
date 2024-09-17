import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { FormEvent } from "react";
import {  useToast } from "@/components/ui/use-toast";
import CommonButton from "@/components/common/CommonButton";


export function EnterNameDialog() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const createGame = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name" as string);
    if (!name) {
      return toast({ title: "Name is required!" });
    }
    const inviteCode = uuidv4();
    return navigate(`/${inviteCode}/${name}`);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <CommonButton>Start Game</CommonButton>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Please enter your name.</AlertDialogTitle>
        </AlertDialogHeader>
        <form onSubmit={createGame}>
          <Input type="text" placeholder="Enter your name here" name="name" />
          <AlertDialogFooter className="m-4">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction type="submit">Continue</AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
