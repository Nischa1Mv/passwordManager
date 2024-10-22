import { signInWithEmailAndPassword } from "firebase/auth";
import { useState, useEffect, useReducer } from "react";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import InputWithLabel from "../custom Componets/inputWithLabel";

function Login() {
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
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
  const { email, password, error } = state;

  useEffect(() => {
    // const savedEmail = localStorage.getItem("email");
    // const savedPassword = localStorage.getItem("password");
    // if (savedEmail && savedPassword) {
    //   dispatchEvent({ type: "SET_EMAIL", payload: savedEmail });
    //   dispatchEvent({ type: "SET_PASSWORD", payload: savedPassword });
    //   setRememberMe(true);
    // }
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
      if (rememberMe) {
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
      } else {
        localStorage.removeItem("email");
        localStorage.removeItem("password");
      }
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
    } finally {
      setIsLoading(false);
    }
  };
  const guestAuth = () => {
    dispatchEvent({ type: "SET_EMAIL", payload: "guest@guest.com" });
    dispatchEvent({ type: "SET_PASSWORD", payload: "guest123" });
    setRememberMe(true);
  };
  return (
    <>
      <div className=" w-screen h-screen text-white flex items-center justify-center">
        <form
          onSubmit={AuthLogin}
          className="flex flex-col justify-center items-center gap-2"
        >
          <div className="text-4xl  font-amsterdam mb-3 text-[#60faad]">
            Login{" "}
          </div>

          <InputWithLabel
            label="Email"
            value={email}
            onChange={(e) =>
              dispatchEvent({ type: "SET_EMAIL", payload: e.target.value })
            }
            type="email"
          />

          <InputWithLabel
            label="Password"
            value={password}
            onChange={(e) =>
              dispatchEvent({ type: "SET_PASSWORD", payload: e.target.value })
            }
            type={isPasswordVisible ? "text" : "password"}
            isPasswordVisible={isPasswordVisible}
            setIsPasswordVisible={setIsPasswordVisible}
          />
          <div className=" mt-2 flex gap-2">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe((prev) => !prev)}
            />
            <span>Remember Me</span>
          </div>
          {error && (
            <>
              <div className="flex flex-col justify-end text-sm  items-center text-red-500">
                {" "}
                <div> Error Occured: {error}</div>{" "}
              </div>
            </>
          )}
          <div className="flex gap-2 items-center justify-center">
            <button
              className={`  px-6 py-1 mt-2 text-[#00f0ff] border-2 rounded-xl transition-transform duration-200 cursor-pointer ${
                isLoading ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
              }`}
              type="submit"
              disabled={isLoading || !state.email || !state.password}
            >
              {isLoading ? "Logging In..." : "Login"}
            </button>
            <button
              onClick={guestAuth}
              className={`  px-6  py-1 mt-2 text-[#00f0ff] border-2 rounded-xl transition-transform duration-200 cursor-pointer ${
                isLoading ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
              }`}
            >
              Guest Login
            </button>
          </div>
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
