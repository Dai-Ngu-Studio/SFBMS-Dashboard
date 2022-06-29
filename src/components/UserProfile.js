import React from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { useSelector } from "react-redux";
import { MdOutlineCancel } from "react-icons/md";
import avatar from "../data/avatar.jpg";
import { useDispatch } from "react-redux";
import { clearStore } from "../features/user/userSlice";

const UserProfile = () => {
  const { setIsClicked, initialState } = useStateContext();
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  return (
    <div
      className="nav-item absolute right-1 top-16 bg-white 
      dark:bg-[#4264D] p-8 rounded-lg w-96"
    >
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
        <button
          type="button"
          onClick={() => setIsClicked(initialState)}
          className="text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray"
          style={{ color: "rgb(153, 171, 180)", borderRadius: "50%" }}
        >
          <MdOutlineCancel />
        </button>
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <img
          className="rounded-full h-24 w-24"
          src={avatar}
          alt="user-profile"
        />
        <div>
          <p className="font-semibold text-xl dark:text-gray-200">
            {user?.name.substring(0, user?.name.indexOf("@"))}
          </p>
          <p className="text-gray-500 text-sm dark:text-gray-400">
            {user?.isAdmin === 1 && "Administrator"}
          </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">
            {user?.email}
          </p>
        </div>
      </div>
      <div className="mt-5">
        <button
          type="button"
          style={{
            backgroundColor: "#03C9D7",
            color: "white",
            borderRadius: "10px",
          }}
          className="p-3 w-full hover:drop-shadow-xl"
          onClick={() => dispatch(clearStore("Logging out..."))}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
