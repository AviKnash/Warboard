import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import UserComments from "../components/UserComments";
import { useToast } from "@/components/ui/use-toast";

type WaitingScreenProps = {
  gameId: string | undefined;
};

const WaitingScreen = ({ gameId }: WaitingScreenProps) => {

  const {toast} = useToast()

  const copyGameId = () => {
    if (!gameId) return;
    navigator.clipboard.writeText(gameId);
    toast({title:"Copied to clipboard!"})
  };

  return (
    <div className="h-full w-full">
      <Card className="flex-1 rounded-lg m-4 shadow-md flex flex-col items-center">
        <CardHeader>
          <CardTitle>Waiting for player 2...</CardTitle>
        </CardHeader>
        <CardContent>Please copy the code to share with a friend.</CardContent>

        <CardContent className="flex-grow flex flex-row w-1/2 justify-center">
          <Input type="text" readOnly value={gameId} />
          <Button variant="ghost" onClick={copyGameId}>
            Copy
          </Button>
        </CardContent>
      </Card>
      <div className="w-full grid lg:grid-cols-3 sm:grid-cols-1">
        <UserComments />
      </div>
    </div>
  );
};

export default WaitingScreen;
