import React, { useEffect } from "react";
// import image from "./steam.png";

function Platform({
  deletePlatform,
  setPlatform,
  name,
  platform,
  accountCount = 0,
}) {
  // const platformImages = {
  //   steam: "./steam.png",
  //   github: "./github.png",
  //   google: "./google.png",
  // };

  const choosePlatform = () => {
    setPlatform(platform);
    console.log(name, "is selected");
  };

  return (
    <>
      <div
        className={`flex gap-4 border rounded w-full py-1 px-5 platformData hover:bg-[#dac343] cursor-pointer text-black
  ${name === platform ? "bg-[#dac343]" : ""}
`}
        onClick={choosePlatform}
      >
        {" "}
        <div className="flex gap-4 px-2 py-1 cursor-pointer font-roboto text-lg items-center">
          <div className="flex justify-center items-center">
            <svg
              className="rounded-full"
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
            >
              <path d="M9.406 17.183c.431-1.025-.05-2.206-1.076-2.637l-1.762-.741c.331-.125.654-.182.982-.183 1.518 0 2.765 1.236 2.779 2.754.014 1.538-1.217 2.792-2.753 2.806-1.159.005-2.138-.684-2.571-1.665l1.763.741c1.027.432 2.207-.05 2.638-1.075zm-9.406-17.183v11.043l5.585 2.349c.596-.39 1.283-.599 2.046-.583l3.017-4.221c.048-2.541 2.122-4.588 4.674-4.588 2.583 0 4.678 2.094 4.678 4.677 0 2.581-2.098 4.703-4.732 4.675l-4.115 3.067-.009.004c-.012 1.962-1.593 3.558-3.561 3.577-1.777.015-3.234-1.249-3.56-2.895l-4.023-1.692v8.587h24v-24h-24zm15.322 11.857c-1.752 0-3.179-1.427-3.179-3.18 0-1.753 1.427-3.179 3.179-3.179 1.753 0 3.179 1.426 3.179 3.179s-1.425 3.18-3.179 3.18zm0-.779c1.325 0 2.401-1.077 2.401-2.401 0-1.323-1.076-2.401-2.401-2.401-1.324 0-2.401 1.078-2.401 2.401 0 1.324 1.078 2.401 2.401 2.401z" />
            </svg>
            {/* <img src={image} width="28" /> */}
            {/* <img src={platformImages[name]} width="28" alt={`${name} logo`} /> */}
          </div>
          <div className="font-bold text-lg">{platform}</div>
          <div className="flex-1"></div>
          <div
            className="flex justify-center items-center"
            onClick={(e) => {
              e.stopPropagation();
              deletePlatform(platform);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="22px"
              fill="#00000"
            >
              <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
            </svg>
          </div>
        </div>
        <div className="flex-1"></div>
        <div className="text-2xl underline border-[#2b312e] text-black  px-2 flex justify-center items-center">
          {accountCount}
        </div>
      </div>
    </>
  );
}

export default Platform;
