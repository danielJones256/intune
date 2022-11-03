import React from "react";
import logo from "../../logo/logo6.svg";
import githubLogo from "../../logo/GitHub-Mark-64px.png";
import spotify from "../../logo/spotify.svg";

const CLIENT_ID = "2f3a183224a9480aaf826f7e3551f9c9";
const REDIRECT_URI = "http://localhost:5173/callback";
const SPOTIFY_AUTHORISE_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";

const SCOPES = ["playlist-modify-public", "playlist-modify-private"];
const SPACE_DELIMITER = "%20";
const SCOPES_URL = SCOPES.join(SPACE_DELIMITER);

const Home = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <img src={logo} />
        <p className="font-montserrat text-2xl m-5">Scroll down...</p>
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
      <br />
      <div className="flex flex-col items-center">
        <p className="font-montserrat text-3xl w-96 tracking-wider">
          Intune helps you find new songs, similar to the ones you already
          enjoy.
        </p>
        <br />
        <br />
        <p className="font-montserrat text-3xl w-96 tracking-wider">
          Login to your Spotify to get you started...
        </p>
      </div>
      <div className="flex flex-col items-center justify-center m-32">
        <a
          href={`${SPOTIFY_AUTHORISE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scopes=${SCOPES_URL}`}
          className="bg-transparent text-black py-3 px-12 font-montserrat text-2xl transform transition duration-500 hover:scale-110 border-2 border-black"
        >
          CONNECT TO SPOTIFY
        </a>
      </div>
    </>
  );
};

export default Home;
