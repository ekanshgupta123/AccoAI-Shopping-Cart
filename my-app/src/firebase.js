import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAc5FmYrcpYHaD-fJzUtdE7ZjsWSBN4oNc",
  authDomain: "shopping-cart-722c1.firebaseapp.com",
  projectId: "shopping-cart-722c1",
  storageBucket: "shopping-cart-722c1.appspot.com",
  messagingSenderId: "848326995631",
  appId: "1:848326995631:web:0b93111f92e2d9adabee5a",
  measurementId: "G-T9XCG11VVP"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

// Export each service you might need elsewhere in your application
export { app, db, analytics };
