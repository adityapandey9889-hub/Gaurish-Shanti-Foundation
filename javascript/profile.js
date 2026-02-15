import { auth, db } from "./firebase.js";

import {
  onAuthStateChanged,
  sendEmailVerification,
  deleteUser,
  signOut
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

import {
  doc,
  getDoc,
  updateDoc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";


// ===============================
// AUTH STATE CHECK
// ===============================

onAuthStateChanged(auth, async (user) => {

  if (!user) {
    window.location.href = "auth.html";
    return;
  }

  try {

    // Load user data from Firestore
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {

      const data = docSnap.data();

      // Fill profile info
      document.getElementById("profileName").innerText = data.name;
      document.getElementById("profileNameInput").value = data.name;
      document.getElementById("profileEmail").value = data.email;
      document.getElementById("profilePhone").value = data.phone;
      document.getElementById("profileAddress").value = data.address;

      // Handle createdAt safely
      if (data.createdAt && data.createdAt.seconds) {
        document.getElementById("memberSince").innerText =
          "Member since " +
          new Date(data.createdAt.seconds * 1000).toDateString();
      }

      // Avatar Initial
      document.getElementById("avatarInitial").innerText =
        data.name.charAt(0).toUpperCase();
    }

    // Email Verification Status
    const emailStatus = document.getElementById("emailStatus");

    if (user.emailVerified) {
      emailStatus.innerText = "Email Verified";
      emailStatus.classList.add("verified");
    } else {
      emailStatus.innerText = "Email Not Verified";
      emailStatus.classList.remove("verified");
    }

  } catch (error) {
    console.error("Error loading profile:", error);
  }

});


// ===============================
// UPDATE PROFILE
// ===============================

document.getElementById("profileForm")
  .addEventListener("submit", async (e) => {

    e.preventDefault();

    const user = auth.currentUser;

    const name = document.getElementById("profileNameInput").value;
    const phone = document.getElementById("profilePhone").value;
    const address = document.getElementById("profileAddress").value;

    try {

      await updateDoc(doc(db, "users", user.uid), {
        name,
        phone,
        address
      });

      // Update UI instantly
      document.getElementById("profileName").innerText = name;
      document.getElementById("avatarInitial").innerText =
        name.charAt(0).toUpperCase();

      alert("Profile updated successfully!");

    } catch (error) {
      alert(error.message);
    }
  });


// ===============================
// VERIFY EMAIL
// ===============================

document.getElementById("verifyEmailBtn")
  .addEventListener("click", async () => {

    const user = auth.currentUser;

    try {
      await sendEmailVerification(user);
      alert("Verification email sent! Please check your inbox.");

      // Reload to update verification status later
      setTimeout(() => {
        location.reload();
      }, 2000);

    } catch (error) {
      alert(error.message);
    }
  });


// ===============================
// LOGOUT
// ===============================

document.getElementById("logoutBtn")
  .addEventListener("click", async () => {

    await signOut(auth);
    window.location.href = "index.html";
  });


// ===============================
// DELETE ACCOUNT
// ===============================

document.getElementById("deleteAccountBtn")
  .addEventListener("click", async () => {

    const confirmDelete = confirm(
      "Are you sure you want to permanently delete your account?"
    );

    if (!confirmDelete) return;

    const user = auth.currentUser;

    try {

      await deleteDoc(doc(db, "users", user.uid));
      await deleteUser(user);

      alert("Account deleted successfully.");
      window.location.href = "index.html";

    } catch (error) {
      alert("Please re-login before deleting account.");
    }

  });
