interface EnemyScreenProps {
    sentence : string
}

const EnemyScreen = ({sentence}:EnemyScreenProps) => {
  return (
    <div className="border border-violet-800 p-4">{sentence}</div>
  )
}

export default EnemyScreen