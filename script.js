import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

// =========================
// FIREBASE CONFIGURATION
// =========================

const firebaseConfig = {
  apiKey: "AIzaSyAeaCQsYoQlok0TNQ5yvYjZrN_7yD3hqRU",
  authDomain: "mubarak-builds.firebaseapp.com",
  projectId: "mubarak-builds",
  storageBucket: "mubarak-builds.firebasestorage.app",
  messagingSenderId: "875933101070",
  appId: "1:875933101070:web:234a8aa614868ace0de05f",
  measurementId: "G-13H30PDKXC",
};

// =========================
// INITIALIZE FIREBASE
// =========================

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

const db = getFirestore(app);

// =========================
// WHATSAPP CONTACT FORM
// =========================

function sendToWhatsApp(event) {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  const whatsappMessage = `Hello Mubarak,

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}`;

  const phoneNumber = "2349036346292";

  event.currentTarget.href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
}

// =========================
// GOOGLE SIGN-IN
// =========================

document.getElementById("googleLogin").addEventListener("click", async () => {
  try {
    const result = await signInWithPopup(auth, provider);

    const user = result.user;

    console.log("Signed in successfully!");
    console.log("Name:", user.displayName);
    console.log("Email:", user.email);
    console.log("Profile photo:", user.photoURL);

    alert(`Welcome, ${user.displayName}!`);
  } catch (error) {
    console.error("Google Sign-In Error:", error);

    alert("Google Sign-In failed. Please try again.");
  }
});

// =========================
// SUBMIT REVIEW
// =========================

document.getElementById("submitReview").addEventListener("click", async () => {
  // Check if user is signed in
  const user = auth.currentUser;

  if (!user) {
    alert("Please sign in with Google before submitting a review.");
    return;
  }

  // Get review text
  const reviewText = document.getElementById("reviewText").value.trim();

  // Get selected rating
  const selectedRating = document.querySelector('input[name="rating"]:checked');

  // Check review
  if (!reviewText) {
    alert("Please write a review.");
    return;
  }

  // Check rating
  if (!selectedRating) {
    alert("Please select a rating.");
    return;
  }

  const rating = Number(selectedRating.value);

  try {
    // Save review to Firestore
    await addDoc(collection(db, "reviews"), {
      name: user.displayName,

      photo: user.photoURL,

      review: reviewText,

      rating: rating,

      date: new Date().toISOString(),
    });

    // Success message
    alert("Review submitted successfully!");

    // Clear review box
    document.getElementById("reviewText").value = "";

    // Clear stars
    document.querySelectorAll('input[name="rating"]').forEach((input) => {
      input.checked = false;
    });
  } catch (error) {
    console.error("Error submitting review:", error);

    alert("Something went wrong while submitting your review.");
  }
});
