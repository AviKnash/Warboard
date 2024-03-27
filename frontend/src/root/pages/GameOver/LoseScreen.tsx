import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import skull from "/skull.png";
import SnowFall from "react-snowfall"
import { motion } from "framer-motion";
import { formatPercentage } from "@/lib/utils";

type ILoseProps = {
  wpm: number | undefined;
  restartPage: () => void;
  accuracy:number;
  typingErrors:number;
  totalTyped:number | undefined;
};

const LoseScreen = ({ wpm, restartPage,accuracy ,typingErrors ,totalTyped }: ILoseProps) => {

    const initial = { opacity: 0 };
    const animate = { opacity: 1 };
    const duration = { duration: 0.3 };

  return (

    <div className="flex w-full items-center justify-center">
     <SnowFall />
      <Card className="h-auto rounded-lg shadow-md flex flex-col items-center justify-center w-1/2">
        <CardHeader>
          <CardTitle>"Too slow..."</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col items-center justify-center">
          <p>"That sucks. Keep practicing!"</p>
          <img className="w-1/2 h-auto" draggable="false" src={skull} />
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

export default LoseScreen;
