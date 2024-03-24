import express from 'express';
import {
  getMoviesController,
  getMovieByIdController,
  createMovieController,
  updateMovieController,
  deleteMovieController,
} from '../../controller/movie.controller.js';
import responseHandler from '../../middleware/responseHandler.js';

const router = express.Router();

router
  .route('/')
  .get(getMoviesController, responseHandler)
  .post(createMovieController, responseHandler);

router
  .route('/:movieId')
  .get(getMovieByIdController, responseHandler)
  .put(updateMovieController, responseHandler)
  .delete(deleteMovieController, responseHandler);

export default router;
