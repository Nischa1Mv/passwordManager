import { useState } from "react";
import {
  doc,
  setDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db, auth } from "./firebase";
import { encryptPassword } from "./encrptPassword";

const AddData = ({ platform }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSave = async (event) => {
    event.preventDefault();

    try {
      const user = auth.currentUser;
      if (!user) {
        console.error("User not authenticated");
        return;
      }

      const userId = user.uid;
      const platformDocRef = doc(
        collection(db, "users", userId, "credentials"),
        platform
      );

      // Check if the account already exists
      const accountsQuery = query(
        collection(db, "users", userId, "credentials", platform, "accounts"),
        where("email", "==", email)
      );
      const querySnapshot = await getDocs(accountsQuery);

      if (!querySnapshot.empty) {
        console.error("An account with this email already exists");
        return;
      }

      const encryptedPassword = encryptPassword(password);

      // Add new account
      await setDoc(
        platformDocRef,
        {
          platform: platform,
          accounts: [
            {
              email: email,
              encryptedPassword: encryptedPassword,
            },
          ],
        },
        { merge: true }
      );

      console.log("Data saved successfully!");
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
            fill="#1c201e"
          >
            <path d="M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM480-240q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z" />
          </svg>
        </div>
      </div>
    </>
  );
};
export default AddData;
