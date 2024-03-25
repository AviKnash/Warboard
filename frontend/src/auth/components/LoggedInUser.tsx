import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const LoggedInUser = (currentUser: any) => {
  return (
    <Card className="flex-1 rounded-lg shadow-md flex flex-col">
      <CardHeader>
        <CardTitle>
          Welcome back, {currentUser?.currentUser?.displayName}
        </CardTitle>
      </CardHeader>
    </Card>
  );
};

export default LoggedInUser;
