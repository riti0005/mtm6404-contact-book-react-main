
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCCG1WTjPOkZ2fH0iWEn5IkAvEszSvgShs",
  authDomain: "contact-book-65705.firebaseapp.com",
  projectId: "contact-book-65705",
  storageBucket: "contact-book-65705.firebasestorage.app",
  messagingSenderId: "532127075003",
  appId: "1:532127075003:web:1d58ee781bd1d9a9b6b79e",
  measurementId: "G-28E3D5YQSL",
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
