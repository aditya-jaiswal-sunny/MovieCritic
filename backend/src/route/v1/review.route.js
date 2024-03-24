import express from 'express';
import {
  getReviewsController,
  getReviewByIdController,
  createReviewController,
  updateReviewController,
  deleteReviewController,
} from '../../controller/review.controller.js';
import responseHandler from '../../middleware/responseHandler.js';

const router = express.Router();

router
  .route('/')
  .get(getReviewsController, responseHandler)
  .post(createReviewController, responseHandler);

router
  .route('/:reviewId')
  .get(getReviewByIdController, responseHandler)
  .put(updateReviewController, responseHandler)
  .delete(deleteReviewController, responseHandler);

export default router;
