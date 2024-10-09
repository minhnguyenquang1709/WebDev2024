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
      <div className="flex flex-col items-center w-full p-[4vw] transition duration-300 opacity-100">
        <div className="form-title text-center text-black text-2xl font-semibold mt-10 mb-5">
          <span>Sign In</span>
        </div>
        <div className="w-full">
          <div className="relative">
            <input
              type="text"
              className="w-full h-14 p-4 my-2 text-black bg-white/20 rounded-lg outline-none backdrop-blur-md shadow-lg"
              placeholder="Enter user name"
              ref={usernameRef}
              required
            />
            <i className="bx bx-user absolute top-1/2 right-4 transform -translate-y-1/2 text-black"></i>
          </div>
          <div className="relative">
            <input
              type="password"
              className="w-full h-14 p-4 my-2 text-black bg-white/20 rounded-lg outline-none backdrop-blur-md shadow-lg"
              placeholder="Enter password"
              ref={passwordRef}
              required
            />
            <i className="bx bx-lock-alt absolute top-1/2 right-4 transform -translate-y-1/2 text-black"></i>
          </div>
          <div className="flex justify-end gap-1">
            <Link to="#" className="text-sm text-black hover:underline">
              Forgot password?
            </Link>
          </div>
          <form onSubmit={handleSubmit}>
            <button type="submit">Log In</button>
          </form>
        </div>

        <div className="flex gap-5 mt-5">
          <AiOutlineGoogle className="w-10 h-10 flex items-center justify-center bg-white/20 rounded-full shadow-md hover:scale-90 transition" />
          <AiOutlineFacebook className="w-10 h-10 flex items-center justify-center bg-white/20 rounded-full shadow-md hover:scale-90 transition" />
          <AiOutlineGithub className="w-10 h-10 flex items-center justify-center bg-white/20 rounded-full shadow-md hover:scale-90 transition" />
          <AiOutlineTwitter className="w-10 h-10 flex items-center justify-center bg-white/20 rounded-full shadow-md hover:scale-90 transition" />
        </div>
      </div>
    </div>
  );
};

export default Login;
