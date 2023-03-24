import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// export const API_BASE_PATH = 'http://192.168.101.2:8085';
export const get = async (uri: string) => {
    const BASE_URL = await AsyncStorage.getItem('SERVER_BASE_URL');
    return axios.get(BASE_URL + uri);
}
export const post = async (uri: string, data) => {
    const BASE_URL = await AsyncStorage.getItem('SERVER_BASE_URL');
    return axios.post(BASE_URL + uri, data);
}

export const getAuth = async (uri: string) => {
    const BASE_URL = await AsyncStorage.getItem('SERVER_BASE_URL');
    const token = await AsyncStorage.getItem('USER_TOKEN');
    return await axios.get(BASE_URL + uri, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}
export const postAuth = async (uri: string, data) => {
    const token = await AsyncStorage.getItem('USER_TOKEN');
    const BASE_URL = await AsyncStorage.getItem('SERVER_BASE_URL');
    return axios.post(BASE_URL + uri, data, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}