const TopBar = () => {
    return (
      <div className="flex border bg-card text-card-foreground shadow-sm h-12 justify-center">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl font-bold">Your Game Title</div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-300">Home</a>
            <a href="#" className="hover:text-gray-300">About</a>
            <a href="#" className="hover:text-gray-300">Contact</a>
          </div>
        </div>
      </div>
    );
  };
  
  export default TopBar;