import React, { useRef } from "react";
import {
  AiOutlineGoogle,
  AiOutlineFacebook,
  AiOutlineGithub,
  AiOutlineTwitter,
} from "react-icons/ai";
import { Link } from "react-router-dom";

const Login = ({ onLogin }) => {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    onLogin({
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    });
  };
  return (
    <div>
      <div class="login-form absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center w-full p-[4vw] transition duration-300 opacity-100">
        <div class="form-title text-center text-black text-2xl font-semibold mt-0 mb-3">
          <span>Sign In</span>
        </div>

        <div className="w-full">
          <form onSubmit={handleSubmit}>
            <div class="relative">
              <input
                type="text"
                className="w-full h-14 p-4 my-2 text-black bg-white/20 rounded-full outline-none backdrop-blur-md border-grey border-2 shadow-sm"
                placeholder="Enter user name"
                ref={usernameRef}
                required
              />
              <i class="bx bx-user absolute top-1/2 right-4 transform -translate-y-1/2 text-black"></i>
            </div>
            <div className="relative">
              <input
                type="password"
                className="w-full h-14 p-4 my-2 text-black bg-white/20 rounded-full outline-none backdrop-blur-md border-grey border-2 shadow-sm"
                placeholder="Enter password"
                ref={passwordRef}
                required
              />
              <i className="bx bx-lock-alt absolute top-1/2 right-4 transform -translate-y-1/2 text-black"></i>
            </div>

            <div class="flex justify-start ">
              <div class="flex items-center justify-start">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="ml-3 mr-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded "
                />
                <label for="remember-me" class=" block text-sm text-gray-900">
                  Remember me
                </label>
              </div>
              <Link to="#" className="ml-14 text-sm text-black hover:underline">
                Forgot password?
              </Link>
            </div>
            <button
              type="submit"
              className="flex items-center justify-center w-full h-14 mt-5 bg-lime-400 text-white rounded-full shadow-md transition duration-300 gap-2 hover:gap-4"
            >
              Login
            </button>
            <i class="bx bx-right-arrow-alt"></i>
          </form>
        </div>

        <div className="flex gap-4 mt-4">
          <AiOutlineGoogle className="w-8 h-8 bg-white/20 rounded-full shadow-lg hover:scale-95 hover:shadow-xl transition-all border-grey border-2 duration-300 ease-in-out" />
          <AiOutlineFacebook className="w-8 h-8 bg-white/20 rounded-full shadow-lg hover:scale-95 hover:shadow-xl transition-all border-grey border-2 duration-300 ease-in-out" />
          <AiOutlineGithub className="w-8 h-8 bg-white/20 rounded-full shadow-lg hover:scale-95 hover:shadow-xl transition-all border-grey border-2 duration-300 ease-in-out" />
          <AiOutlineTwitter className="w-8 h-8 bg-white/20 rounded-full shadow-lg hover:scale-95 hover:shadow-xl transition-all border-grey border-2 duration-300 ease-in-out" />
        </div>
      </div>
    </div>
  );
};

export default Login;
