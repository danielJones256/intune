import React, { useState, useEffect } from "react";

const getParamsFromAuth = (hash) => {
  const stringAfterHashtag = hash.substring(1);
  const paramsURL = stringAfterHashtag.split("&");
  const paramsSplit = paramsURL.reduce((accumulator, currentVal) => {
    const [key, val] = currentVal.split("=");
    accumulator[key] = val;
    return accumulator;
  }, {});
  return paramsSplit;
};

const Search = () => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    const authToken = sessionStorage.getItem("auth_token");
    fetch(
      "https://api.spotify.com/v1/search?q=bad%20habit&type=track&limit=20",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, [query]);

  useEffect(() => {
    if (window.location.hash) {
      const { access_token, expires_in, token_type } = getParamsFromAuth(
        window.location.hash
      );
      sessionStorage.setItem("access_token", access_token);
      sessionStorage.setItem("expires_in", expires_in);
      sessionStorage.setItem("token_type", token_type);
    }
  }, []);
  return (
    <>
      <div className=" flex flex-col items-center justify-center h-screen">
        <p className="fixed top-1/4 left-1/2 -translate-y-1/2 -translate-x-1/2 font-montserrat text-xl">
          Sweet, go ahead and find your favourite song.
        </p>
      </div>
      <input
        onChange={handleChange}
        placeholder="search for a song..."
        type="text"
        className="h-12 px-5 pr-10 w-1/4 rounded-full text-sm border-2 border-black bg-inherit focus:outline-0 fixed top-1/3 left-1/2 -translate-y-1/2 -translate-x-1/2"
      />
    </>
  );
};

export default Search;
