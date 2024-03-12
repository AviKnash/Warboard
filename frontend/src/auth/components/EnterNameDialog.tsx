import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { FormEvent } from "react";
import { toast, useToast } from "@/components/ui/use-toast";

export function EnterNameDialog() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const createGame = (e: FormEvent<HTMLFormElement>) => {
    console.log("here")
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name" as string);
    if (!name) {
      return toast({ title: "Name is required!" });
    }
    const inviteCode = uuidv4();
    return navigate(`/home/${inviteCode}/${name}`);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Start Game</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Please enter your name.</AlertDialogTitle>
        </AlertDialogHeader>
        <form onSubmit={createGame}>
          <Label htmlFor="name">Name</Label>
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
