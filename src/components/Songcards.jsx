/* eslint-disable react/prop-types */
import React from "react";

// eslint-disable-next-line no-unused-vars
const Songcards = ({
  id,
  name,
  artists,
  images,
  setSelectedSongId,
  authToken,
  setArtistIds,
  currentUserId,
  setPlaylistId,
  resetStates,
}) => {
  const makePlaylist = () => {
    if (currentUserId) {
      fetch(`https://api.spotify.com/v1/users/${currentUserId}/playlists`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          name: `${name} - Playlist`,
          description: "New playlist description",
          public: false,
        }),
      })
        .then((response) => response.json())
        .then((data) => setPlaylistId(data.id));
    }
  };

  const handleClick = () => {
    setSelectedSongId(id);
    setArtistIds(artists.map((artist) => artist.id));
    makePlaylist();
    setTimeout(() => resetStates(), 3000);
  };

  return (
    <div className="mt-10">
      <div>
        <button onClick={handleClick}>
          <img src={images.url} />
        </button>
      </div>
      <div>
        <p className="text-xl mt-4 w-full text-custom-cream truncate">{name}</p>
        <p className="text-md text-custom-cream truncate">
          {artists.map((artist) => artist.name + " ")}
        </p>
      </div>
    </div>
  );
};

export default Songcards;
