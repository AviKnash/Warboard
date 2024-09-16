import { useGetLeaderBoard } from "@/hooks/useGetLeaderBoard";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";

export default function LeaderBoard() {
  const { leaderBoard, loading } = useGetLeaderBoard();

  return (
    <div className="flex flex-col w-full h-full items-center overflow-scroll">
      <h1 className="text-2xl font-bold text-center mb-4 p-2">Leaderboard</h1>
      <h2 className="text-lg text-gray-600 text-center mb-8">
        Check out our top performers!
      </h2>
      <Card className="w-3/4">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Rank</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>WPM</TableHead>
              <TableHead className="text-center">Accuracy (%)</TableHead>
              <TableHead className="text-center">Total characters typed</TableHead>
              <TableHead className="text-center">Total games played</TableHead>
              <TableHead className="text-center">Total games won</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : (
              leaderBoard.map((player, index) => (
                <TableRow key={player.id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{player.userName}</TableCell>
                  <TableCell>{player.wpm}</TableCell>
                  <TableCell className="text-center">{player.accuracy}</TableCell>
                  <TableCell className="text-center">{player.totalTyped}</TableCell>
                  <TableCell className="text-center">{player.totalGames}</TableCell>
                  <TableCell className="text-center">{player.gamesWon}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
