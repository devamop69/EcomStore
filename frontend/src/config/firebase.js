import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBan-z_2R5LRnwBXsUCYFrAoezQ5JJFLL0",
  authDomain: "gaming-shop-f5937.firebaseapp.com",
  projectId: "gaming-shop-f5937",
  storageBucket: "gaming-shop-f5937.firebasestorage.app",
  messagingSenderId: "605104183924",
  appId: "1:605104183924:web:19ef1b53dd697a151ecf21",
  measurementId: "G-92RXKS4834"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;
