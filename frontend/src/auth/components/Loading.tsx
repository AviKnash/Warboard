import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function Loading() {
  return (
    <Card className="flex-1 rounded-lg m-4 shadow-md flex flex-col">
      <CardHeader>
        <CardTitle>Connection is initializing..</CardTitle>
      </CardHeader>

      <CardContent className="flex-grow">
        <p>Please hold on, while connection is set up.</p>
      </CardContent>
    </Card>
  );
}
