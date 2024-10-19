import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Header from "../Home/Header";

const SearchResult = () => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [keywordDefault, setKeywordDefault] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const keyword = searchParams.get("keyword") || "";
    setKeywordDefault(keyword);
  }, [location]);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await axios.get("http://localhost:3000/questions");
        const fetchedData = response.data;

        const regex = new RegExp(keywordDefault, "i");
        const filteredData = fetchedData.filter((item) =>
          regex.test(item.title)
        );

        setData(filteredData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    if (keywordDefault) {
      fetchApi();
    }
  }, [keywordDefault]);

  return (
    <div>
      <Header />
      <div className="bg-gray-100 py-5 pb-10">
        <div className="max-w-4xl mx-auto">
          <h1>Search Results</h1>
          <div className="grid grid-cols-5 mt-4 gap-10">
            {data.length === 0 ? (
              <h1>No results</h1>
            ) : (
              data.map((item) => (
                <Link
                  to={`/form/${item.id}`}
                  className="w-[170px] cursor-pointer flex flex-col items-start justify-start"
                  key={item.id}
                >
                  <div className="w-full border rounded-lg hover:border-blue-600 mb-3">
                    <img
                      src="https://ssl.gstatic.com/docs/templates/thumbnails/1xQF3s6EP0d58H-XJ7R440OpREKo4KqEapa0mkw43RPE_400_1.png"
                      className="w-full h-[130px] object-cover rounded-lg"
                      alt={`Form thumbnail ${item.id}`}
                    />
                  </div>
                  <span className="text-base py-3">{item.title}</span>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
