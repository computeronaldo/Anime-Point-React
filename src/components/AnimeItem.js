import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function AnimeItem() {
  const { id } = useParams();

  //state
  const [anime, setAnime] = useState({});
  const [characters, setCharacters] = useState([]);
  const [showMore, setShowMore] = useState(false);

  //destructing anime object to fetch information to display
  const {
    title,
    synopsis,
    trailer,
    duration,
    aired,
    season,
    images,
    rank,
    score,
    scored_by,
    popularity,
    status,
    rating,
    source,
  } = anime;

  //fetching anime data based on id
  const getAnime = async (anime) => {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}`);
    const data = await response.json();

    setAnime(data.data);
  };

  useEffect(() => {
    getAnime(id);
  }, []);

  return <div>AnimeItem</div>;
}

export default AnimeItem;
