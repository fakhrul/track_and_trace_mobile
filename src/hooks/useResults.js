import {useEffect, useState} from 'react';
import yelp from '../api/yelp';

export default () => {

    const [results, setResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const searchApi = async (searchTerm) => {
        try{
            const response = await yelp.get('/search', {
                params: {
                    limit: 10,
                    term: searchTerm,
                    location: 'kuala lumpur'
                }
            });
            setErrorMessage('');
            setResults(response.data.businesses);
        }catch (err)
        {
            console.log(err);
            setErrorMessage('Something went wrong');
        }

    }

    useEffect(() => {
        searchApi('restaurant'); //default search
    }, []);

    return [searchApi, results, errorMessage];
};
