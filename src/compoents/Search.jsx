import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { followerAdd } from "../features/followingSlice";
import axios from "axios";

function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [hide, setHide] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [showTooltip, setShowTooltip] = useState(false);

  const [userID] = useState(user && user.user_id != null ? user.user_id : "");

  const fetchname = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5432/api/v1/all-profiles?name=" + query,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: user?.accessToken,
          },
        }
      );

      console.log("res=====>", res.data);

      if (res.status == 200)
        setResults(
          res.data?.map((user) => ({
            name: user?.username || "", // If username is undefined or null, set it to an empty string
            userId: user?.user_id || "", // If user_id is undefined or null, set it to an empty string
          })) || []
        );
    } catch (error) {
      console.error("Error fetching profiles:", error);
    }
  };
  useEffect(() => {
    if (query.length >= 3) {
      fetchname();
    }
  }, [query]);

  const handleSearch = (e) => {
    setQuery(e.target.value);
    if (e.target.value.trim() === "") {
      setResults([]);
      setQuery("");
      return;
    }
  };

  const handleSelect = async (item) => {
    setQuery(item);
    console.log("Selected Item:", item);
    console.log("Selected Item:", item.userId);

    dispatch(followerAdd(item));

    const requestBody = {
      following_id: item.userId,
      follower_id: userID,
    };

    const headers = {
      "Content-Type": "application/json",
      authorization: user?.accessToken,
    };

    try {
      const res = await axios.post(
        "http://localhost:5432/api/v1/following",
        requestBody,
        {
          headers: headers,
        }
      );
      if (res.status === 200) {
        setQuery("");
      }
      console.log("Follow API response:", res.data);

      setHide(false);
    } catch (error) {
      console.error("Error while following:", error);
    }
  };

  return (
    <div className="relative w-full sm:w-auto">
      <div className="fixed top-0 left-0 w-full bg-gray-900 p-4 sm:relative sm:p-0 sm:bg-transparent z-20">
        <div className="relative group flex items-center px-4 py-2 bg-gray-800 rounded-xl shadow-md border border-gray-700">
          <FiSearch className="text-gray-400 text-lg" />

          <input data-tooltip-target="tooltip-top" data-tooltip-placement="top"
            type="text"
            placeholder="Search for a friend..."
            className="relative ml-3 w-full bg-transparent outline-none text-white placeholder-[#ff6600] text-sm"
            onFocus={() => {
              setHide(true);
              setShowTooltip(true);
            }}
            onBlur={() => {
              setTimeout(() => {
                setHide(false);
                setShowTooltip(false);
              }, 200);
            }}
            value={query}
            onChange={handleSearch}
          />
        </div>
        {showTooltip && (
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 bg-gray-900 text-white text-xs px-3 py-2 rounded-md shadow-md w-full">
           Please enter at least 3 characters to search.
           Only registered users can be found.
           Click on a suggested user to follow them.
        </div>
      )}
      </div>

      {results.length > 0 && hide && (
        <ul className="absolute top-full left-0 w-full bg-gray-800 border border-gray-700 mt-2 shadow-lg rounded-lg overflow-hidden z-10">
          {results.map((item, index) => (
            <li
              key={index}
              className="p-3 hover:bg-gray-700 text-white text-sm cursor-pointer transition-all duration-200"
              onClick={() => {
                console.log("Item clicked:", item);
                handleSelect(item);
              }}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Search;
