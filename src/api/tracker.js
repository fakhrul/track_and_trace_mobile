import axios from 'axios';
import { AsyncStorage} from 'react-native';

const instance = axios.create({
    baseURL: 'http://103.117.20.225:8001/api/eth/'
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