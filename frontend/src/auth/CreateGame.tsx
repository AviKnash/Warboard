import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EnterNameDialog } from "./components/EnterNameDialog";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const CreateGame = () => {
  const navigate = useNavigate();

  const { currentUser, userLoggedIn } = useUserContext();
  const createGame = () => {
    console.log("here");
    const inviteCode = uuidv4();
    return navigate(`/home/${inviteCode}/${currentUser.displayName}`);
  };

  return (
    <Card className="flex-1 rounded-lg m-4 shadow-md flex flex-col">
      <CardHeader>
        <CardTitle>Create a game</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p>Create a game where you can invite a friend to battle it out!</p>
      </CardContent>
      <CardFooter className="flex justify-center mt-auto">
        {userLoggedIn ? (
          <Button onClick={createGame}>Create game</Button>
        ) : (
          <EnterNameDialog />
        )}
      </CardFooter>
    </Card>
  );
};

export default CreateGame;
