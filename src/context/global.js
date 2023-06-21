import React, { useState } from "react";
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
const GET_PICTURES = "GET_PICTURES";

const reducerFn = (state, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true };
    case GET_POPULAR_ANIME:
      return { ...state, popularAnime: action.payload, loading: false };
    case GET_AIRING_ANIME:
      return { ...state, airingAnime: action.payload, loading: false };
    case GET_UPCOMING_ANIME:
      return { ...state, upcomingAnime: action.payload, loading: false };
    case SEARCH:
      return { ...state, searchResults: action.payload, loading: false };
    case GET_PICTURES:
      return { ...state, pictures: action.payload, loading: false };
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
  const [search, setSearch] = useState("");

  //handling change in search input field
  const handleChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      state.isSearch = false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (search) {
      searchAnime(search);
      state.isSearch = true;
    } else {
      state.isSearch = false;
      alert("please enter a valid input...");
    }
  };

  const searchAnime = async (search) => {
    state.isSearch = true;
    dispatchFn({ type: LOADING });

    const response = await fetch(
      `${baseUrl}/anime?q=${search}&order_by=popularity&sort=asc&sfw`
    );
    const data = await response.json();

    console.log(data);
    dispatchFn({ type: SEARCH, payload: data.data });
  };

  //fetch popular anime
  const getPopularAnime = async () => {
    state.isSearch = false;
    dispatchFn({ type: LOADING });

    const response = await fetch(`${baseUrl}/top/anime?filter=bypopularity`);
    const data = await response.json();

    dispatchFn({ type: GET_POPULAR_ANIME, payload: data.data });
  };

  //fetch upcoming anime
  const getUpcomingAnime = async () => {
    state.isSearch = false;
    dispatchFn({ type: LOADING });

    const response = await fetch(`${baseUrl}/top/anime?filter=favorite`);
    const data = await response.json();

    dispatchFn({ type: GET_UPCOMING_ANIME, payload: data.data });
  };

  //fetch airing anime
  const getAiringAnime = async () => {
    state.isSearch = false;
    dispatchFn({ type: LOADING });

    const response = await fetch(`${baseUrl}/top/anime?filter=airing`);
    const data = await response.json();

    console.log(data);
    dispatchFn({ type: GET_AIRING_ANIME, payload: data.data });
  };

  const getAnimePictures = async (id) => {
    dispatchFn({ type: LOADING });

    const response = await fetch(`${baseUrl}/characters/${id}/pictures`);
    const data = await response.json();

    dispatchFn({ type: GET_PICTURES, payload: data.data });
  };

  useEffect(() => {
    getPopularAnime();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        handleChange,
        handleSubmit,
        searchAnime,
        search,
        getPopularAnime,
        getUpcomingAnime,
        getAiringAnime,
        getAnimePictures,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
