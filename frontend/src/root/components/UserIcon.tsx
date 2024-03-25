import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { IUser } from "@/types"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import UserStatsPopup from "./UserStatsPopup"
  
  export function AvatarDemo({currentUser}:{currentUser:IUser}) {


    return (
      <Avatar className="h-6 w-6">
        <Popover>
      <PopoverTrigger>

        <AvatarImage src={currentUser?.photoURL} alt="userImage"/>
      </PopoverTrigger>
      <PopoverContent>
        <UserStatsPopup />
      </PopoverContent>
        </Popover>
        <AvatarFallback>AV</AvatarFallback>
      </Avatar>
    )
  }
  