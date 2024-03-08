interface EnemyScreenProps {
    sentence : string,
    className :string
}

const EnemyScreen = ({sentence,className}:EnemyScreenProps) => {
  return (
    <div className={className}>{sentence}</div>
  )
}

export default EnemyScreen