"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import app from "../utils/firebase.config"; // Import Firebase app
import toast from "react-hot-toast";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app); // ✅ Pass firebaseApp to getAuth

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  const signUp = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Signin error:", error.message);
      throw error;
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Signout error:", error.message);
      throw error;
    }
  };

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  // const phoneSignIn = async (phoneNumber) => {
  //   try {
  //     if (!window.recaptchaVerifier) {
  //       window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
  //         size: 'invisible',
  //         callback: (response) => {
  //           console.log('ReCaptcha Verified:', response);
  //         },
  //         'expired-callback': () => {
  //           console.warn('ReCaptcha expired. Please refresh.');
  //         }
  //       });
  //     }

  //     const appVerifier = window.recaptchaVerifier;
  //     const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
  //     window.confirmationResult = confirmationResult;

  //     console.log('OTP sent successfully');
  //     toast.success('OTP sent! Please check your phone.');
  //   } catch (error) {
  //     console.error('Phone sign-in error:', error.message);
  //     console.log('Phone sign-in error:', error);
  //     toast.error('Phone sign-in failed. Try again.');
  //     throw error;
  //   }
  // };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOutUser,
    googleSignIn,
    // phoneSignIn,
    setLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
