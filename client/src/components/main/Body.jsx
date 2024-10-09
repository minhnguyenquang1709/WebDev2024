import React from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
const Body = () => {
    return (
        <>
            <div className="mx-auto py-5">
                <div className="flex justify-evenly items-center">
                    <span>Recent forms</span>
                    <div className="">
                        <div className="">
                            <button>
                                <span>Not owned by me</span>
                                <ArrowDropDownIcon />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Body;
