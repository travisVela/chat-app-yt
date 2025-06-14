import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { handleLoginInputErrors } from "../lib/util";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (username, password) => {
    const userLogin = { username, password };
    const success = handleLoginInputErrors(username, password);

    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userLogin),
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
  return { loading, login };
};

export default useLogin;

function handleInputErrors(username, password) {
  if (!username || !password) {
    toast.error("Please fill in all fields");
    return false;
  }

  return true;
}
