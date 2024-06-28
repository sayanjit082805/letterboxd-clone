/*
{
  "adult": false,
  "backdrop_path": "https://image.tmdb.org/t/p/original/5wJ2tckpvwcxGCAgZiccodwEJpf.jpg",
  "belongs_to_collection": null,
  "budget": 40000000,
  "genres": [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 12,
      "name": "Adventure"
    }
  ],
  "homepage": "",
  "id": 841,
  "imdb_id": "tt0087182",
  "origin_country": [
    "US"
  ],
  "original_language": "en",
  "original_title": "Dune",
  "overview": "In the year 10,191, the most precious substance in the universe is the spice Melange. The spice extends life. The spice expands consciousness. The spice is vital to space travel.  The spice exists on only one planet in the entire universe, the vast desert planet Arrakis, also known as Dune.  Its native inhabitants, the Fremen, have long held a prophecy that a man would come, a messiah who would lead them to true freedom.",
  "popularity": 120.94,
  "poster_path": "https://image.tmdb.org/t/p/original/lyP3eKSEgZkChb77cKMIbydbPSq.jpg",
  "production_companies": [
    {
      "id": 10308,
      "logo_path": "/pOHLwTFBPtPnz8BWP8T4w3UCTEB.png",
      "name": "Dino De Laurentiis Company",
      "origin_country": "US"
    }
  ],
  "production_countries": [
    {
      "iso_3166_1": "US",
      "name": "United States of America"
    }
  ],
  "release_date": "1984-12-14",
  "revenue": 30982607,
  "runtime": 137,
  "spoken_languages": [
    {
      "english_name": "English",
      "iso_639_1": "en",
      "name": "English"
    }
  ],
  "status": "Released",
  "tagline": "A world beyond your experience, beyond your imagination.",
  "title": "Dune",
  "video": false,
  "vote_average": 6.202,
  "vote_count": 2898
}
*/
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  FaClock,
  FaEye,
  FaHeart,
  FaRegClock,
  FaRegEye,
  FaRegHeart,
  FaRegStar,
  FaStar,
} from 'react-icons/fa';

import './MoviePage.css';

function MoviePage() {
  const [movie, setMovie] = useState(null);
  const [watched, setWatched] = useState(false);
  const [liked, setLiked] = useState(false);
  const [watchList, setWatchList] = useState(false);

  let rating = Math.ceil(movie?.vote_average / 2);
  if (Number.isNaN(rating)) rating = 0;

  const id = Number(useParams().id);
  const axiosParams = (action) => [
    'http://localhost:1337/api/user/profile',
    { [action]: Number(id) },
    { withCredentials: true },
  ];

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:1337/api/movie/details/${id}`,
          { withCredentials: true }
        );
        setMovie(data);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get(
          'http://localhost:1337/api/user/profile',
          {
            withCredentials: true,
          }
        );
        setLiked(data.liked.includes(id));
        setWatched(data.watched.includes(id));
        setWatchList(data.watchlist.includes(id));
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
    fetchMovieData();
  }, [id]);

  const handleWatch = async () => {
    let response = null;
    try {
      if (watched) {
        response = await axios.patch(...axiosParams('watched'));
      } else {
        response = await axios.post(...axiosParams('watched'));
      }
      setWatched((prev) => !prev);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLike = async () => {
    let response = null;
    try {
      if (liked) {
        response = await axios.patch(...axiosParams('liked'));
      } else {
        response = await axios.post(...axiosParams('liked'));
      }
      setLiked((prev) => !prev);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleWatchList = async () => {
    let response = null;
    try {
      if (watchList) {
        response = await axios.patch(...axiosParams('watchlist'));
      } else {
        response = await axios.post(...axiosParams('watchlist'));
      }
      setWatchList((prev) => !prev);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='movie-page'>
      <div className='movie-detail'>
        <div className='poster'>
          <img
            className='movie-poster'
            src={movie?.poster_path}
          />
        </div>
        <div className='text'>
          <p className='movie-title'>
            {movie?.title}
            <span className='movie-year'>{movie?.release_date}</span>
          </p>
          <p className='movie-tagline'>{movie?.tagline}</p>
          <p className='movie-overview'>
            {movie?.overview}
            <div className='movie-genre-container'>
              {movie?.genres.map((value, index) => (
                <div
                  className='movie-genre'
                  key={index}
                >
                  {value.name}
                </div>
              ))}
            </div>
          </p>
        </div>
        <div className='movie-rating'>
          <div className='action-row1'>
            <div
              className='watch'
              onClick={handleWatch}
            >
              {watched ? (
                <>
                  <FaEye className='green-icon' />
                  <p>Watched</p>
                </>
              ) : (
                <>
                  <FaRegEye />
                  <p>Watch</p>
                </>
              )}
            </div>
            <div
              className='like'
              onClick={handleLike}
            >
              {liked ? (
                <>
                  <FaHeart className='red-icon' />
                  <p>Liked</p>
                </>
              ) : (
                <>
                  <FaRegHeart />
                  <p>Like</p>
                </>
              )}
            </div>
            <div
              className='watch-list'
              onClick={handleWatchList}
            >
              {watchList ? <FaClock className='blue-icon' /> : <FaRegClock />}
              <p>Watchlist</p>
            </div>
          </div>
          <div className='action-row2'>
            <p>Ratings</p>
            {Array(rating)
              .fill(null)
              .map((_value, index) => (
                <FaStar
                  key={index}
                  className='star'
                />
              ))}
            {Array(5 - rating)
              .fill(null)
              .map((_value, index) => (
                <FaRegStar
                  key={index}
                  className='star'
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoviePage;
