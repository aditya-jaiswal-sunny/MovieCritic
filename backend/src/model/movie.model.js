import httpStatus from 'http-status';
import postgresDB from '../config/database.js';
import ApiError from '../utils/apiError.js';

const Movie = {
  getMovie: async (params) => {
    const query = 'SELECT * FROM MOVIE';
    try {
      const response = await postgresDB.query(query);
      return response.rows;
    } catch (error) {
      console.error(`error occured in movie model ${error}`);
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'error quering database');
    }
  },
  getMoviebyId: async (params) => {
    const query = 'SELECT * FROM MOVIE WHERE ID = $1';
    const values = [params.movie_id];
    try {
      const response = await postgresDB.query(query, values);
      return response.rows;
    } catch (error) {
      console.error(`error occured in movie model ${error}`);
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'error quering database');
    }
  },
  createMovie: async (params) => {
    const query = 'INSERT INTO MOVIE (NAME, RELEASEDATE) VALUES($1,$2) RETURNING *';
    const values = [params.movie_name, params.movie_timestamp];
    try {
      const response = await postgresDB.query(query, values);
      return response.rows;
    } catch (error) {
      console.error(`error occured in movie model ${error}`);
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'error quering database');
    }
  },

  updateMovie: async (params) => {
    const query = 'UPDATE MOVIE SET NAME = $2, RELEASEDATE = $3 WHERE ID = $1 RETURNING *';
    const values = [params.movie_id, params.movie_name, params.movie_timestamp];
    try {
      const response = await postgresDB.query(query, values);
      return response.rows;
    } catch (error) {
      console.error(`error occured in movie model ${error}`);
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'error quering database');
    }
  },

  updateMovieRating: async (params) => {
    const query = 'UPDATE MOVIE SET RATING = (SELECT AVG(RATING) FROM REVIEW WHERE MOVIEID = $1) WHERE ID = $1';
    const values = [params.movie_id];
    try {
      const response = await postgresDB.query(query, values);
      return response.rows;
    } catch (error) {
      console.error(`error occured in movie model ${error}`);
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'error quering database');
    }
  },
  
  deleteMovie: async (params) => {
    const query = 'DELETE FROM MOVIE WHERE ID = $1 RETURNING *';
    const values = [params.movie_id];
    try {
      const response = await postgresDB.query(query, values);
      return response.rows;
    } catch (error) {
      console.error(`error occured in movie model ${error}`);
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'error quering database');
    }
  },
};

export default Movie;
