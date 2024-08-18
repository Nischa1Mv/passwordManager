import { useState } from "react";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const AuthSignup = async (e) => {
    e.preventDefault();
    if (password !== cpassword) {
      alert("passwords do not match");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  return (
    <div className=" w-screen h-screen text-white flex items-center justify-center">
      <form className="flex flex-col justify-center items-center gap-2">
        <div className="text-xl">Signup</div>
        <div>
          <span className="">email</span>
          <input
            className="border-2 border-[#1c201e] bg-transparent focus:outline-none px-2"
            type="email"
            onClick={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <span>Password</span>
          <input
            className="border-2 border-[#1c201e] bg-transparent focus:outline-none px-2"
            type="password"
            onClick={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div>
          <span>Confirm Password</span>
          <input
            className="border-2 border-[#1c201e] bg-transparent focus:outline-none px-2"
            type="password"
            onClick={(e) => {
              setCPassword(e.target.value);
            }}
          />
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
