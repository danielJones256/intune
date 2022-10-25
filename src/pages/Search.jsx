import React, { useEffect } from "react";
import logo from "../../logo/logo.svg";

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
  useEffect(() => {
    if (window.location.hash) {
      const { access_token, expires_in, token_type } = getParamsFromAuth(
        window.location.hash
      );
      console.log({ access_token, expires_in, token_type });
    }
  }, []);
  return (
    <>
      <div className=" flex flex-col items-center justify-center h-screen">
        <img src={logo} className="h-1/2 w-1/2" />
        <input
          placeholder="search for a song..."
          type="text"
          className="top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
        />
      </div>
    </>
  );
};

export default Search;
