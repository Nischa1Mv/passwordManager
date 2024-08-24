import { useState } from "react";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [ispasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState(null);
  const AuthSignup = async (e) => {
    e.preventDefault();
    if (password !== cpassword) {
      alert("passwords do not match");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        setError(error);
        console.log(error.code, error.message);
      });
  };
  return (
    <div className=" w-screen h-screen text-white flex items-center justify-center">
      <form className="flex flex-col justify-center items-center gap-2">
            {error && (
          <>
            <div className="flex flex-col justify-center items-center text-yellow-300">
              {" "}
              <div> Error Occured: {error.message}</div>{" "}
              <div> Error code: {error.code}</div>
            </div>
          </>
        )}
        <div className="text-xl">Signup</div>
        <div className="gap-2 flex justify-center items-center">
          <span className="">Email</span>
          <input
            className="border-2 border-[#1c201e] bg-transparent focus:outline-none px-2"
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center items-center gap-2">
          <span>Password</span>
          <input
            className="border-2 border-[#1c201e] bg-transparent focus:outline-none px-2"
            type={`${ispasswordVisible ? "text" :"password"}`}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
              <button type="button" onClick={(e) => setIsPasswordVisible(!ispasswordVisible)}>
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
        <div className="flex gap-1">
          <input type="checkbox" />
          <p>terms and conditons</p>
        </div>
        <button className="px-2 py-1 border-2 rounded-xl " onClick={AuthSignup}>
          Submit
        </button>
        <div>
          already have an account ?{" "}
          <span
            className="text-amber-200 underline cursor-pointer"
            onClick={() => {
              
              navigate("/login");
            }}
          >
            Login
          </span>
        </div>
      </form>
    </div>
  );
}

export default Signup;
