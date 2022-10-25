import React, { useEffect } from "react";
import logo from "../../logo/logo.svg";

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
        <img src={logo} className="h-1/2 w-1/2" />
        <p className="fixed top-1/3 left-1/2 -translate-y-1/2 -translate-x-1/2 font-montserrat">
          Use Intune to find tracks that are similar to those you already like.
        </p>
      </div>
      <a
        href={`${SPOTIFY_AUTHORISE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scopes=${SCOPES_URL}`}
        className="bg-custom-green hover:bg-custom-green text-white py-3 px-12 rounded-full font-montserrat text-2xl tracking-widest fixed top-2/3 left-1/2 -translate-y-1/2 -translate-x-1/2"
      >
        CONNECT TO SPOTIFY
      </a>
    </>
  );
};

export default Home;

// http://localhost:5173/callback#access_token=BQA-WV-H4-fQX0Xli_W881IOe69cTZCvuLYPol_IOjOtzcCoRRw9fmA-U5mjj-SkqTA927Nf-XNOiRiHYgAKBZKIFCPimaznJxp8sAJ8l3f7jn9AiEQocl3csoCNed0VShmD_9fIsWnphw1wbNYNwFS86bZRMCM8yibuy3pOl2eeT7OaH1MZXqm3470XjpKY8Us&token_type=Bearer&expires_in=3600

// Connect to your Spotify account and search a song you want to make a playlist of similar songs for.
