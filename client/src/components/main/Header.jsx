import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AppsIcon from "@mui/icons-material/Apps";
import { Avatar, IconButton } from "@mui/material";
const Header = () => {
    
    return (
        <div className="header flex justify-between items-center sticky inset-0 p-5 bg-white text-black">
            <div className="header_right flex justify-center items-center">
                <IconButton>
                    <MenuIcon></MenuIcon>
                </IconButton>
                <div className="header-right__img flex justify-between items-center ml-5">
                    <img
                        src="https://banner2.cleanpng.com/lnd/20240523/goy/axz66glt0.webp"
                        alt="googleimage"
                        className="w-[40px] h-[40px] object-cover"
                    />
                    <span className="header-title px-5 text-xl"> Form</span>
                </div>
            </div>
            <div className="header_search bg-gray-100 w-[600px] max-w-[800px] p-5 h-[45px] rounded-lg flex justify-start items-center ">
                <IconButton>
                    <SearchIcon className="w-[40px] h-[40px]"></SearchIcon>
                </IconButton>
                <input
                    type="text"
                    name="search"
                    id="search"
                    className="w-full bg-transparent outline-none"
                    placeholder="Search"
                />
            </div>
            <div className="header_right">
                <IconButton>
                    <AppsIcon></AppsIcon>
                </IconButton>
                <IconButton>
                    <Avatar alt="avatar" />
                </IconButton>
            </div>
        </div>
    );
};

export default Header;
