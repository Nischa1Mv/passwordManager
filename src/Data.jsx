import { useState } from "react";

const Data = (email) => {
  const [ispasswordVisible, setIsPasswordVisible] = useState(false);
  const [isCopiede, setIscopiede] = useState(false);
  const [isCopiedp, setIscopiedp] = useState(false);

  return (
    <>
      <div className="">
        <div>Username /Nickname</div>
        <div className="flex gap-4 mt-2 ">
          <div className="flex gap-2   ">
            <div>Email</div>
            <div className="">
              <input
                className="border border-[#1c201e]  bg-transparent focus:outline-none px-2 "
                type="email"
                value={Object.values(email)[0]}
                readOnly
              />
            </div>
            <div>
              <svg
                className="relative "
                cursor="pointer"
                onClick={(event) => {
                  event.preventDefault();
                  navigator.clipboard
                    .writeText(email)
                    .then(() => {
                      setIscopiede(true);
                      setTimeout(() => {
                        setIscopiede(false);
                      }, 500);
                    })
                    .catch((error) => {
                      console.error("Failed to copy: ", error);
                    });
                }}
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill=" #1c201e"
              >
                <path d="M480-120v-280q0-33 23.5-56.5T560-480h240q33 0 56.5 23.5T880-400v280h-80v-280h-80v200h-80v-200h-80v280h-80Zm-280 0q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h167q11-35 43-57.5t70-22.5q40 0 71.5 22.5T594-840h166q33 0 56.5 23.5T840-760v200h-80v-200h-80v120H280v-120h-80v560h200v80H200Zm280-640q17 0 28.5-11.5T520-800q0-17-11.5-28.5T480-840q-17 0-28.5 11.5T440-800q0 17 11.5 28.5T480-760Z" />
              </svg>
              {isCopiede && (
                <div className="animation-slideUp">
                  <Copied />
                </div>
              )}
            </div>
          </div>

          {/* password section */}
          <div className="flex gap-2 items-center ">
            <div>Password</div>
            {/* input part */}
            <div>
              <input
                className="border border-[#1c201e] relative bg-transparent focus:outline-none px-2"
                type={ispasswordVisible ? "text" : "password"}
                value={Object.values(email)[1]}
                readOnly
              />
            </div>
            {/* copy icon */}
            <div>
              <svg
                cursor="pointer"
                onClick={(event) => {
                  event.preventDefault();
                  navigator.clipboard
                    .writeText(email)
                    .then(() => {
                      setIscopiedp(true);
                      setTimeout(() => {
                        setIscopiedp(false);
                      }, 500);
                    })
                    .catch((error) => {
                      console.error("Failed to copy: ", error);
                    });
                }}
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#1c201e"
              >
                <path d="M480-120v-280q0-33 23.5-56.5T560-480h240q33 0 56.5 23.5T880-400v280h-80v-280h-80v200h-80v-200h-80v280h-80Zm-280 0q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h167q11-35 43-57.5t70-22.5q40 0 71.5 22.5T594-840h166q33 0 56.5 23.5T840-760v200h-80v-200h-80v120H280v-120h-80v560h200v80H200Zm280-640q17 0 28.5-11.5T520-800q0-17-11.5-28.5T480-840q-17 0-28.5 11.5T440-800q0 17 11.5 28.5T480-760Z" />
              </svg>
              {isCopiedp && <Copied />}
            </div>
            <div>
              <button onClick={() => setIsPasswordVisible(!ispasswordVisible)}>
                {ispasswordVisible ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="22px"
                    viewBox="0 -960 960 960"
                    width="22px"
                    fill="#1c201e"
                  >
                    <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="22px"
                    viewBox="0 -960 960 960"
                    width="22px"
                    fill="#1c201e"
                  >
                    <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Data;
const Copied = (text) => {
  return (
    <>
      <div className="absolute   text-white ">copied!</div>
    </>
  );
};
