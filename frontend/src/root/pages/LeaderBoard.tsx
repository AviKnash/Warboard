
import { useGetLeaderBoard } from "@/hooks/useGetLeaderBoard";
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table";
import { Card } from "@/components/ui/card";

export default function LeaderBoard() {
  const { leaderBoard, loading } = useGetLeaderBoard();

  return (
    <div className="flex flex-col w-full h-full items-center">

   <h1 className="text-2xl font-bold text-center mb-4">Leaderboard</h1>
      <h2 className="text-lg text-gray-600 text-center mb-8">Check out our top performers!</h2>
    <Card className="w-3/4">

    <Table className="w-full border border-white">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[80px]">Rank</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>WPM</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading ? (
            <TableRow>
            <TableCell colSpan={4} className="text-center">Loading...</TableCell>
          </TableRow>
        ) : (
            leaderBoard.map((player, index) => (
                <TableRow key={player.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{player.userName}</TableCell>
              <TableCell>{player.wpm}</TableCell>
            </TableRow>
          ))
          )}
      </TableBody>
    </Table>
          </Card>
          </div>
  );
}
