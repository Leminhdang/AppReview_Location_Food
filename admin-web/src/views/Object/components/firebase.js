import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Set the configuration for your app
// TODO: Replace with your app's config object
const firebaseConfig = {
  apiKey: "AIzaSyA-jKL_HoG4Ui1XIPVcjrgiBkzwcW_4hbM",
  authDomain: "reviewapp-f0b19.firebaseapp.com",
  databaseURL: "reviewapp-f0b19",
  storageBucket: "reviewapp-f0b19.appspot.com",
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
