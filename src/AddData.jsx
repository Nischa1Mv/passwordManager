import { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { auth } from "./auth/firebase";
import { encryptPassword } from "./Cypher";
const db = getFirestore();

const AddData = ({ platform, onDataAdded }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  //saving data to firestore
  const handleSave = async (event) => {
    event.preventDefault();

    try {
      const user = auth.currentUser;
      const userId = user.uid;
      const encryptedPassword = encryptPassword(password);
      const credentialsCollectionRef = collection(
        db,
        `users/${userId}/${platform}`
      );

      await addDoc(credentialsCollectionRef, {
        platform,
        email,
        password: encryptedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      console.log("Data saved successfully!");
      onDataAdded();
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <>
      <div className="flex gap-2   ">
        <div>Email</div>
        <div>
          <input
            required
            className="border-2 border-[#1c201e]  bg-transparent focus:outline-none px-2"
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>
        <div>Password</div>
        <div>
          <input
            required
            className="border-2 border-[#1c201e] bg-transparent focus:outline-none px-2"
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>
        <div>
          <svg
            className="cursor-pointer"
            onClick={handleSave}
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#1F51FF"
          >
            <path d="M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM480-240q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z" />
          </svg>
        </div>
      </div>
    </>
  );
};
export default AddData;
