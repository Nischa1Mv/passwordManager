import Data from "./Data";
import Platform from "./Platform";
import AddData from "./AddData";
import { useState } from "react";

function Main() {
  const [platform, setPlatform] = useState("steam");
  return (
    <div className="flex w-full h-[81vh] gap-1">
      <div className="border-2 w-[40%] h-full border-[#1c201e] flex flex-col gap-2 py-2 px-4 items-center ">
        <Platform setPlatform={setPlatform} name="steam" />
        <Platform setPlatform={setPlatform} name="github" />
        <Platform setPlatform={setPlatform} name="google" />
      </div>
      <div className="flex-col w-[60%] h-full overflow-y-auto border-2 border-[#1c201e] flex items-center py-4 gap-4 overflow-y">
        <AddData platform={platform} />
        <Data platform={platform} />
        <Data />
        <Data />
        <Data />
      </div>
    </div>
  );
}

export default Main;
