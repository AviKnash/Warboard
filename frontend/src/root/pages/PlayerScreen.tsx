interface PlayerScreenProps {
    sentence : string
}

const PlayerScreen = ({sentence}: PlayerScreenProps) => {
  return (
    <div className="border border-violet-800 p-4">{sentence}</div>
  )
}

export default PlayerScreen