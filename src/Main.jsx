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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, `users/${user}/${platform}`)
        );
        if (querySnapshot.empty) {
          console.log("No data available");
          return;
        }
        const account = querySnapshot.docs.map((doc) => {
          const docData = doc.data();
          const password = decryptPassword(docData.password);
          return { email: docData.email, password: password };
        });
        setData(account);
      } catch (error) {
        console.log("Error getting documents: ", error);
      }
    };
    fetchData();
  }, [platform, user]);

  return (
    <div className="flex w-full h-[81vh] gap-1">
      <div className="border-2 w-[40%] h-full border-[#1c201e] flex flex-col gap-2 py-2 px-4 items-center ">
        <Platform setPlatform={setPlatform} name="steam" />
        <Platform setPlatform={setPlatform} name="github" />
        <Platform setPlatform={setPlatform} name="google" />
      </div>
      <div className="flex-col w-[60%] h-full overflow-y-auto border-2 border-[#1c201e] flex items-center py-4 gap-4 overflow-y">
        <AddData platform={platform} />
        <div className="">
          {data.map((item, index) => (
            <Data key={index} email={item.email} password={item.password} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Main;
