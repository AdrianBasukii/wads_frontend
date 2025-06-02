import { BounceLoader } from "react-spinners";

function Loader() {
  return (
    <div className="fixed  inset-0 z-50 flex items-center justify-center backdrop-blur-sm ">
      <BounceLoader size={80} color="##1D3B5C" />
    </div>
  );
}

export default Loader;
