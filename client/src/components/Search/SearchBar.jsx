
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const SearchBar = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const keywordDefault = searchParams.get("keyword") || "";

    const handleSearch = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const keyword = formData.get("keyword")?.toString();

        if (keyword) {
            navigate(`/search?keyword=${keyword}`);
        }
    };
    return (
        <form
            onSubmit={handleSearch}
            className="header_search bg-gray-100 w-[600px] max-w-[800px] p-5 h-[45px] rounded-lg flex items-center"
        >
            <input
                type="text"
                name="keyword"
                placeholder="Search..."
                className="order-2 text-[16px] font-[600] text-black bg-transparent outline-none flex-1"
                defaultValue={keywordDefault}
            />
            <button
                type="submit"
                className="order-1 text-[22px] text-black mr-[20px]"
            >
                <SearchIcon className="w-[40px] h-[40px]" />
            </button>
        </form>
    );
};

export default SearchBar;
