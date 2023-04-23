import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function Detail() {
  let { movieId } = useParams();
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState([]);
  const getMovie = async () => {
    const response = await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${movieId}`);
    const movieData = await response.json();
    setDetails(movieData.data.movie);
    setLoading(false);
    console.log(movieData);
  };
  useEffect(() => {
    getMovie();
  }, []);
  console.log(details);
  return loading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <button>
        <Link to="/">go home</Link>
      </button>
      <h1>{details.title}</h1>
      <div>
        <img src={details.medium_cover_image} alt="cover_img" />
      </div>
      <ul>
        <li>description: {details.description_full}</li>
        <li>year: {details.year}</li>
        <li>
          genre:
          <ul>
            {details.genres.map((genre, index) => (
              <li key={index}>{genre}</li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default Detail;
