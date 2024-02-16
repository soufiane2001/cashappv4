import { initializeApp } from "firebase/app";
import { getAuth,initializeAuth,getReactNativePersistence} from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore} from "firebase/firestore";

import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBjLDBEA95cRcFIbCw3dMGLtVtTrFwD7p4",
  authDomain: "cashmanagement-c95df.firebaseapp.com",
  projectId: "cashmanagement-c95df",
  storageBucket: "cashmanagement-c95df.appspot.com",
  messagingSenderId: "574466416138",
  appId: "1:574466416138:web:cc5c27683a3b5ec2fa49f3"
};


export const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const db= getFirestore(app)

export const storage = getStorage(app);