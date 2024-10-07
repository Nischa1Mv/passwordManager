import { signInWithEmailAndPassword } from "firebase/auth";
import { useState, useEffect, useReducer } from "react";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const initialState = {
    email: "",
    password: "",
    error: null,
    isLoggedIn: false,
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_EMAIL":
        return { ...state, email: action.payload };
      case "SET_PASSWORD":
        return { ...state, password: action.payload };
      case "LOGIN_SUCCESS":
        return { ...state, isLoggedIn: true, error: null };
      case "LOGIN_FAILURE":
        return { ...state, error: action.payload };
      case "LOGOUT":
        return initialState;
      default:
        return state;
    }
  };
  const [state, dispatchEvent] = useReducer(reducer, initialState);
  const { error } = state;
  useEffect(() => {
    if (auth.currentUser) {
      navigate("/");
      console.log("user is logged in");
    }
  }, [navigate]);

  const AuthLogin = async (e) => {
    e.preventDefault();

    // for the button submitting state
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    const { email, password } = state;
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      dispatchEvent({ type: "LOGIN_SUCCESS" });
      navigate("/");
      console.log("user is logged in");
    } catch (error) {
      let errorMessage = error.message;
      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "Invalid Email";
          break;
        case "auth/user-not-found":
          errorMessage = "User not found";
          break;
        case "auth/invalid-credential":
          errorMessage = "Invalid Credential";
          break;

        case "auth/wrong-password":
          errorMessage = "Wrong Password";
          break;
        case "auth/too-many-requests":
          errorMessage = "Too many failed attempts. Please try again later.";
          break;
        default:
          errorMessage = "An unexpected error occurred. Please try again.";
          break;
      }
      dispatchEvent({ type: "LOGIN_FAILURE", payload: errorMessage });
      console.log(error.code, error.message);
    }
  };

  return (
    <>
      <div className=" w-screen h-screen text-white flex items-center justify-center">
        <form className="flex flex-col justify-center items-center gap-2">
          <div className="text-3xl  font-amsterdam mb-3">Login </div>
          <div className="gap-2 flex justify-center items-center">
            <span className="text-lg font-semibold mr-2">Email</span>
            <input
              className="border-2 border-[#1c201e]  bg-transparent focus:outline-none px-2"
              type="email"
              onChange={(e) =>
                dispatchEvent({ type: "SET_EMAIL", payload: e.target.value })
              }
            />
          </div>
          <div className="flex justify-center items-center gap-2">
            <span className="text-lg mr-2 font-semibold">Password</span>
            <input
              className="border-2 border-[#1c201e] bg-transparent focus:outline-none px-2"
              type={`${isPasswordVisible ? "text" : "password"}`}
              onChange={(e) =>
                dispatchEvent({
                  type: "SET_PASSWORD",
                  payload: e.target.value,
                })
              }
            />
            <button
              type="button"
              onClick={(e) => setIsPasswordVisible(!isPasswordVisible)}
            >
              {isPasswordVisible ? (
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
          {error && (
            <>
              <div className="flex flex-col justify-end text-sm  items-center text-red-500">
                {" "}
                <div> Error Occured: {error}</div>{" "}
              </div>
            </>
          )}

          <button
            className={`px-6 text- py-1 mt-2  border-2 rounded-xl transition-transform duration-200 cursor-pointer ${
              isLoading ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
            }`}
            type="button"
            onClick={AuthLogin}
            disabled={isLoading || !state.email || !state.password}
          >
            {isLoading ? "Logging In..." : "Login"}
          </button>
          <div className="mt-1">
            dont have an account ?{" "}
            <span
              className="text-amber-200 cursor-pointer"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Signup
            </span>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
