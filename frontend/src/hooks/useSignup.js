import React, { useState } from "react";
import { handleSignupInputErrors } from "../lib/util";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async ({ fullName, username, password, confirmPassword }) => {
    const newUser = { fullName, username, password, confirmPassword };
    const success = handleSignupInputErrors({
      fullName,
      username,
      password,
      confirmPassword,
    });
    if (!success) return;

    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }
      // set signup info as logged in user
      localStorage.setItem("chat-user", JSON.stringify(data));

      // context gives permisson to acces pages. set in App.jsx
      setAuthUser(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, signup };
};

export default useSignup;
