import Data from "./Data";
import Platform from "./Platform";
import AddData from "./AddData";
import { useEffect, useState } from "react";
import {
  getDocs,
  collection,
  getFirestore,
  deleteDoc,
} from "firebase/firestore";
import { auth } from "./auth/firebase";
import { decryptPassword } from "./Cypher";

const db = getFirestore();

function Main() {
  const user = auth.currentUser.uid;
  const [platform, setPlatform] = useState("Steam");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [adddetails, setAddDetails] = useState(false);
  const [addPlatform, setAddPlatform] = useState(false);

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
      setError("Error fetching data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [platform, user]);

  // Pass this function to AddData to trigger re-fetch
  const handleDataAdded = () => {
    fetchData();
  };
  const onPlatformAdded = () => {
    fetchData();
  };

  // delete data from the database
  const deleteData = async (email) => {
    try {
      setError(null);
      setLoading(true);
      const querySnapshot = await getDocs(
        collection(db, `users/${user}/${platform}`)
      );

      const docId = querySnapshot.docs.find(
        (doc) => doc.data().email === email
      );

      if (docId) {
        await deleteDoc(docId.ref);
        setError("Account deleted successfully");
        handleDataAdded();
      }
    } catch (error) {
      setError("Error deleting data. Please try again.");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
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
          <div className="flex justify-center items-center text-4xl font-amsterdam mb-5">
            Your Accounts
          </div>{" "}
          <div className="flex gap-4">
            <div className="w-full text-2xl font-amsterdam flex justify-center items-center mb-2">
              {" "}
              Add Your Details
            </div>
            <svg
              onClick={() => {
                setAddDetails(!adddetails);
              }}
              className={`transform transition-transform duration-300 ${
                adddetails ? "rotate-45" : "rotate-0"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e8eaed"
            >
              <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
            </svg>
          </div>
          {adddetails && (
            <>
              {" "}
              <div className="flex justify-center items-center  ">
                <AddData
                  platform={platform}
                  onDataAdded={handleDataAdded}
                  setAdddetails={setAddDetails}
                  addDetails={adddetails}
                />
              </div>
            </>
          )}
          <hr class="w-52 h-1 bg-[#FBFAF2] border-0 rounded-xl mt-4 mb-6 "></hr>
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
          <div className="flex flex-col gap-4">
            {!loading &&
              data.map((item, index) => (
                <Data
                  deleteData={deleteData}
                  key={index}
                  email={item.email}
                  password={item.password}
                  username={item.username}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
