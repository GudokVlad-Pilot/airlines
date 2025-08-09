"use client";

import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  User,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/adapters/clients/firebase";
import { useParams } from "next/navigation";

export default function LoginTest() {
  const params = useParams();

  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [unverifiedUser, setUnverifiedUser] = useState<User | null>(null);

  useEffect(() => {
    if (typeof params?.locale === "string") {
      auth.languageCode = params.locale;
    } else {
      auth.useDeviceLanguage();
    }
  }, [params]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser && firebaseUser.emailVerified ? firebaseUser : null);
      setUnverifiedUser(
        firebaseUser && !firebaseUser.emailVerified ? firebaseUser : null
      );
    });

    return () => unsubscribe();
  }, []);

  const handleAuth = async () => {
    try {
      await setPersistence(
        auth,
        rememberMe ? browserLocalPersistence : browserSessionPersistence
      );

      if (isRegistering) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await sendEmailVerification(userCredential.user);
        setMessage(
          "Registration successful. A verification email has been sent."
        );
      } else {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        if (!userCredential.user.emailVerified) {
          await signOut(auth);
          setMessage("Please verify your email before logging in.");
        } else {
          setMessage("Login successful!");
        }
      }
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setMessage("Logged out successfully.");
  };

  const handleResendVerification = async () => {
    if (unverifiedUser) {
      await sendEmailVerification(unverifiedUser);
      setMessage("Verification email resent.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();

      await setPersistence(
        auth,
        rememberMe ? browserLocalPersistence : browserSessionPersistence
      );

      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (!user.emailVerified) {
        setMessage("Logged in with Google. (Email verification not required)");
      } else {
        setMessage("Login successful!");
      }
    } catch (error: any) {
      setMessage(`Google login error: ${error.message}`);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h2>{isRegistering ? "Register" : "Login"}</h2>

      {user ? (
        <>
          <p>
            <strong>Logged in as:</strong> {user.email}
          </p>
          <button
            onClick={handleLogout}
            style={{ width: "100%", padding: 10, marginTop: 10 }}
          >
            Logout
          </button>
        </>
      ) : unverifiedUser ? (
        <>
          <p>
            Please verify your email: <strong>{unverifiedUser.email}</strong>
          </p>
          <button
            onClick={handleResendVerification}
            style={{ width: "100%", padding: 10 }}
          >
            Resend Verification Email
          </button>
          <button
            onClick={handleLogout}
            style={{ width: "100%", padding: 10, marginTop: 10 }}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", marginBottom: 10, padding: 8 }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", marginBottom: 10, padding: 8 }}
          />

          {!isRegistering && (
            <label style={{ display: "block", marginBottom: 10 }}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ marginRight: 6 }}
              />
              Remember Me
            </label>
          )}

          <button onClick={handleAuth} style={{ width: "100%", padding: 10 }}>
            {isRegistering ? "Register" : "Login"}
          </button>

          <button
            onClick={handleGoogleLogin}
            style={{
              width: "100%",
              padding: 10,
              marginTop: 10,
              backgroundColor: "#4285F4",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Continue with Google
          </button>

          <p style={{ marginTop: 10 }}>
            {isRegistering
              ? "Already have an account?"
              : "Don't have an account?"}{" "}
            <button
              onClick={() => setIsRegistering(!isRegistering)}
              style={{
                background: "none",
                border: "none",
                color: "blue",
                cursor: "pointer",
              }}
            >
              {isRegistering ? "Login" : "Register"}
            </button>
          </p>
        </>
      )}

      {message && <p style={{ marginTop: 10 }}>{message}</p>}
    </div>
  );
}
