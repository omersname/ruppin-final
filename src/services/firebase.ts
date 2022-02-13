import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDVXy-KrnMwsy7jqiI_vmUt_tgHTjckhiU',
  authDomain: 'ruppin-dev-app-task.firebaseapp.com',
  projectId: 'ruppin-dev-app-task',
  storageBucket: 'ruppin-dev-app-task.appspot.com',
  messagingSenderId: '631122623205',
  appId: '1:631122623205:web:91f9d4c868e17eb0c7320c',
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

export const sg = firebase.storage();
