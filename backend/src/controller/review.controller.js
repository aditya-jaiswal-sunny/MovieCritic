import httpStatus from 'http-status';
import {
  createReviewService,
  deleteReviewService,
  getReviewByIdService,
  getReviewsService,
  updateReviewService,
} from '../service/review.service.js';
import ApiError from '../utils/apiError.js';

const getReviewsController = async (req, res, next) => {
  try {
    const response = await getReviewsService(req, res);
    res.locals.response = response;
    next();
  } catch (error) {
    console.log(`error occurred in review controller ${error}`);
    next(error);
  }
};

const getReviewByIdController = async (req, res, next) => {
  try {
    const response = await getReviewByIdService(req, res);
    if (!response) {
      throw new ApiError(httpStatus.NOT_FOUND, 'review not found');
    }
    res.locals.response = response;
    next();
  } catch (error) {
    console.log(`error occurred in review controller ${error}`);
    next(error);
  }
};

const createReviewController = async (req, res, next) => {
  try {
    const response = await createReviewService(req, res);
    res.locals.response = response;
    next();
  } catch (error) {
    console.log(`error occurred in review controller ${error}`);
    next(error);
  }
};

const updateReviewController = async (req, res, next) => {
  try {
    const response = await updateReviewService(req, res);
    res.locals.response = response;
    next();
  } catch (error) {
    console.log(`error occurred in review controller ${error}`);
    next(error);
  }
};

const deleteReviewController = async (req, res, next) => {
  try {
    const response = await deleteReviewService(req, res);
    res.locals.response = response;
    next();
  } catch (error) {
    console.log(`error occurred in review controller ${error}`);
    next(error);
  }
};

export {
  getReviewsController,
  getReviewByIdController,
  createReviewController,
  updateReviewController,
  deleteReviewController,
};
