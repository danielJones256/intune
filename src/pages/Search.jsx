import React, { useState, useEffect } from "react";
import githubLogo from "../../logo/GitHub-Mark-64px.png";
import spotify from "../../logo/spotify.svg";
import Songcards from "../components/Songcards";

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
  const [data, setData] = useState([]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    if (query) {
      const authToken = sessionStorage.getItem("auth_token");
      fetch(
        `https://api.spotify.com/v1/search?q=${query}&type=track&limit=20`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => setData(data.tracks.items));
    }
  }, [query]);

  useEffect(() => {
    if (window.location.hash) {
      const { access_token, expires_in, token_type } = getParamsFromAuth(
        window.location.hash
      );
      sessionStorage.setItem("auth_token", access_token);
      sessionStorage.setItem("expires_in", expires_in);
      sessionStorage.setItem("token_type", token_type);
    }
  }, []);

  return (
    <>
      <p className="fixed top-16 left-1/2 -translate-y-1/2 -translate-x-1/2 font-montserrat text-xl">
        Search up your favourite song.
      </p>

      <input
        onChange={handleChange}
        placeholder="search for a song..."
        type="text"
        className="h-12 px-5 pr-10 w-1/4 rounded-full text-sm border-2 border-black bg-inherit focus:outline-0 fixed top-32 left-1/2 -translate-y-1/2 -translate-x-1/2"
      />
      <div className="mt-48 mb-40 mx-40 grid place-items-center overflow-auto h-[35rem]">
        {data.length && query
          ? data.map((songs, index) => (
              <div key={index} className="mb-6">
                <Songcards
                  id={songs.id}
                  name={songs.name}
                  artists={songs.artists}
                  images={songs.album.images[0]}
                />
              </div>
            ))
          : ""}
      </div>
      <a
        href="https://developer.spotify.com/documentation/web-api/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={spotify} className="fixed left-0 bottom-0 p-5" />
      </a>
      <a
        href="https://github.com/danielJones256"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={githubLogo} className="fixed right-0 bottom-0 p-5 w-20" />
      </a>
    </>
  );
};

export default Search;
