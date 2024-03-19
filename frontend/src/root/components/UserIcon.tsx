import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { useUserContext } from "@/context/AuthContext"
  
  export function AvatarDemo() {

    const {currentUser} = useUserContext()
    console.log(currentUser?.photoURL)

    return (
      <Avatar className="h-6 w-6">
        <AvatarImage src={currentUser?.photoURL} alt="@shadcn" />
        <AvatarFallback>AV</AvatarFallback>
      </Avatar>
    )
  }
  