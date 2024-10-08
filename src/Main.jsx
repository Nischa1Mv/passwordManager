import Data from "./Data";
import Platform from "./Platform";
import AddData from "./AddData";
import { useEffect, useState } from "react";
import { getDocs, collection, getFirestore } from "firebase/firestore";
import { auth } from "./auth/firebase";
import { decryptPassword } from "./Cypher";

const db = getFirestore();

function Main() {
  const user = auth.currentUser.uid;
  const [platform, setPlatform] = useState("Steam");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false); // Add loading state
  const [error, setError] = useState(null); // Add error state for better UX

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const querySnapshot = await getDocs(
        collection(db, `users/${user}/${platform}`)
      );
      if (querySnapshot.empty) {
        setData([]);
        setLoading(false);
        return;
      }
      const account = querySnapshot.docs.map((doc) => {
        const docData = doc.data();
        const password = decryptPassword(docData.password);
        return {
          email: docData.email,
          password: password,
          username: docData.username,
        };
      });
      setData(account);
    } catch (error) {
      setError("Error fetching data. Please try again."); // Set error message
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchData();
  }, [platform, user]);

  // Pass this function to AddData to trigger re-fetch
  const handleDataAdded = () => {
    fetchData();
  };

  return (
    <>
      <div className="flex w-full h-[81vh] gap-1">
        <div className="border-2 w-[40%] h-full border-[#1c201e] flex flex-col gap-2 py-2 px-4 items-center">
          <div className="flex justify-center items-center text-4xl font-amsterdam mb-5">
            Platforms
          </div>{" "}
          <Platform
            setPlatform={setPlatform}
            platform={platform}
            name="Steam"
          />
          <Platform
            setPlatform={setPlatform}
            platform={platform}
            name="Github"
          />
          <Platform
            setPlatform={setPlatform}
            platform={platform}
            name="Google"
          />
        </div>

        <div className="flex-col w-[60%]  overflow-y-auto border-2 border-[#1c201e] flex items-center py-4 ">
          <div className="flex justify-center items-center text-4xl font-amsterdam mb-8">
            Your Accounts
          </div>{" "}
          <div className="flex justify-center items-center ">
            <AddData platform={platform} onDataAdded={handleDataAdded} />
          </div>
          <hr class="w-52 h-1 bg-[#FBFAF2] border-0 rounded-xl md:my-10 "></hr>
          {/* Display loading message or spinner */}
          {loading && (
            <div className="bg-white text-black font-bold px-2">
              Loading accounts...
            </div>
          )}
          {/* Show error message if there is one */}
          {error && (
            <div className="bg-red-500 text-white font-bold px-2">{error}</div>
          )}
          {/* No Accounts Found */}
          {!loading && data.length === 0 && !error && (
            <div className="bg-white text-black font-bold px-2">
              No Accounts Found
            </div>
          )}
          {/* Display Data */}
          <div>
            {!loading &&
              data.map((item, index) => (
                <Data key={index} email={item.email} password={item.password} username={item.username} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
