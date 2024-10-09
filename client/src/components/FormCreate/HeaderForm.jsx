import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AppsIcon from "@mui/icons-material/Apps";
import {
    Avatar,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    TextField,
} from "@mui/material";
import { useParams } from "react-router-dom";

const HeaderForm = () => {
    const { idForm } = useParams();
    const [open, setOpen] = useState(false);
    const [formLink, setFormLink] = useState("");

    const handleClickOpen = () => {
        const generatedLink = `http://localhost:3001/form/input/${idForm}`;

        setFormLink(generatedLink);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="HeaderForm flex justify-between items-center sticky inset-0 p-5 bg-white shadow-md">
            <div className="HeaderForm_left flex items-center">
                <IconButton>
                    <MenuIcon />
                </IconButton>
                <div className="flex items-center ml-5">
                    <img
                        src="https://banner2.cleanpng.com/lnd/20240523/goy/axz66glt0.webp"
                        alt="googleimage"
                        className="w-[40px] h-[40px] object-cover"
                    />
                    <span className="HeaderForm-title px-5 text-xl">Form</span>
                </div>
            </div>
            <div className="HeaderForm_search bg-gray-100 w-[600px] max-w-[800px] p-5 h-[45px] rounded-lg flex items-center">
                <IconButton>
                    <SearchIcon className="w-[40px] h-[40px]" />
                </IconButton>
                <input
                    type="text"
                    name="search"
                    id="search"
                    className="w-full bg-transparent outline-none"
                    placeholder="Search"
                />
            </div>
            <div className="HeaderForm_right flex items-center">
                <IconButton>
                    <AppsIcon />
                </IconButton>
                <IconButton>
                    <Avatar alt="avatar" />
                </IconButton>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClickOpen}
                    className="ml-4 bg-purple-600 hover:bg-purple-700"
                >
                    Send
                </Button>
            </div>

            <Dialog open={open} onClose={handleClose} className="">
                <DialogTitle className="bg-purple-600 text-white text-lg font-bold p-4 rounded-t-lg">
                    Form Link
                </DialogTitle>
                <DialogContent className="bg-white p-6">
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Generated Link"
                        fullWidth
                        value={formLink}
                        InputProps={{
                            readOnly: true,
                        }}
                        className="my-4 border-none focus:ring-2 focus:ring-purple-500 rounded-md"
                    />
                </DialogContent>
                <DialogActions className="bg-gray-50 p-4 rounded-b-lg flex justify-between">
                    <Button
                        onClick={handleClose}
                        className="text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md px-4 py-2"
                    >
                        Close
                    </Button>
                    <Button
                        onClick={() => navigator.clipboard.writeText(formLink)}
                        className="text-white bg-purple-600 hover:bg-purple-700 rounded-md px-4 py-2"
                    >
                        Copy Link
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default HeaderForm;
