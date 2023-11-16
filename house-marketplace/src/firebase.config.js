// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyASyuidT0cnKJyJeGwPA23UyDJJl0UFW5M',
  authDomain: 'marketplace-20c2c.firebaseapp.com',
  projectId: 'marketplace-20c2c',
  storageBucket: 'marketplace-20c2c.appspot.com',
  messagingSenderId: '1045694002869',
  appId: '1:1045694002869:web:4f8cbea3f6af115b4d30fc',
  measurementId: 'G-9L59EMR5EQ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore();

/*
* ashernetz@gmail.com
* Jesus123!
* sDbUjVnjlVNUf6BVVxapjdOMfXA3
* */

