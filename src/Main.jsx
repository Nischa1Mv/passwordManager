import Data from "./Data";
import Platform from "./Platform";
import AddData from "./AddData";
import { useEffect, useState } from "react";
import { getDocs, collection, getFirestore } from "firebase/firestore";
import { auth } from "./firebase";
import { decryptPassword } from "./Cypher";

const db = getFirestore();

function Main() {
  const user = auth.currentUser.uid;
  const [platform, setPlatform] = useState("steam");
  const [data, setData] = useState([]);
  // const [accounts, setAccounts] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      console.log("fetching data");
      try {
        const querySnapshot = await getDocs(
          collection(db, `users/${user}/${platform}`)
        );
        if (querySnapshot.empty) {
          console.log("No data available");
          setData([]);
          // setAccounts(false);
          return;
        }
        const account = querySnapshot.docs.map((doc) => {
          const docData = doc.data();
          // console.log(docData);
          const password = decryptPassword(docData.password);
          // console.log(password);
          // console.log(docData.email);
          return { email: docData.email, password: password };
        });
        setData(account);
        // console.log(data);

        // setAccounts(true);
      } catch (error) {
        console.log("Error getting documents: ", error);
      }
    };
    console.log(data);
    fetchData();
  }, [platform, user]);

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
        <div className="flex-col w-[60%] h-full  overflow-y-auto border-2 border-[#1c201e] flex items-center  py-4 gap-4">
          <div className="flex justify-center items-center text-4xl font-amsterdam mb-5">
            Your Accounts
          </div>{" "}
          <div className="">
            <div className="flex justify-center items-center mb-4">
              <AddData />
            </div>{" "}
          </div>
          {data.length === 0 && (
            <div className="bg-white text-black font-bold px-2">
              No Accounts Found
            </div>
          )}
          <div>
            {data &&
              data.map((item, index) => (
                <Data key={index} email={item.email} password={item.password} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
