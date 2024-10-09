import React, { useState } from "react";
import {} from "firebase/firestore";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth } from "./auth/firebase";
const db = getFirestore();

function AddPlatform({ onPlatformAdded }) {
  const [platform, setPlatform] = useState("");
  const [error, setError] = useState("");
  function platformCreatedACK() {
    setError("Platform is Added");
    setTimeout(() => {
      setError("");
    }, 5000);
  }

  const savePlatform = async (event) => {
    event.preventDefault();
    if (platform === "") {
      setError("Please enter the platform name");
      setTimeout(() => {
        setError("");
      }, 1000);
      return;
    }
    const userId = auth.currentUser.uid;
    const userRef = doc(db, "users", userId);

    try {
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const existingData = userSnap.data();
        if (!existingData[platform]) {
          await updateDoc(userRef, { [platform]: { accounts: {} } });
          console.log(`Platform ${platform} added for user ${userId}`);
          platformCreatedACK();
        } else {
          console.log(`Platform ${platform} already exists for user ${userId}`);
        }
      } else {
        await setDoc(userRef, { [platform]: { accounts: {} } });
        platformCreatedACK();
        console.log(`Platform ${platform} added for user ${userId}`);
      }

      if (onPlatformAdded) {
        onPlatformAdded(); // Trigger re-fetch
      }
    } catch (error) {
      setError("Error saving data");
      console.error("Error saving data", error);
    }
  };
  return (
    <>
      <span className="bg-red-600 px-2 text-sm font-medium ">{error}</span>
      <div className="flex  gap-4 mb-4">
        <input
          className="focus:outline-none bg-transparent border-2 border-[#1c201e] px-2  "
          type="text"
          placeholder="Platform Name"
          onChange={(event) => {
            setPlatform(event.target.value);
          }}
        />
        <div className="flex justify-center items-center">
          <svg
            className="cursor-pointer"
            onClick={savePlatform}
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
}

export default AddPlatform;
