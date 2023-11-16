import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { db } from '../firebase.config';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
const auth = getAuth();
export default class FireBaseUtil {
  static createUserWithEmailAndPassword(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  static SignInWithEmailAndPassword(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
}
