import React, { useState, useEffect } from "react";
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
  document.body.style.backgroundColor = "#1e1e1e";

  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [selectedSongId, setSelectedSongId] = useState("");
  const [analysisData, setAnalysisData] = useState([]);
  const [artistIds, setArtistIds] = useState([]);
  const [artistData, setArtistData] = useState([]);
  const authToken = sessionStorage.getItem("auth_token");

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

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    if (query) {
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
    if (selectedSongId) {
      fetch(`https://api.spotify.com/v1/artists?ids=${artistIds.join()}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setArtistData(data));
    }
  }, [selectedSongId]);

  useEffect(() => {
    if (selectedSongId) {
      fetch(`https://api.spotify.com/v1/audio-features/${selectedSongId}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setAnalysisData(data));
    }
  }, [selectedSongId]);

  console.log(artistData);
  console.log(analysisData);

  return (
    <>
      <div>
        <p className="font-montserrat text-xl text-custom-cream grid place-items-center mt-14">
          Search up your favourite song.
        </p>
      </div>
      <div className="grid place-items-center">
        <input
          onChange={handleChange}
          placeholder="search..."
          type="text"
          className="h-12 px-5 pr-10 w-1/4 rounded-full text-sm border-2 border-custom-cream text-custom-cream bg-inherit focus:outline-0 mt-4"
        />
      </div>
      <div className="mx-32 mb-10 grid grid-cols-4 gap-8">
        {data.length && query
          ? data.map((songs, index) => (
              <div key={index}>
                <Songcards
                  id={songs.id}
                  name={songs.name}
                  artists={songs.artists}
                  images={songs.album.images[0]}
                  setSelectedSongId={setSelectedSongId}
                  setArtistIds={setArtistIds}
                />
              </div>
            ))
          : ""}
      </div>
      <p className="font-montserrat text-custom-cream text-opacity-25 flex justify-center items-center mb-5">
        Powered by Spotify
      </p>
    </>
  );
};

export default Search;
