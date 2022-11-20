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
  const [artistIds, setArtistIds] = useState([]);
  const [artistData, setArtistData] = useState([]);
  const [genres, setGenres] = useState([]);
  const [recommendedSongs, setRecommendedSongs] = useState([]);
  const [currentUserId, setCurrentUserId] = useState("");
  const [playlistId, setPlaylistId] = useState("");
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

  const resetStates = () => {
    setSelectedSongId("");
    setArtistIds([]);
    setArtistData([]);
    setGenres([]);
    setRecommendedSongs([]);
    setPlaylistId("");
  };

  useEffect(() => {
    resetStates();
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
    if (Object.keys(artistData).length) {
      setGenres(
        artistData.artists.flatMap((artist) =>
          artist.genres.map((genre) => genre)
        )
      );
    }
  }, [artistData]);

  useEffect(() => {
    if (selectedSongId && artistData && genres) {
      fetch(
        `https://api.spotify.com/v1/recommendations?limit=20&market=US&seed_artists=${artistIds.join(
          "%2C"
        )}&seed_genres=${genres.join("%2C")}&seed_tracks=${selectedSongId}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) =>
          setRecommendedSongs(
            data.tracks.map((song) => `spotify%3Atrack%3A${song.id}`)
          )
        );
    }
  }, [selectedSongId]);

  useEffect(() => {
    if (authToken) {
      fetch(`https://api.spotify.com/v1/me`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setCurrentUserId(data.id));
    }
  }, []);

  useEffect(() => {
    if (playlistId && selectedSongId && recommendedSongs.length) {
      addSong();
    }
  }, [recommendedSongs, playlistId, selectedSongId]);

  const addSong = () => {
    fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks?position=0&uris=${recommendedSongs.join()}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    ).then(() =>
      window.open(`https://open.spotify.com/playlist/${playlistId}`, "_blank")
    );
  };

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
                  authToken={authToken}
                  setSelectedSongId={setSelectedSongId}
                  setArtistIds={setArtistIds}
                  currentUserId={currentUserId}
                  setPlaylistId={setPlaylistId}
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
