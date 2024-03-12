import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EnterNameDialog } from "./components/EnterNameDialog";

const CreateGame = () => {

  
  return (
    <Card className="flex-1 rounded-lg m-4 shadow-md flex flex-col">
      <CardHeader>
        <CardTitle>Create a game</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p>Create a game where you can invite a friend to battle it out!</p>
      </CardContent>
      <CardFooter className="flex justify-center mt-auto">
        {/* <Button onClick={createGame}>Create game</Button> */}
        <EnterNameDialog />
      </CardFooter>
    </Card>
  );
};

export default CreateGame;
