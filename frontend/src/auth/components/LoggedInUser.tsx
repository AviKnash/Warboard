import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { doSignOut } from "@/firebase/api";

const LoggedInUser = (currentUser: any) => {
  const logOut = () => {
    try {
      doSignOut().then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Card className="flex-1 rounded-lg shadow-md flex flex-col">
      <CardHeader>
        <CardTitle>
          Welcome back {currentUser?.currentUser?.displayName}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p>
          You are currently logged in with Google.<Button onClick={logOut} variant="link">Sign Out</Button>
        </p>
      </CardContent>
    </Card>
  );
};

export default LoggedInUser;
