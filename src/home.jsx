import SearchBar from "./SearchBar";
import AddData from "./AddData";
import Data from "./Data";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();
  return (
    <div className=" text-white w-full h-screen flex flex-col justify-center items-center gap-4 relative ">
      <button
        className="absolute top-2 right-4 border-2 px-2 rounded-xl  "
        onClick={() => {
          navigate("/login");
        }}
      >
        login
      </button>
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
