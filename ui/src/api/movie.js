
import axios from 'axios';
import { toast } from 'react-toastify';
import { apiURL } from '../utils/constants/apiConstant';

export const getMovieList = async () => {
    const url = `${apiURL.movie}`;
    return axios
        .get(url)
        .then((response) => response.data)
        .catch((error) => {
            toast.error(error?.response?.data?.message || 'Some Error Occured');
            return null;
        });
};

export const getMovieById = async (id) => {
    const url = `${apiURL.movie}/${id}`;
    return axios
        .get(url)
        .then((response) => response.data)
        .catch((error) => {
            toast.error(error?.response?.data?.message || 'Some Error Occured');
            return null;
        });
};

export const addMovie = async (body) => {
    return axios
        .post(apiURL.movie, body)
        .then((response) => response.data)
        .catch((error) => {
            return error;
        });
};

export const updateMovie = async (id, body) => {
    return axios
        .put(`${apiURL.movie}/${id}`, body)
        .then((response) => response.data)
        .catch((error) => {
            return error;
        });
};


export const deleteMovie = async (id) => {
    try {
        const response = await axios
            .delete(`${apiURL.movie}/${id}`);
        return response.data;
    } catch (error) {
        return error;
    }
};