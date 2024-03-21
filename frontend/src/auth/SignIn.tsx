import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { doSignInWithGoogle } from "@/firebase/api";
import GoogleButton from 'react-google-button'

const SignIn = () => {

  const signIn = async () => {
    try {
      const result = await doSignInWithGoogle()
 
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <Card className="flex-1 rounded-lg m-4 shadow-md flex flex-col">
      <CardHeader>
        <CardTitle>Do you have an account or want to login?</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p>Login using your Google account!</p>
      </CardContent>
      <CardFooter className="flex justify-center mt-auto">
        <GoogleButton label="Sign In" onClick={signIn}>Create game</GoogleButton>
      </CardFooter>
    </Card>
  );
};

export default SignIn;
