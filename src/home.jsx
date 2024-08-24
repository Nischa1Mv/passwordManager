import SearchBar from "./SearchBar";

import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { useEffect, useState } from "react";
import Main from "./Main";

function Home() {
  const [isUser, setIsUser] = useState(auth.currentUser);
  useEffect;

  const logOut = () => {
    auth.signOut().then(() => {
      console.log("logged out");
      setIsUser(auth.currentUser);
    });
  };
  const navigate = useNavigate();
  return (
    <>
      <div className=" text-white  w-full h-screen flex flex-col  pt-10 items-center gap-4 relative px-4 py-4">
        <div className="text-5xl  font-amsterdam">Password Manager</div>
        {isUser ? (
          <>
            <button
              className="absolute top-2 right-4 border-2 px-2  rounded-xl  "
              onClick={logOut}
            >
              logout
            </button>
          </>
        ) : (
          <>
            {" "}
            <button
              className="absolute top-2 right-4 border-2 px-2 rounded-xl  "
              onClick={() => navigate("/login")}
            >
              login
            </button>
          </>
        )}

        <div>
          <SearchBar />{" "}
        </div>

        <Main />
      </div>
    </>
  );
}

export default Home;
