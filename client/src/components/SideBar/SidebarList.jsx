import React from "react";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import DescriptionIcon from "@mui/icons-material/Description";
import SheetsIcon from "@mui/icons-material/GridOn";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import FormsIcon from "@mui/icons-material/Assignment";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpIcon from "@mui/icons-material/Help";
import CloudIcon from "@mui/icons-material/Cloud";

const SidebarList = () => {
    return (
        <>
            <ListItem
                button
                component={Link}
                to="https://workspace.google.com/products/docs/"
            >
                <ListItemIcon>
                    <DescriptionIcon />
                </ListItemIcon>
                <ListItemText primary="Docs" />
            </ListItem>

            <ListItem
                button
                component={Link}
                to="https://workspace.google.com/products/sheets/"
            >
                <ListItemIcon>
                    <SheetsIcon />
                </ListItemIcon>
                <ListItemText primary="Sheets" />
            </ListItem>

            <ListItem
                button
                component={Link}
                to="https://workspace.google.com/products/slides/"
            >
                <ListItemIcon>
                    <SlideshowIcon />
                </ListItemIcon>
                <ListItemText primary="Slides" />
            </ListItem>

            <ListItem button component={Link} to="/main">
                <ListItemIcon>
                    <FormsIcon />
                </ListItemIcon>
                <ListItemText primary="Forms" />
            </ListItem>

            <ListItem button component={Link} to="/settings">
                <ListItemIcon>
                    <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Settings" />
            </ListItem>

            <ListItem button component={Link} to="/help">
                <ListItemIcon>
                    <HelpIcon />
                </ListItemIcon>
                <ListItemText primary="Help & Feedback" />
            </ListItem>

            <ListItem button component={Link} to="/drive">
                <ListItemIcon>
                    <CloudIcon />
                </ListItemIcon>
                <ListItemText primary="Drive" />
            </ListItem>
        </>
    );
};

export default SidebarList;
