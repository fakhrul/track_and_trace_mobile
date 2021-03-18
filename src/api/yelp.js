import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.yelp.com/v3/businesses',
    headers: {
        Authorization: 'Bearer TUq8Ux-s2iLMjB26b8jkOKmOnkshipwUmWgwZNTNRYmReORlxLGzLJAGCUvq4bNXGYF_WDLOy5U3KzWiPiWYVPxjpTGOEz8zSLybDYxpNGOgSynNRx-CWG753991XXYx' 
    }
});