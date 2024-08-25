import CryptoJS from "crypto-js";

// Define a secret key for encryption and decryption
const secretKey = "your-secret-key"; // Replace with your actual secret key

// Encrypt function
const encryptPassword = (password) => {
  return CryptoJS.AES.encrypt(password, secretKey).toString();
  // Encrypts the password using AES encryption with the secret key and converts it to a string.
};

// Decrypt function
const decryptPassword = (encryptedPassword) => {
  const bytes = CryptoJS.AES.decrypt(encryptedPassword, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
  // Decrypts the encrypted password back to plain text using the secret key.
};

export { encryptPassword, decryptPassword };
