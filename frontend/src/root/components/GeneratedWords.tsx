interface GeneratedWordsProps {
    words:string;
}

const GeneratedWords = ({words}:GeneratedWordsProps) => {
  return (
    <div className="text-orange-500">{words}</div>
  )
}

export default GeneratedWords