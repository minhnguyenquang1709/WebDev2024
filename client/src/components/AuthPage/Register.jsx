import React, { useRef } from "react";

const Register = ({ onRegister }) => {
  const emailRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const rePassword = useRef(null);

  const checkPassword = (pwd, rePwd) => {
    if (pwd != rePwd) {
      alert("Passwords do not match, please check again");
      return;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    checkPassword(passwordRef.current.value, rePassword.current.value);

    onRegister({
      email: emailRef.current.value,
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    });
  };

  return (
    <div>
      <div className="flex flex-col items-center w-full p-[4vw] transition duration-300">
        <div className="form-title text-center text-black text-2xl font-semibold -mt-8 mb-4">
          <span>Create Account</span>
        </div>

        <div className="w-full">
          <div className="relative">
            <input
              type="email"
              className="w-full h-14 p-4 my-2 text-black bg-white/20 rounded-full outline-none backdrop-blur-md border-grey border-2 shadow-sm"
              placeholder="Email"
              ref={emailRef}
              required
            />
          </div>

          {/* <div className="relative">
                        <input
                            type="profilename"
                            className="w-full h-14 p-4 my-2 text-black bg-white/20 rounded-full outline-none backdrop-blur-md border-grey border-2 shadow-sm"
                            placeholder="Enter profile name"
                            ref={usernameRef}
                            required
                        />
                    </div> */}

          <div className="relative">
            <input
              type="username"
              className="w-full h-14 p-4 my-2 text-black bg-white/20 rounded-full outline-none backdrop-blur-md border-grey border-2 shadow-sm"
              placeholder="Enter user name"
              ref={usernameRef}
              required
            />
          </div>
          <div className="relative">
            <input
              type="password"
              className="w-full h-14 p-4 my-2 text-black bg-white/20 rounded-full outline-none backdrop-blur-md border-grey border-2 shadow-sm"
              placeholder="Enter password"
              ref={passwordRef}
              required
            />
          </div>

          <div className="relative">
            <input
              type="password"
              className="w-full h-14 p-4 my-2 text-black bg-white/20 rounded-full outline-none backdrop-blur-md border-grey border-2 shadow-sm"
              placeholder="Re-enter password"
              ref={rePassword}
              required
            />
          </div>

          <button
            onClick={handleSubmit}
            className="flex items-center justify-center w-full h-14 mt-5 bg-lime-400 text-white rounded-full shadow-md transition duration-300 gap-2 hover:gap-4"
          >
            <span>Sign Up</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
