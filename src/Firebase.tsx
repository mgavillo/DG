// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

console.log(process.env.REACT_API_KEY)
const firebaseConfig = {

  apiKey: process.env.REACT_APP_API_KEY,

  authDomain: process.env.REACT_APP_AUTH_DOMAIN,

  databaseURL: process.env.REACT_APP_DB_URL,

  projectId: process.env.REACT_APP_PROJECT_ID,

  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,

  messagingSenderId: process.env.REACT_APP_MSG_SENDER_ID,

  appId: process.env.REACT_APP_ID,

  measurementId: process.env.REACT_APP_MEASUREMENT_ID

};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);