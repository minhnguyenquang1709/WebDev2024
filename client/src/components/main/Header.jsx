import React, { useState } from "react";
import { IconButton, Drawer, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AppsIcon from "@mui/icons-material/Apps";
import Sidebar from "../SideBar/SideBar";
import {  Menu, MenuItem } from '@mui/material';




import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';


import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';


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
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
                background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)', // Soft gradient background
                backdropFilter: 'blur(8px)', // Adds a subtle blur effect
                border: '1px solid rgba(255, 255, 255, 0.3)', // Adds a soft border
                borderRadius: '12px', // Smooths out the edges
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,                
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        

<MenuItem onClick={handleClose}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="10" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
            </div>
        </div>
    );
};

export default Header;
