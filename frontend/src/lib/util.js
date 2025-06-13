import toast from "react-hot-toast";

export function handleInputErrors({
  fullName,
  username,
  password,
  confirmPassword,
}) {
  if (!fullName || !username || !password || !confirmPassword) {
    toast.error("Please fill in all inputs");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not mtach");
    return false;
  }

  if (password.length < 8) {
    toast.error("Password must be at least 8 characters");
    return false;
  }

  return true;
}
