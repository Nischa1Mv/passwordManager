import SearchBar from "./SearchBar";
import AddData from "./AddData";
import Data from "./Data";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { useState } from "react";

function Home() {
  const [isUser, setIsUser] = useState(auth.currentUser);

  const logOut  = () => {
    auth.signOut().then(() => {
      console.log("logged out");
      setIsUser(auth.currentUser)
    });
  };
  const navigate = useNavigate();
  return (
    <div className=" text-white w-full h-screen flex flex-col justify-center items-center gap-4 relative ">
      {isUser ?  (
        <>
          <button
            className="absolute top-2 right-4 border-2 px-2 rounded-xl  "
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
            onClick={() => 
              navigate("/login")
            }
          >
            login
          </button>
        </>
      )}

      <SearchBar />
      <AddData />
      <div>
        {" "}
        <Data />
      </div>
    </div>
  );
}

export default Home;
