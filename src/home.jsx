import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { useEffect, useState } from "react";
import Main from "./Main";
import Loading from "./loading";

function Home() {
  const navigate = useNavigate();
  const [isUser, setIsUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsUser(user);
      } else {
        navigate("/login");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [navigate]);

  const logOut = () => {
    auth.signOut().then(() => {
      console.log("logged out");
      setIsUser(null);
    });
  };
  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }

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
