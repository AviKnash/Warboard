import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import trophy from "/trophy.png";
import { motion } from "framer-motion";
import { formatPercentage } from "@/lib/utils";

type IWinProps = {
  wpm: number | undefined;
  restartPage: () => void;
  accuracy: number;
  typingErrors: number;
  totalTyped: number | undefined;
};

const WinScreen = ({
  wpm,
  restartPage,
  accuracy,
  typingErrors,
  totalTyped,
}: IWinProps) => {
  const { width, height } = useWindowSize();
  const widthPercent = width - width * 0.004;
  const heightPercent = height - height * 0.01;
  const initial = { opacity: 0 };
  const animate = { opacity: 1 };
  const duration = { duration: 0.3 };

  return (
    <div className="flex w-full items-center justify-center">
      <Confetti width={widthPercent} height={heightPercent} />
      <Card className="h-auto rounded-lg shadow-md flex flex-col items-center justify-center w-1/2">
        <CardHeader>
          <CardTitle>"Congratulations!"</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col items-center justify-center">
          <p>"Well done! You win"</p>
          <img className="w-1/2 h-auto" draggable="false" src={trophy} />
          <motion.ul
            className={`flex flex-col items-center text-primary-400 space-y-3`}
          >
            <motion.li
              initial={initial}
              animate={animate}
              transition={{ ...duration, delay: 0 }}
              className="text-xl font-semibold"
            >
              Results
            </motion.li>
            <motion.li
              initial={initial}
              animate={animate}
              transition={{ ...duration, delay: 0.5 }}
            >
              Your accuracy was: {formatPercentage(accuracy)}
            </motion.li>
            <motion.li
              initial={initial}
              animate={animate}
              transition={{ ...duration, delay: 1 }}
              className="text-red-500"
            >
              You  made {typingErrors} errors
            </motion.li>
            <motion.li
              initial={initial}
              animate={animate}
              transition={{ ...duration, delay: 1.4 }}
            >
              You typed {totalTyped} words
            </motion.li>
            <motion.li
              initial={initial}
              animate={animate}
              transition={{ ...duration, delay: 1.4 }}
            >
              You typed {wpm} words per minute
            </motion.li>
          </motion.ul>
        </CardContent>
        <CardFooter className="flex justify-center mt-auto">
          <Button onClick={restartPage}>Play again</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default WinScreen;
