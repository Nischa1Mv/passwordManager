import Data from "./Data";
import Platform from "./Platform";
import AddData from "./AddData";
import AddPlatform from "./AddPlatform";
import { useEffect, useState } from "react";
import {
  getDocs,
  doc,
  collection,
  getFirestore,
  deleteDoc,
  getDoc,
  updateDoc,
  deleteField,
} from "firebase/firestore";
import { auth } from "./auth/firebase";
import { decryptPassword } from "./Cypher";

const db = getFirestore();

function Main() {
  const user = auth.currentUser.uid;
  const [platform, setPlatform] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [Perror, setPError] = useState(null);

  const [adddetails, setAddDetails] = useState(false);
  const [addPlatform, setAddPlatform] = useState(false);

  const fetchPlatform = async () => {
    setLoading(true);
    setError(null);
    try {
      const userRef = doc(db, "users", user);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        setPlatform(Object.keys(userData));
      } else {
        console.log("No data found");
        setPError("No data found");
      }
    } catch (error) {
      setError("Error fetching data. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPlatform();
  }, []);

  const onPlatformAdded = () => {
    fetchPlatform();
  };

  // const fetchData = async () => {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     const querySnapshot = await getDocs(
  //       collection(db, `users/${user}/${platform}`)
  //     );
  //     if (querySnapshot.empty) {
  //       setData([]);
  //       setLoading(false);
  //       return;
  //     }
  //     const account = querySnapshot.docs.map((doc) => {
  //       const docData = doc.data();
  //       const password = decryptPassword(docData.password);
  //       return {
  //         email: docData.email,
  //         password: password,
  //         username: docData.username,
  //       };
  //     });
  //     setData(account);
  //   } catch (error) {
  //     setError("Error fetching data. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   // fetchData();
  // }, [platform, user]);

  // // Pass this function to AddData to trigger re-fetch
  // const handleDataAdded = () => {
  //   fetchData();
  // };

  // // delete data from the database
  const deletePlatform = async (platform) => {
    try {
      setPError(null);
      setLoading(true);

      const platformCollectionRef = collection(db, `users/${user}/${platform}`);

      const platformDocs = await getDocs(platformCollectionRef);

      const deletePromises = platformDocs.docs.map((doc) => deleteDoc(doc.ref));
      await Promise.all(deletePromises);

      const userRef = doc(db, "users", user);

      await updateDoc(userRef, {
        [platform]: deleteField(),
      });

      setPError("Platform deleted successfully");
      fetchPlatform();
    } catch (error) {
      setPError("Error deleting platform. Please try again.");
      console.error("Error deleting platform:", error);
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
          <div className="flex gap-4">
            <div className="w-full text-2xl font-amsterdam flex justify-center items-center mb-2">
              {" "}
              Add Platform
            </div>
            <svg
              onClick={() => {
                setAddPlatform(!addPlatform);
              }}
              className={`transform transition-transform duration-300 ${
                addPlatform ? "rotate-45" : "rotate-0"
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
          {addPlatform && (
            <>
              <AddPlatform onPlatformAdded={onPlatformAdded} />
            </>
          )}
          <hr class="w-52 h-1 bg-[#FBFAF2] border-0 rounded-xl mt-4 mb-6 "></hr>
          <div className="flex w-full  flex-col items-center gap-2">
            {/* Display platforms */}
            {loading ? (
              <div className="bg-white text-black font-bold px-2">
                Loading platforms...
              </div>
            ) : error ? (
              <div className="text-red-600">{Perror}</div>
            ) : platform.length > 0 ? (
              platform.map((platformName, index) => (
                <Platform
                  key={index}
                  name={platformName}
                  platform={platformName}
                  setPlatform={setPlatform}
                  deletePlatform={deletePlatform}
                />
              ))
            ) : (
              <div className="bg-white text-black font-bold px-2">
                No platforms available
              </div>
            )}
          </div>
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
          {/* {adddetails && (
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
          )} */}
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
          {/* <div className="flex flex-col gap-4">
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
          </div> */}
        </div>
      </div>
    </>
  );
}

export default Main;
