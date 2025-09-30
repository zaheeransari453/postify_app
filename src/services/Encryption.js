
import CryptoJS from "crypto-js";

const secretKey = "Zaheer453";
export const handleEncrypt = (password) => {
  const encrypted = CryptoJS.AES.encrypt(password, secretKey).toString();
  // setEncryptedPassword(encrypted);
  return encrypted;
};

//Decrypt the password
export const handleDecrypt = (encryptedPassword) => {
  const bytes = CryptoJS.AES.decrypt(encryptedPassword, secretKey);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);
  // setDecryptedPassword(decrypted);
  return decrypted;
};
