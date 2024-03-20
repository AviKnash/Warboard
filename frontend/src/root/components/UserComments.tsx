import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { userComments } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { UserCommentIcon } from "./UserCommentIcon";

const UserComments = () => {
  return (
    <>
      {userComments.map((user, index) => (
        <Card className="m-5" key={index}>
          <CardHeader>
          <div className="flex items-center">
              <UserCommentIcon icon={user.imageUrl}/> 
              <div>
                <h3 className="text-lg font-semibold">{user.name}</h3>
                <p className="text-gray-500">{user.title}</p>
              </div>
            </div>
          </CardHeader>
          <Separator className="my-1" />
          <CardContent>
            <p className="text-gray-700">{user.description}</p>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      ))}
    </>
  );
};

export default UserComments;
