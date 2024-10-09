import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

const Nav = () => {
    return (
        <div className="nav p-5 bg-white shadow-md flex items-center gap-x-5 justify-between">
            <Link to={"/"}>
                <img src={logo} alt="icon" />
            </Link>
            <div className="nav_list flex">
                <div className="nav_item">Your Results</div>
                <div className="nav_item">Personality</div>
                <div className="nav_item">Teams</div>
                <div className="nav_item">Resources</div>
            </div>
            <div className="py-3 px-2  rounded-lg hover:bg-gray-400 flex items-center justify-center">
                <img
                    src="https://www.16personalities.com/static/images/international/flags/vi.svg"
                    alt=""
                    className="w-[40px] h-[40px]"
                />
                <span>Tiếng Việt</span>
            </div>
        </div>
    );
};

export default Nav;
