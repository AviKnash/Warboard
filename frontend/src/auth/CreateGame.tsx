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

  console.log(currentUser,userLoggedIn)
  const createGame = () => {
    const inviteCode = uuidv4();
    return navigate(`/home/${inviteCode}/${currentUser?.displayName}`);
  };

  const createSinglePlayerGame = ()=>{
    return navigate(`/home/practice`)
  }

  return (
    <Card className="flex-1 rounded-lg m-4 shadow-md flex flex-col">
      <CardHeader>
        <CardTitle>Create a game!</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p>Click to make a room and share the code to battle it out!!</p>
      </CardContent>
      <CardFooter className="flex justify-center mt-auto">
        {userLoggedIn ? (
          <Button className="m-2" onClick={createGame}>Multiplayer Battle</Button>
          ) : (

            <EnterNameDialog />
  
        )}
        <Button onClick={createSinglePlayerGame} className="m-2">Practice Singleplayer</Button>
      </CardFooter>
    </Card>
  );
};

export default CreateGame;
