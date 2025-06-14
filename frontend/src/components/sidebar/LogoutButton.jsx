import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";
import { useAuthContext } from "../../context/AuthContext";
const LogoutButton = () => {
  const { logout, loading } = useLogout();
  const { authUser } = useAuthContext();

  // const handleLogout = async (e) => {
  //   e.preventDefault();
  //   await logout();
  // };

  return (
    <div className="mt-auto flex gap-2 items-center ">
      <div className="avatar">
        <div className="w-6 rounded-full">
          <img src={authUser.profilePic} alt="user avatar" />
        </div>
      </div>
      {!loading ? (
        <BiLogOut
          className="w-6 h-6 text-white cursor-pointer"
          onClick={logout}
        />
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </div>
  );
};

export default LogoutButton;
