import httpStatus from 'http-status';
import Review from '../model/review.model.js';
import ApiError from '../utils/apiError.js';
import Movie from '../model/movie.model.js';

const getReviewsService = async (req, res) => {
  try {
    if (req.query.byMovieId) {
      const reviewBody = {
        movie_id: parseInt(req.query.id),
      };
      const response = await Review.getReviewbyMovieId(reviewBody);
      return response;
    }
    else {
      const response = await Review.getReview();
      return response;
    }
  } catch (error) {
    console.error(`error occured in review service ${error}`);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'something went wrong');
  }
};

const getReviewByIdService = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const reviewBody = {
      review_id: parseInt(reviewId),
    };
    const response = await Review.getReviewbyId(reviewBody);
    return response;
  } catch (error) {
    console.error(`error occured in review service ${error}`);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'something went wrong');
  }
};

const createReviewService = async (req, res) => {

  const { movie_id, reviewer_name, reviewer_rating, reviewer_comment } = req.body;

  try {
    const reviewBody = {
      movie_id,
      reviewer_name,
      reviewer_rating,
      reviewer_comment
    };
    const response = await Review.createReview(reviewBody);
    await Movie.updateMovieRating({ movie_id })
    return response;
  } catch (error) {
    console.error(`error occured in review service ${error}`);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'something went wrong');
  }
};

const updateReviewService = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { movie_id, reviewer_name, reviewer_rating, reviewer_comment } = req.body;
    const reviewBody = {
      review_id: reviewId,
      movie_id,
      reviewer_name,
      reviewer_rating,
      reviewer_comment
    };
    const response = await Review.updateReview(reviewBody);
    await Movie.updateMovieRating({ movie_id })
    return response;
  } catch (error) {
    console.error(`error occured in review service ${error}`);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'something went wrong');
  }
};

const deleteReviewService = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const reviewBody = {
      review_id: reviewId,
    };
    const response = await Review.deleteReview(reviewBody);
    return response;
  } catch (error) {
    console.error(`error occured in review service ${error}`);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'something went wrong');
  }
};

export {
  getReviewsService,
  getReviewByIdService,
  createReviewService,
  updateReviewService,
  deleteReviewService,
};
