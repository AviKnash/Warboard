import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type WaitingScreenProps = {
  gameId: string | undefined;
};

const WaitingScreen = ({ gameId }: WaitingScreenProps) => {
  return (
    <Card className="flex-1 rounded-lg m-4 shadow-md flex flex-col">
      <CardHeader>
        <CardTitle>Waiting for player 2...</CardTitle>
      </CardHeader>

      <CardContent className="flex-grow">
        Please share the code : {gameId} to invite another player.
      </CardContent>
    </Card>
  );
};

export default WaitingScreen;
