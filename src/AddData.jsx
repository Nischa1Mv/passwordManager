import { useState } from "react";
import { getFirestore, setDoc, doc, updateDoc } from "firebase/firestore";
import { auth } from "./auth/firebase";
import { encryptPassword } from "./Cypher";

const db = getFirestore();

const AddData = ({ platform, onDataAdded, setAdddetails, addDetails }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const userId = auth.currentUser.uid;

  // Saving data to Firestore
  const handleSave = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setError("Please fill in both email and password.");
      setTimeout(() => setError(""), 500);
      return;
    }

    try {
      const encryptedPassword = encryptPassword(password);
      const platfomRef = doc(db, "users", userId, "platforms", platform);
      const userPlatformRef = doc(
        db,
        "users",
        userId,
        "platforms",
        platform,
        "accounts",
        username
      );
      await setDoc(userPlatformRef, {
        email: email,
        password: encryptedPassword,
        username: username,
      });

      setAdddetails(!addDetails);
      setError("Account details added successfully.");
      setTimeout(() => setError(""), 500);

      onDataAdded();
      setEmail("");
      setPassword("");
    } catch (error) {
      setError("Error saving data.");
      console.error("Error saving data:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="flex gap-4 justify-center items-center">
          <div>Username</div>
          <input
            placeholder="Username"
            required
            className="border-2  border-[#5c6b81] focus:border-[#73a8f8] bg-transparent focus:outline-none px-2"
            type="text"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
        </div>
        <div className="flex gap-4">
          <div>Email</div>
          <input
            placeholder="Email"
            required
            className="border-2 border-[#5c6b81] focus:border-[#73a8f8]  bg-transparent focus:outline-none px-2"
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <div>Password</div>
          <input
            required
            placeholder="Password"
            className="border-2 border-[#5c6b81]  focus:border-[#73a8f8] bg-transparent focus:outline-none px-2"
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <svg
            className="cursor-pointer"
            onClick={handleSave}
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#4690ff"
          >
            <path d="M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM480-240q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z" />
          </svg>
        </div>
        <div className="flex justify-center items-center text-yellow-300">
          {error}
        </div>
      </div>
    </>
  );
};

export default AddData;
