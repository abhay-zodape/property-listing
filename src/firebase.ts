import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyASg7lzuZoHQu4oeVEAsnh2StvRPuhEivI",
  authDomain: "property-listing-deaa8.firebaseapp.com",
  projectId: "property-listing-deaa8",
  storageBucket: "property-listing-deaa8.appspot.com",
  messagingSenderId: "241099324390",
  appId: "1:241099324390:web:32fb48924fff373ea33427",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
