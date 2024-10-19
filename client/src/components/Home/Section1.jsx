import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Section1 = () => {
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3000/questions"
                );
                setData(response.data);
            } catch {
                alert("Failed to fetch data");
            }
        };

        fetchQuestions();
    }, []);

    const goTo = (path) => {
        navigate(path);
    };

    return (
        <div className="bg-gray-100 py-5 pb-10">
            <div className="max-w-4xl mx-auto">
                <div className="header-section1 w-full flex items-center justify-between">
                    <button
                        className="p-2 bg-blue-300 text-base rounded-lg"
                        onClick={() => goTo("/create-form")}
                    >
                        Create a new Form
                    </button>
                    <div className="flex justify-center items-center">
                        <button
                            className="button_right flex justify-center items-center p-1 hover:bg-gray-300 rounded-lg border-r"
                            onClick={() => setShow(!show)}
                        >
                            <span className="text-base">Template gallery</span>
                            <IconButton>
                                <KeyboardDoubleArrowDownIcon />
                            </IconButton>
                        </button>
                        <IconButton>
                            <MoreVertIcon />
                        </IconButton>
                    </div>
                </div>

                <div className="grid grid-cols-5 grid-rows-1 mt-4 gap-10">
                    <button
                        className="w-[170px] cursor-pointer flex flex-col items-start justify-start"
                        onClick={() => goTo("/create-form")}
                    >
                        <div className="w-full border rounded-lg hover:border-blue-600 mb-3">
                            <img
                                src="https://ssl.gstatic.com/docs/templates/thumbnails/forms-blank-googlecolors.png"
                                className="w-full h-[130px] object-cover rounded-lg"
                                alt="Bank Form"
                            />
                        </div>
                        <span className="text-base py-3">Blank Form</span>
                    </button>

                    {(show ? data : data.slice(0, 4)).map((item, index) => (
                        <Link
                            to={`/form/${item.id}`}
                            className="w-[170px] cursor-pointer flex flex-col items-start justify-start"
                            key={item.id}
                        >
                            <div className="w-full border rounded-lg hover:border-blue-600 mb-3">
                                <img
                                    src="https://ssl.gstatic.com/docs/templates/thumbnails/1xQF3s6EP0d58H-XJ7R440OpREKo4KqEapa0mkw43RPE_400_1.png"
                                    className="w-full h-[130px] object-cover rounded-lg"
                                    alt={`{index + 1}`}
                                />
                            </div>
                            <span className="text-base py-3">
                                {item.title}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Section1;
