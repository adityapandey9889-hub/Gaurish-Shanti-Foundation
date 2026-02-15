// Import Firebase core
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";

// Import Authentication
import { 
  getAuth 
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

// Import Firestore
import { 
  getFirestore 
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAbepzPpw3NjaeaW2x5WtVDCADTd0xT_Rk",
  authDomain: "gsf-backend.firebaseapp.com",
  projectId: "gsf-backend",
  storageBucket: "gsf-backend.firebasestorage.app",
  messagingSenderId: "775861340005",
  appId: "1:775861340005:web:039cbb7ebf16906d20838c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);

// Export services
export { auth, db };
