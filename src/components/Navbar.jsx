import React from "react";
import { UserAuth } from "../context/AuthContext";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { user, googleSignOut } = UserAuth();
  const location = useLocation();

  const handleSignOut = async () => {
    try {
      await googleSignOut();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="">
    <div className="flex flex-row justify-between items-center p-4 md:p-4">
      <div className="">
        <div className="">
          <img
            src="https://seeklogo.com/images/N/NASA-logo-9411797223-seeklogo.com.png"
            alt=""
            className="h-10"
          />
        </div>
      </div>
      <div className="">
        {user?.displayName ? (
          <div className="flex flex-row gap-3">
            <div className="hidden md:flex flex-row items-center gap-3 bg-black border border-white p-2 pr-5 rounded-full">
              <img
                src={user.photoURL}
                alt="User"
                className="w-10 h-10 rounded-full"
              />
              <h1 className="text-md">Welcome, {user.displayName}!</h1>
            </div>
            <button
              onClick={handleSignOut}
              className="bg-black border border-white hover:bg-white hover:text-black font-semibold text-white py-2 px-6 rounded-full"
            >
              Sign Out
            </button>
          </div>
        ) : (
          location.pathname !== "/sign-in" && (
            <Link
              to="/sign-in"
              className="bg-black border border-white hover:bg-white hover:text-black font-semibold text-white py-2 px-6 rounded-full"
            >
              Sign In with Google
            </Link>
          )
        )}
      </div>
    </div>
    {user?.displayName ? (
    <div className="">
    <div className="md:hidden flex flex-row items-center gap-3 bg-black border border-white p-2 pr-5 rounded-full mx-2 mb-4" >
              <img
                src={user.photoURL}
                alt="User"
                className="w-10 h-10 rounded-full"
              />
              <h1 className="text-md">Welcome, {user.displayName}!</h1>
            </div>
    </div>
    ) : ("")}
    </div>

  );
};

export default Navbar;
