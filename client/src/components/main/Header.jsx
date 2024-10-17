import React, { useState } from "react";
import { IconButton, Drawer, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AppsIcon from "@mui/icons-material/Apps";
import Sidebar from "../SideBar/SideBar";
import {  Menu, MenuItem } from '@mui/material';


const Header = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    

    const toggleDrawer = (open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        setIsDrawerOpen(open);
    };

    const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

    


    

    return (
        <div className="header flex justify-between items-center sticky inset-0 p-5 bg-white text-black">
            <div className="header_right flex items-center">
                <IconButton onClick={toggleDrawer(true)}>
                    <MenuIcon />
                </IconButton>

                <Drawer open={isDrawerOpen} onClose={toggleDrawer(false)}>
                    <Sidebar toggleDrawer={toggleDrawer} />
                </Drawer>

                <Link
                    to="/main"
                    className="header-right__img flex items-center ml-5"
                >
                    <img
                        src="https://banner2.cleanpng.com/lnd/20240523/goy/axz66glt0.webp"
                        alt="googleimage"
                        className="w-[40px] h-[40px] object-cover"
                    />
                    <span className="header-title px-5 text-xl  ">Form</span>
                </Link>
            </div>

            <div className="header_search bg-gray-100 w-[600px] max-w-[800px] p-5 h-[45px] rounded-lg flex items-center">
                <IconButton>
                    <SearchIcon className="w-[40px] h-[40px]" />
                </IconButton>
                <input
                    type="text"
                    name="search"
                    className="w-full bg-transparent outline-none"
                    placeholder="Search"
                />
            </div>

            <div className="header_right flex items-center">
                <IconButton >
                    <AppsIcon />
                </IconButton>
                

                <IconButton onClick={handleClick}>
                    <Avatar alt="avatar" />
                </IconButton>

                <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My Account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
            </div>
        </div>
    );
};

export default Header;
