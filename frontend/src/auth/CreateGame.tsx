import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const CreateGame = () => {
  const navigate = useNavigate();

  const createGame = () => {
    const inviteCode = uuidv4();
    return navigate(`/home/${inviteCode}`);
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
        <Button onClick={createGame}>Create game</Button>
      </CardFooter>
    </Card>
  );
};

export default CreateGame;
