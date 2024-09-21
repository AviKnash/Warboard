import Icefloor from "/IcyFloor.png";

const IceFlooring = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 w-full overflow-hidden">
      <img
        draggable="false"
        src={Icefloor}
        alt="Ice Floor"
        className="w-full h-[100vh] object-cover"
      />
    </div>
  );
};

export default IceFlooring;