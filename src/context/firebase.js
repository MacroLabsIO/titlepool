import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA9FHcWhDbMjjsY_OBr-tVS5fyU8ckYSTI",
    authDomain: "titlepool-2b39f.firebaseapp.com",
    projectId: "titlepool-2b39f",
    storageBucket: "titlepool-2b39f.appspot.com",
    messagingSenderId: "643184571747",
    appId: "1:643184571747:web:c42bc4f98e0e20c5510f56",
    measurementId: "G-QT0FXP4VNF"
};

const app = initializeApp(firebaseConfig);
const firebase = getAuth(app);

export default firebase