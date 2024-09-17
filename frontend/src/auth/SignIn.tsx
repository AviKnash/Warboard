import CommonCard from "@/components/common/CommonCard";
import { useUser } from "@/hooks/useUser";
import GoogleButton from "react-google-button";

const SignIn = () => {
  const { addUser } = useUser();

  const signIn = async () => {
    try {
      addUser();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CommonCard
      title="Do you have an account or want to login?"
      footerContent={
        <GoogleButton label="Sign In" onClick={signIn}>
          Create game
        </GoogleButton>
      }
    >
      <p>Login using your Google account!</p>
    </CommonCard>
  );
};

export default SignIn;
