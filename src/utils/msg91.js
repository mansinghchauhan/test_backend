import axios from 'axios';
import { MSG_91_API_KEY } from '../config'

const api = axios.create({
    baseURL: 'https://api.msg91.com/api/v5/'
});

export const sendOtp = async ({ phoneNumber }) => {
    try {
        const { data } = await api.post(`/otp?&mobile=${phoneNumber}&authkey=${MSG_91_API_KEY}`);
        return data.type === 'success';
    }
    catch (err) {
        console.log("ERR", err)
        throw err;
    }
}

export const verifyOtp = async ({ phoneNumber, otp }) => {
    try {
        const { data } = await api.post(`/otp/verify?otp=${otp}&mobile=${phoneNumber}&authkey=${MSG_91_API_KEY}`);
        return data.type === 'success';
    }
    catch (err) {
        console.log("ERR", err);
        throw err;
    }
}
