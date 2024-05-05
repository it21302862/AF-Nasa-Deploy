import React, { useEffect } from "react";
import GoogleButton from "react-google-button";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();
  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user != null) {
      navigate("/");
    }
  }, [user]);

  return (
    // <div className="w-full h-[90vh] flex items-center justify-center">
    //   <button
    //     onClick={handleGoogleSignIn}
    //     className="bg-black border border-white hover:bg-white hover:text-black font-semibold text-white py-2 px-6 rounded-full"
    //   >
    //     Log in with Google
    //   </button>
    // </div>


    <div className="p-2 xl:p-4">
        <div className="grid lg:grid-cols-2 rounded-[20px] min-h-[80vh] w-full bg-black bg-opacity-[80%] border border-gray-500 gap-8">
          <div className="h-full w-full">
          <img
            src="https://www.madrock1025.com/wp-content/uploads/2020/08/Conspiracy.Asteroid.Earth_-scaled.jpg"
            alt=""
            className="rounded-t-[20px] lg:rounded-l-[20px] lg:rounded-r-[0px] w-full h-full lg:h-full object-cover"
          />
          </div>
          <div className="h-full w-full flex flex-row items-center xl:pl-16 xl:pr-24 relative lg:py-8 p-2 py-4">
            <div className="flex flex-col gap-5 justify-start items-start">
              <div className="text-white text-md uppercase">
                NASA API Explorer
              </div>
              <div className="text-white text-[40px] text-start">
              WELCOME TO NASA API EXPLORER
              </div>
              <div className="text-start text-[16px]">
              Explore the universe with us by signing in and accessing NASA's vast collection of space data and imagery through our API. 
              From stunning images of galaxies and nebulae to valuable scientific data, the NASA API provides a gateway to the wonders of space exploration.
              </div>
              <div className="text-start text-blue-200 text-[16px]">Let's start your cosmic adventure! Sign in now and start exploring the universe with us.</div>
              <button
        onClick={handleGoogleSignIn}
        className="bg-black border border-white hover:bg-white hover:text-black font-semibold text-white py-2 px-6 rounded-full"
      >
        Authenticate with Google
      </button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default SignIn;
