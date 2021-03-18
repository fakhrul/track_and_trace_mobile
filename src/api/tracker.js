import axios from 'axios';
import { AsyncStorage} from 'react-native';

const instance = axios.create({
    baseURL: 'http://192.168.0.118:5005/api/eth/'
});

instance.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

export default instance;