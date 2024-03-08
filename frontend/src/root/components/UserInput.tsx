import Cursor from "./Cursor"

interface UserInputProps {
    userInput:string,
    className?:string
}

const UserInput = ({userInput,className}:UserInputProps) => {
const typedCharacters = userInput.split("")

  return (
    <div className={className}>
        {typedCharacters.map((char,index)=>{
            return <span key={index}>{char}</span>
        })}
        <Cursor />
    </div>
  )
}

export default UserInput