/* eslint-disable react/prop-types */
import React from "react";

// eslint-disable-next-line no-unused-vars
const Songcards = ({
  id,
  name,
  artists,
  images,
  setSelectedSongId,
  setArtistIds,
}) => {
  const handleClick = () => {
    setSelectedSongId(id);
    setArtistIds(artists.map((artist) => artist.id));
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
