import { BounceLoader } from "react-spinners";

function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <BounceLoader color="#ffffff" size={60} />
    </div>
  );
}

export default Loader;
