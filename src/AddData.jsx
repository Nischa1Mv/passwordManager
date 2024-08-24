import { useState } from "react";

const AddData = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const Handlesave = (event) => {
    event.preventDefault();
    console.log("email", email, "password", password);
  };

  return (
    <>
      <div className="flex gap-2   ">
        <div>Email</div>
        <div>
          <input
            className="border-2 border-[#1c201e]  bg-transparent focus:outline-none px-2"
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>
        <div>Password</div>
        <div>
          <input
            className="border-2 border-[#1c201e] bg-transparent focus:outline-none px-2"
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>
        <div>
          <svg
            className="cursor-pointer"
            onClick={{ Handlesave }}
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#1c201e"
          >
            <path d="M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM480-240q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z" />
          </svg>
        </div>
      </div>
    </>
  );
};
export default AddData;
