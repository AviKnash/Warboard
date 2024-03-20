
const CountDown = ({ count }: { count: number | null }) => {
  return (
    <>
      <div className="fixed inset-0 bg-black/80 bg-opacity-50 z-40"></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-9xl z-50 text-white">
        {count}
      </div>
    </>
  );
};

export default CountDown;
