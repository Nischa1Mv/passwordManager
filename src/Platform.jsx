import React from "react";
import image from "./steam.png";

function Platform({ setPlatform, name }) {
  // const platformImages = {
  //   steam: "./steam.png",
  //   github: "./github.png",
  //   google: "./google.png",
  // };

  const choosePlatform = () => {
    setPlatform(name);
    console.log(name);
  };

  return (
    <>
      {" "}
      <div
        className=" rounded-md w-full flex gap-4 px-2 py-1 border-[#1c201e] hover:bg-[#8f8c8c] cursor-pointer "
        onClick={() => {
          choosePlatform();
        }}
      >
        {" "}
        <div>
          <img src={image} width="28" />
          {/* <img src={platformImages[name]} width="28" alt={`${name} logo`} /> */}
        </div>
        <div className="font-bold text-lg">{name}</div>
        <div className="flex-1"></div>
        <div className="rounded-full border border-[#2b312e]  px-2 flex justify-center items-center">
          5
        </div>
      </div>
    </>
  );
}

export default Platform;
