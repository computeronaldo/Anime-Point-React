import React from "react";
import { useEffect } from "react";
import { useReducer } from "react";

const GlobalContext = React.createContext();

const baseUrl = "https://api.jikan.moe/v4";

//actions
const LOADING = "LOADING";
const SEARCH = "SEARCH";
const GET_POPULAR_ANIME = "GET_POPULAR_ANIME";
const GET_UPCOMING_ANIME = "GET_UPCOMING_ANIME";
const GET_AIRING_ANIME = "GET_AIRING_ANIME";

const reducerFn = (state, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true };
    case GET_POPULAR_ANIME:
      return { ...state, popularAnime: action.payload, loading: false };
    default:
      return state;
  }
};

export const GlobalContextProvider = ({ children }) => {
  const initialState = {
    popularAnime: [],
    airingAnime: [],
    upcomingAnime: [],
    pictures: [],
    isSearch: false,
    seachResults: [],
    loading: false,
  };

  const [state, dispatchFn] = useReducer(reducerFn, initialState);

  //fetch popular anime
  const getPopularAnime = async () => {
    dispatchFn({ type: LOADING });

    const response = await fetch(`${baseUrl}/top/anime?filter=bypopularity`);
    const data = await response.json();

    dispatchFn({ type: GET_POPULAR_ANIME, payload: data.data });
  };

  useEffect(() => {
    getPopularAnime();
  }, []);

  return (
    <GlobalContext.Provider value={{ ...state }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
