import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  
  export function UserCommentIcon({icon}:{icon:string | undefined}) {


    return (
      <Avatar className=" mr-2 h-10 w-10 inline-block">
        <AvatarImage src={icon} alt="@shadcn" />
        <AvatarFallback>AV</AvatarFallback>
      </Avatar>
    )
  }
  