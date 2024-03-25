import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "@/context/AuthContext";

const JoinGame = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { currentUser, userLoggedIn } = useUserContext();

  const joinGame = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const inviteCode = formData.get("inviteCode") as string;
    const name = formData.get("name") as string;
    if (userLoggedIn) {
      if (!inviteCode) {
        return toast({ title: "Invite Code is required" });
      }
      return navigate(`/home/${inviteCode}/${currentUser?.displayName}`);
    }
    if (!inviteCode || !name)
      return toast({ title: "Invite Code and Name are both required" });

    navigate(`/home/${inviteCode}/${name}`);
  };

  return (
    <Card className="flex-1 rounded-lg m-4 shadow-md">
      <CardHeader>
        <CardTitle>Join Game</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={joinGame}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="code">Room Id</Label>
              <Input type="text" placeholder="eg: 12345" name="inviteCode" />
              {!userLoggedIn && (
                <>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    type="text"
                    placeholder="Enter name here"
                    name="name"
                  />
                </>
              )}
            </div>
          </div>
          <CardFooter className=" items-center justify-center py-1.5">
            <Button type="submit">Join</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default JoinGame;
