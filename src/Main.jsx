import Data from "./Data";
import Plalform from "./Plalform";
import AddData from "./AddData";

function Main() {
  return (
    <div className="flex w-full h-[81vh] gap-1">
      <div className="border-2 w-[40%] h-full border-[#1c201e] flex flex-col gap-2 py-2 px-4 items-center ">
        <Plalform />
        <Plalform />
        <Plalform />
        <Plalform />
      </div>
      <div className="flex-col w-[60%] h-full overflow-y-auto border-2 border-[#1c201e] flex items-center py-4 gap-4 overflow-y">
        <AddData />
        <Data />
        <Data />
        <Data />
        <Data />
      </div>
    </div>
  );
}

export default Main;
