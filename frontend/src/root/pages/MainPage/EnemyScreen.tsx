import { truncate } from "@/lib/utils";
import EnemyTypingParagraph from "../../components/Game/EnemyTypingParagraph";
import { EnemyGameProps } from "@/types";
import IcyFloor from '/IcyFloorFlat.png'
import WarbyAttackEnemy from '/WarbyAttackEnemy.gif'


const EnemyScreen = ({
  name,
  ioInstance,
  paragraph,
  gameStatus,
}: EnemyGameProps) => {


  return (
    <div
      className="flex-1 rounded-lg m-4 shadow-md flex items-center justify-center"
  
    >

        {gameStatus === "not-started" ? (
         <div className="relative w-full">
         <div className="flex-grow flex-row flex align-middle">
           <img draggable="false"
                 className="w-[10rem]" src={WarbyAttackEnemy}/>
           <div className="flex items-center justify-end flex-1">
 
           <h1 className="md:text-6xl sm:text-3xl pr-10">{truncate(name as string)}</h1>
           </div>
                 
         </div>
         <div className="absolute h-[100%] w-full flex bottom-[-1rem] z-0">
     <img draggable="false" className="w-full" src={IcyFloor} />
   </div>
         </div>
        ) : (
          <EnemyTypingParagraph paragraph={paragraph} ioInstance={ioInstance} />
        )}
      </div>
  );
};

export default EnemyScreen;
