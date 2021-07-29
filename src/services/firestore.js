import firebase from 'firebase';
import 'firebase/firestore';
import { firebaseConfig } from '../configs/firebase';

firebase.initializeApp(firebaseConfig);

export const firebaseFirestore = firebase.firestore();
export const firebaseApp = firebase;
export const now = firebase.firestore.FieldValue.serverTimestamp;
