
import axios from 'axios';
import { toast } from 'react-toastify';
import { apiURL } from '../utils/constants/apiConstant';

export const getReviewList = async () => {
    const url = `${apiURL.review}`;
    return axios
        .get(url)
        .then((response) => response.data)
        .catch((error) => {
            toast.error(error?.response?.data?.message || 'Some Error Occured');
            return null;
        });
};

export const getReviewById = async (id) => {
    const url = `${apiURL.review}/${id}`;
    return axios
        .get(url)
        .then((response) => response.data)
        .catch((error) => {
            toast.error(error?.response?.data?.message || 'Some Error Occured');
            return null;
        });
};

export const getReviewByMovieId = async (id) => {
    const url = `${apiURL.review}?id=${id}&byMovieId=true`;
    return axios
        .get(url)
        .then((response) => response.data)
        .catch((error) => {
            toast.error(error?.response?.data?.message || 'Some Error Occured');
            return null;
        });
};


export const addReview = async (body) => {
    return axios
        .post(apiURL.review, body)
        .then((response) => response.data)
        .catch((error) => {
            return error;
        });
};

export const updateReview = async (id, body) => {
    return axios
        .put(`${apiURL.review}/${id}`, body)
        .then((response) => response.data)
        .catch((error) => {
            return error;
        });
};


export const deleteReview = async (id) => {
    try {
        const response = await axios
            .delete(`${apiURL.review}/${id}`);
        return response.data;
    } catch (error) {
        return error;
    }
};