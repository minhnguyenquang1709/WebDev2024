import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Button,
    Avatar,
} from "@mui/material";
import PaletteIcon from "@mui/icons-material/Palette";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function HeaderForm({ formTitle }) {
    return (
        <div>
            <AppBar
                position="static"
                color="default"
                elevation={0}
                className="!bg-white"
            >
                <Toolbar>
                    <Typography
                        variant="h6"
                        color="inherit"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        {formTitle}
                    </Typography>

                    <IconButton color="inherit">
                        <PaletteIcon />
                    </IconButton>
                    <IconButton color="inherit">
                        <UndoIcon />
                    </IconButton>
                    <IconButton color="inherit">
                        <RedoIcon />
                    </IconButton>

                    <Button variant="contained" color="primary">
                        Send
                    </Button>
                    <IconButton color="inherit">
                        <MoreVertIcon />
                    </IconButton>
                    <Avatar sx={{ bgcolor: "purple" }}>T</Avatar>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default HeaderForm;
