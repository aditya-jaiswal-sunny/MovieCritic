import httpStatus from 'http-status';
import Movie from '../model/movie.model.js';
import ApiError from '../utils/apiError.js';

const getMoviesService = async (req, res) => {
  try {
    const response = await Movie.getMovie();
    return response;
  } catch (error) {
    console.error(`error occured in movie service ${error}`);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'something went wrong');
  }
};

const getMovieByIdService = async (req, res) => {
  try {
    const { movieId } = req.params;
    const movieBody = {
      movie_id: movieId,
    };
    const response = await Movie.getMoviebyId(movieBody);
    return response;
  } catch (error) {
    console.error(`error occured in movie service ${error}`);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'something went wrong');
  }
};

const createMovieService = async (req, res) => {
  try {

    const { movie_name, release_date } = req.body;

    console.log("ree", release_date);
    const dte = new Date(release_date);
    console.log("dd", dte);

    const movieBody = {
      movie_name: movie_name,
      movie_timestamp: new Date(release_date)
    };

    console.log("movieBody", movieBody);

    const response = await Movie.createMovie(movieBody);
    return response;
  } catch (error) {
    console.error(`error occured in movie service ${error}`);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'something went wrong');
  }
};

const updateMovieService = async (req, res) => {
  try {
    const { movieId } = req.params;
    const { movie_name, release_date } = req.body;

    const movieBody = {
      movie_id: movieId,
      movie_name: movie_name,
      movie_timestamp: new Date(release_date),

    };
    const response = await Movie.updateMovie(movieBody);
    return response;
  } catch (error) {
    console.error(`error occured in movie service ${error}`);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'something went wrong');
  }
};

const deleteMovieService = async (req, res) => {
  try {
    const { movieId } = req.params;
    const movieBody = {
      movie_id: movieId,
    };
    const response = await Movie.deleteMovie(movieBody);
    return response;
  } catch (error) {
    console.error(`error occured in movie service ${error}`);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'something went wrong');
  }
};

export {
  getMoviesService,
  getMovieByIdService,
  createMovieService,
  updateMovieService,
  deleteMovieService,
};
