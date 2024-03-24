import httpStatus from 'http-status';
import {
  createMovieService,
  deleteMovieService,
  getMovieByIdService,
  getMoviesService,
  updateMovieService,
} from '../service/movie.service.js';
import ApiError from '../utils/apiError.js';

const getMoviesController = async (req, res, next) => {
  try {
    const response = await getMoviesService();
    res.locals.response = response;
    next();
  } catch (error) {
    console.log(`error occurred in movie controller ${error}`);
    next(error);
  }
};

const getMovieByIdController = async (req, res, next) => {
  try {
    const response = await getMovieByIdService(req, res, next);
    if (!response) {
      throw new ApiError(httpStatus.NOT_FOUND, 'movie not found');
    }
    res.locals.response = response;
    next();
  } catch (error) {
    console.log(`error occurred in movie controller ${error}`);
    next(error);
  }
};

const createMovieController = async (req, res, next) => {
  try {
    const response = await createMovieService(req, res, next);
    res.locals.response = response;
    next();
  } catch (error) {
    console.log(`error occurred in movie controller ${error}`);
    next(error);
  }
};

const updateMovieController = async (req, res, next) => {
  try {
    const response = await updateMovieService(req, res, next);
    res.locals.response = response;
    next();
  } catch (error) {
    console.log(`error occurred in movie controller ${error}`);
    next(error);
  }
};

const deleteMovieController = async (req, res, next) => {
  try {
    const response = await deleteMovieService(req, res, next);
    res.locals.response = response;
    next();
  } catch (error) {
    console.log(`error occurred in movie controller ${error}`);
    next(error);
  }
};

export {
  getMoviesController,
  getMovieByIdController,
  createMovieController,
  updateMovieController,
  deleteMovieController,
};
