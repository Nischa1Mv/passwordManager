import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";
import { auth } from "./auth/firebase";
import { useEffect, useState } from "react";
import Main from "./Main";
import Loading from "./loading";

function Home() {
  const navigate = useNavigate();
  const [isUser, setIsUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
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
        <div className="text-5xl  text-[#00f0ff]  font-amsterdam">
          Password Manager
        </div>
        {isUser && (
          <button
            className={` absolute top-7 right-7 border-[#b7f1d4] hover:text-[#050a14] hover:bg-[#00f0ff] hover:border-none font-bold px-4 text-lg text- py-1 text-[#00f0ff] border-2 rounded-xl transition-transform duration-200 cursor-pointer ${
              isLoading ? "opacity-50 cursor-not-allowed " : "hover:scale-105  "
            }`}
            type="button"
            onClick={logOut}
          >
            {isLoading ? "Loggout In..." : "Logout"}
          </button>
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
