/**
 * =============================================================================
 * FLASHCART DOCS — Firebase Configuration
 * =============================================================================
 * 
 * Lightweight Firebase setup for the documentation portal.
 * Only needs Firestore for admin content management.
 * No RTDB, no ImgBB, no OneSignal.
 * 
 * Developer: Rizwan Rahim Chowdhury
 * =============================================================================
 */

import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { 
  getFirestore, collection, doc, getDoc, getDocs, 
  setDoc, updateDoc, deleteDoc, addDoc, query, where, 
  orderBy, limit, onSnapshot, serverTimestamp, Timestamp 
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDe1BG7CQbG1zRocxCP9naJfi-JsTit3iw",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "flashcart-bd.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "flashcart-bd",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "flashcart-bd.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "240971637959",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:240971637959:web:ef506397d505dac1accae2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
export { 
  onAuthStateChanged, collection, doc, getDoc, getDocs, 
  setDoc, updateDoc, deleteDoc, addDoc, query, where, 
  orderBy, limit, onSnapshot, serverTimestamp, Timestamp 
};

/* Admin Password */
export const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "RahimRahim";

/* Application URLs */
export const APP_URLS = {
  main: import.meta.env.VITE_APP_URL || "https://flashcart.bsdc.info.bd",
  partner: import.meta.env.VITE_PARTNER_URL || "https://partner.flashcart.bsdc.info.bd",
  docs: import.meta.env.VITE_DOCS_URL || "https://docs.flashcart.bsdc.info.bd"
};

/* Developer Credits */
export const CREDITS = {
  developer: import.meta.env.VITE_DEVELOPER_NAME || "Rizwan Rahim Chowdhury",
  poweredBy: import.meta.env.VITE_POWERED_BY || "Bangladesh Software Development Community",
  poweredByUrl: import.meta.env.VITE_POWERED_BY_URL || "https://www.bsdc.info.bd"
};

/* Docs Collection Reference */
export const docsCollection = collection(db, 'docs');
