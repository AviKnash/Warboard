import React from 'react';
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

const LeaderBoard: React.FC = () => {
  const { leaderBoard, loading } = useGetLeaderBoard();

  const columns = [
    { key: 'rank', header: 'Rank', width: 'w-[15%]' },
    { key: 'name', header: 'Name', width: 'w-[20%]' },
    { key: 'wpm', header: 'WPM', width: 'w-[15%]' },
    { key: 'accuracy', header: 'Accuracy (%)', width: 'w-[15%]'  },
    { key: 'totalTyped', header: 'Total Typed', width: 'w-[15%]'  },
    { key: 'gamesPlayed', header: 'Games Played', width: 'w-[10%]' },
    { key: 'gamesWon', header: 'Games Won', width: 'w-[10%]'  },
  ];

  return (
    <div className="flex flex-col w-full h-full items-center p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Leaderboard</h1>
      <h2 className="text-lg text-gray-600 text-center mb-8">
        Check out our top performers!
      </h2>
      <Card className="w-full max-w-5xl border relative">
        <div className="overflow-hidden">
          <Table>
            <TableHeader className="sticky top-0 bg-card z-10">
              <TableRow>
                {columns.map((column) => (
                  <TableHead key={column.key} className={`${column.width} text-center`}>
                    {column.header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
          </Table>
          <div className="max-h-[calc(100vh-18rem)] overflow-y-auto">
            <Table>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="text-center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : (
                  leaderBoard.map((player, index) => (
                    <TableRow key={player.id}>
                      <TableCell className={`${columns[0].width} font-medium text-center`}>{index + 1}</TableCell>
                      <TableCell className={`${columns[1].width} text-center`}>{player.userName}</TableCell>
                      <TableCell className={`${columns[2].width} text-center`}>{player.wpm}</TableCell>
                      <TableCell className={`${columns[3].width} text-center`}>{player.accuracy}</TableCell>
                      <TableCell className={`${columns[4].width} text-center`}>{player.totalTyped}</TableCell>
                      <TableCell className={`${columns[5].width} text-center`}>{player.totalGames}</TableCell>
                      <TableCell className={`${columns[6].width} text-center`}>{player.gamesWon}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LeaderBoard;