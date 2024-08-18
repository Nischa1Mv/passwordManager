import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const AuthLogin = async (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
    signInWithEmailAndPassword(auth, email, password)
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
        <div className="text-xl">Login </div>
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

        <button className="px-2 py-1 border-2 rounded-xl " onClick={AuthLogin}>
          Submit
        </button>
        <div>
          dont have an account ?{" "}
          <span
            className="text-amber-200 underline cursor-pointer"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Signup
          </span>
        </div>
      </form>
    </div>
  );
}

export default Login;
