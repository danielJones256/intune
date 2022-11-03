/* eslint-disable react/prop-types */
import React from "react";

// eslint-disable-next-line no-unused-vars
const Songcards = ({ id, name, artists, images }) => {
  return (
    <div className="flex w-[500px] mt-10">
      <a
        className="transform transition duration-500 hover:scale-110 flex justify-center items-center"
        href=""
      >
        <img src={images.url} />
      </a>

      <p className="mt-8 ml-8 w-full">
        {name} <br />
        {artists.map((artist) => artist.name + " ")}
      </p>
    </div>
  );
};

export default Songcards;
