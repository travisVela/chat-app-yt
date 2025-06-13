import React, { useState } from "react";
import { handleInputErrors } from "../lib/util";
import toast from "react-hot-toast";

const useSignup = () => {
  const [loading, setLoading] = useState(false);

  const signup = async ({ fullName, username, password, confirmPassword }) => {
    const newUser = { fullName, username, password, confirmPassword };
    const success = handleInputErrors({
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
      console.log(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, signup };
};

export default useSignup;
