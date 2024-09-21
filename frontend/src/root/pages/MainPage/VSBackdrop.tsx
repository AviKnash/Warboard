import Backdrop from "/Backdrop.png";

const VSBackdrop = () => {
  return (
    <div className="fixed bottom-12 left-0 right-0 flex justify-center items-end z-[-1] opacity-10">
      <img
        draggable="false"
        src={Backdrop}
        alt="Backdrop"
        className="w-full h-auto"
      />
    </div>
  );
};

export default VSBackdrop;
