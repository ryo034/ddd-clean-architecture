import { initializeApp } from "firebase/app"
import { connectAuthEmulator, getAuth } from "firebase/auth"
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore"
import { connectStorageEmulator, getStorage } from "firebase/storage"
import { EnvHandler } from "~/infrastructure/env/handler"

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}

const firebase = initializeApp(firebaseConfig)
export const firebaseAuth = getAuth(firebase)
firebaseAuth.languageCode = "ja"
export const firebaseStorage = getStorage(firebase)

export const firebaseFirestore = getFirestore(firebase)

const firebaseAuthEmulatorHost = "http://localhost:9099"

const setupForEmulator = () => {
  connectAuthEmulator(firebaseAuth, firebaseAuthEmulatorHost, {
    disableWarnings: true
  })
  connectStorageEmulator(firebaseStorage, "localhost", 9199)
  connectFirestoreEmulator(firebaseFirestore, "localhost", 9000)
}

if (EnvHandler.isLocal()) {
  setupForEmulator()
}
