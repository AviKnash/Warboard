import flame from "/flame.svg";

const Flame = () => {

//   const flameStyle = {
//     height: "auto",
//     position: "fixed",
//     left: "20%",
//     bottom: "-50px",
//     zIndex: 4,

//   };

  return (
    <div className="fixed ml-0 -bottom-32 bottom--10 z-10">
      <img draggable="false" src={flame} alt="Flame"/>
    </div>
  );
};

export default Flame;
