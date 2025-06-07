// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_REACT_APP_API_KEY,
    authDomain: import.meta.env.VITE_REACT_APP_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_REACT_APP_PROJECT_ID,
    storageBucket: import.meta.env.VITE_REACT_APP_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_REACT_APP_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_REACT_APP_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export const messaging = getMessaging(app);


// Ask for permission and then get the token
export const requestPermissionAndGetToken = async () => {
    console.log("Requesting notification permission...");
    const permission = await Notification.requestPermission();
  
    if (permission === "granted") {
      try {
        const token = await getToken(messaging, {
          vapidKey: "BBk6ZbWluUhODY5MdlSSIGot8rc4oAvYoT928YbequPMyMSXCRLLYA-e4musdS-htOh6Oa99GftBB_-h14oqjck", 
        });
        console.log("FCM Token:", token);
        // Send token to backend
      } catch (err) {
        console.error("Error getting FCM token:", err);
      }
    } else {
      console.warn("Notification permission not granted");
    }
  };
  
  // Handle messages while app is in foreground
  export const handleForegroundMessage = onMessage(messaging, (payload) => {
    console.log("Foreground message received:", payload);
    // show in-app notification, toast, etc.
  });