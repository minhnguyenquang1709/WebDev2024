import React from "react";
import { List } from "@mui/material";
import SidebarList from "./SidebarList";

const Sidebar = ({ toggleDrawer }) => {
    return (
        <div
            className="w-[250px]"
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                <SidebarList />
            </List>
        </div>
    );
};

export default Sidebar;
