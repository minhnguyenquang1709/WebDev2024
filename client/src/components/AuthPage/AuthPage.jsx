import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import axios from "axios";
import Decor from "../../assets/image/Decor.png";
const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();

    const toggleForm = () => {
        setIsLogin((prev) => !prev);
    };

    const handleLogin = async ({ username, password }) => {
        try {
            const url = process.env.REACT_APP_AUTH_LOGIN;
            const response = await axios.post(
                url,
                {
                    username,
                    password,
                },
                { withCredentials: true } // enable sending/receiving cookies
            );
            console.log("From Login: ", response.data);
            navigate("/main");
        } catch (e) {
            console.log(e);
        }
    };

    const handleRegister = async ({ email, username, password }) => {
        if (email.length < 1 || username.length < 1 || password.length < 1) {
            alert("Invalid info");
            return;
        }

        try {
            const url = process.env.REACT_APP_AUTH_REGISTER;
            const response = await axios.post(
                url,
                {
                    email,
                    username,
                    password,
                },
                { withCredentials: true }
            );
            console.log("From Register: ", response.data);
            if (response.status !== 201) {
                console.log("Register failed");
                return;
            }
            navigate("/main");
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="bg-cover bg-center bg-no-repeat bg-fixed flex items-center justify-center min-h-screen p-5">
            <div className="flex w-full max-w-4xl h-[600px] border-3 border-green-400/30 rounded-[30px] backdrop-blur-lg overflow-hidden">
                <div className="flex items-center justify-center flex-col w-[55%] bg-green-400/30 backdrop-blur-lg rounded-r-[30%] transition-all duration-150">
                    <div className="relative">
                        <img src={Decor} className="w-[400px]" alt="Decor" />
                    </div>
                </div>

                <div className="relative w-[45%] p-5 overflow-hidden">
                    <div className="flex justify-center gap-3 mt-5">
                        <button
                            className={`font-medium py-2 px-6 rounded-full ${
                                isLogin
                                    ? "bg-green-500 text-white"
                                    : "bg-black text-white"
                            } shadow-md hover:opacity-85 transition duration-200`}
                            onClick={toggleForm}
                        >
                            Login
                        </button>
                        <button
                            className={`font-medium py-2 px-6 rounded-full ${
                                !isLogin
                                    ? "bg-green-500 text-white"
                                    : "bg-black text-white"
                            } shadow-md hover:opacity-85 transition duration-200`}
                            onClick={toggleForm}
                        >
                            Register
                        </button>
                    </div>

                    {isLogin ? (
                        <Login onLogin={handleLogin} />
                    ) : (
                        <Register onRegister={handleRegister} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
