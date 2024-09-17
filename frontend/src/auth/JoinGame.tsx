import { Input } from "@/components/ui/input";
import { FormEvent, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "@/context/AuthContext";
import CommonCard from "@/components/common/CommonCard";
import CommonButton from "@/components/common/CommonButton";

const JoinGame = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { currentUser, userLoggedIn } = useUserContext();
  const formRef = useRef<HTMLFormElement>(null);

  const joinGame = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const inviteCode = formData.get("inviteCode") as string;
    const name = formData.get("name") as string;
    if (userLoggedIn) {
      if (!inviteCode) {
        return toast({ title: "Invite Code is required" });
      }
      return navigate(`/${inviteCode}/${currentUser?.displayName}`);
    }
    if (!inviteCode || !name)
      return toast({ title: "Invite Code and Name are both required" });

    navigate(`/${inviteCode}/${name}`);
  };

  const handleButtonClick = () => {
    if (formRef.current) formRef.current.requestSubmit();
  };

  return (
    <CommonCard
      title="Join Game"
      footerContent={
        <CommonButton onClick={handleButtonClick} type="submit">
          Join
        </CommonButton>
      }
    >
      <form ref={formRef} onSubmit={joinGame}>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-3">
            <Input type="text" placeholder="Enter your invite code here" name="inviteCode" />
            {!userLoggedIn && (
              <>
                <Input type="text" placeholder="Enter name here" name="name" />
              </>
            )}
          </div>
        </div>
      </form>
    </CommonCard>
  );
};

export default JoinGame;
