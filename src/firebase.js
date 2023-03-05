import { initializeApp } from "firebase/app";
import "firebase/auth";

const firebaseConfig = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG);

const app = initializeApp(firebaseConfig);

export const auth = app.auth();
export default app;
