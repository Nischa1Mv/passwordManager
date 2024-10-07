import { useReducer, useState } from "react";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import InputWithLabel from "../custom Componets/inputWithLabel";

function Signup() {
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isCPasswordVisible, setIsCPasswordVisible] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const initialState = {
    email: "",
    password: "",
    confirm_password: "",
    error: null,
    isLoggedIn: false,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_EMAIL":
        return { ...state, email: action.payload };
      case "SET_PASSWORD":
        return { ...state, password: action.payload };
      case "SET_CONFIRM_PASSWORD":
        return { ...state, confirm_password: action.payload };
      case "SIGNUP_SUCCESS":
        return { ...state, isLoggedIn: true, error: null };
      case "SIGNUP_FAILURE":
        return { ...state, error: action.payload };
      case "LOGOUT":
        return initialState;
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { email, password, confirm_password, error } = state;

  const AuthSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!isTermsAccepted) {
      dispatch({
        type: "SIGNUP_FAILURE",
        payload: "You must accept the terms.",
      });
      setIsLoading(false);
      return;
    }

    if (password !== confirm_password) {
      dispatch({ type: "SIGNUP_FAILURE", payload: "Passwords do not match." });
      setIsLoading(false);
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      dispatch({ type: "SIGNUP_SUCCESS" });
      navigate("/");
    } catch (error) {
      let errorMessage = error.message;
      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "Email already in use";
          break;
        case "auth/weak-password":
          errorMessage = "Password is too weak";
          break;
        default:
          errorMessage = error.message;
      }
      dispatch({ type: "SIGNUP_FAILURE", payload: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen text-white flex items-center justify-center">
      <form
        className="flex flex-col justify-center items-center gap-2"
        onSubmit={AuthSignup}
      >
        <div className="text-3xl font-amsterdam mb-3">Signup</div>

        <InputWithLabel
          label="Email"
          value={email}
          onChange={(e) =>
            dispatch({ type: "SET_EMAIL", payload: e.target.value })
          }
          type="email"
        />
        <InputWithLabel
          label="Password"
          value={password}
          onChange={(e) =>
            dispatch({ type: "SET_PASSWORD", payload: e.target.value })
          }
          type={isPasswordVisible ? "text" : "password"}
          isPasswordVisible={isPasswordVisible}
          setIsPasswordVisible={setIsPasswordVisible}
        />
        <InputWithLabel
          label="Confirm Password"
          value={confirm_password}
          onChange={(e) =>
            dispatch({ type: "SET_CONFIRM_PASSWORD", payload: e.target.value })
          }
          type={isCPasswordVisible ? "text" : "password"}
          isPasswordVisible={isCPasswordVisible}
          setIsPasswordVisible={setIsCPasswordVisible}
        />

        <div className="flex items-center gap-1 mt-3">
          <input
            type="checkbox"
            checked={isTermsAccepted}
            onChange={() => setIsTermsAccepted(!isTermsAccepted)}
          />
          <p>I Agree to the Terms and Conditions</p>
        </div>
        {error && (
          <div className="flex flex-col justify-center items-center text-red-500">
            <div>Error Occurred: {error}</div>
          </div>
        )}
        <button
          className={`px-6 py-1 mt-2 border-2 rounded-xl transition-transform duration-200 cursor-pointer ${
            isLoading ? "opacity-50 " : "hover:scale-105"
          }`}
          type="submit"
          disabled={isLoading || !isTermsAccepted || !email || !password}
        >
          {isLoading ? "Logging In..." : "Submit"}
        </button>

        <div>
          Already have an account?{" "}
          <span
            className="text-amber-200 cursor-pointer mt-1"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </div>
      </form>
    </div>
  );
}

export default Signup;
