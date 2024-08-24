import React from "react";
import image from "./steam.png";

function Plalform() {
  const selectPlatform = () => {};
  return (
    <>
      {" "}
      <div
        className=" rounded-md w-full flex gap-4 px-2 py-1 border-[#1c201e] hover:bg-[#8f8c8c] cursor-pointer "
        onClick={() => {
          selectPlatform();
        }}
      >
        {" "}
        <div>
          <img src={image} width="28" />
        </div>
        <div className="font-bold text-lg">Steam</div>
        <div className="flex-1"></div>
        <div className="rounded-full border border-[#2b312e]  px-2 flex justify-center items-center">
          5
        </div>
      </div>
    </>
  );
}

export default Plalform;
