import httpStatus from 'http-status';
import postgresDB from '../config/database.js';
import ApiError from '../utils/apiError.js';

const Review = {
    getReview: async (params) => {
        const query = 'SELECT * FROM REVIEW';
        try {
            const response = await postgresDB.query(query);
            return response.rows;
        } catch (error) {
            console.error(`error occured in review model ${error}`);
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'error quering database');
        }
    },

    getReviewbyMovieId: async (params) => {
        const query = 'SELECT * FROM REVIEW WHERE MOVIEID = $1';
        const values = [params.movie_id];
        try {
            const response = await postgresDB.query(query, values);
            return response.rows;
        } catch (error) {
            console.error(`error occured in review model ${error}`);
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'error quering database');
        }
    },

    getReviewbyId: async (params) => {
        const query = 'SELECT * FROM REVIEW WHERE ID = $1';
        const values = [params.review_id];
        try {
            const response = await postgresDB.query(query, values);
            return response.rows;
        } catch (error) {
            console.error(`error occured in review model ${error}`);
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'error quering database');
        }
    },

    createReview: async (params) => {
        const query = 'INSERT INTO REVIEW (MOVIEID, NAME, RATING, COMMENT) VALUES($1,$2,$3,$4) RETURNING *';
        const values = [params.movie_id, params.reviewer_name, params.reviewer_rating, params.reviewer_comment];
        try {
            const response = await postgresDB.query(query, values);
            return response.rows;
        } catch (error) {
            console.error(`error occured in review model ${error}`);
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'error quering database');
        }
    },


    updateReview: async (params) => {
        const query = 'UPDATE REVIEW SET MOVIEID= $2 , NAME = $3, RATING = $4 , COMMENT = $5 WHERE ID = $1';
        const values = [params.review_id, params.movie_id, params.reviewer_name, params.reviewer_rating, params.reviewer_comment];
        try {
            const response = await postgresDB.query(query, values);
            return response.rows;
        } catch (error) {
            console.error(`error occured in review model ${error}`);
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'error quering database');
        }
    },
    deleteReview: async (params) => {
        const query = 'DELETE FROM REVIEW WHERE ID = $1';
        const values = [params.review_id];
        try {
            const response = await postgresDB.query(query, values);
            return response.rows;
        } catch (error) {
            console.error(`error occured in review model ${error}`);
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'error quering database');
        }
    },
};

export default Review;
