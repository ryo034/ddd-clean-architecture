import { firebaseAuth } from "./setup"
import { GoogleAuthProvider, User, onAuthStateChanged } from "firebase/auth"

export const firebaseAuthProvider = new GoogleAuthProvider()

export const getFirebaseCurrentUser = () => {
  return new Promise<User | null>((resolve, reject) => {
    onAuthStateChanged(
      firebaseAuth,
      (user) => resolve(user || null),
      (error) => reject(error)
    )
  })
}
