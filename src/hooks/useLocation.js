import {useState, useEffect} from 'react';
import{
    Accuracy,
    requestPermissionsAsync,
    watchPositionAsync
} from 'expo-location';

export default (shouldTrack, callback) => {
    // shouldTrack = true;
    const [err, setErr] = useState(null);
    // const [subscriber, setSubscriber] = useState(null);

    useEffect(() => {
        let subscriber;

        const startwatching = async () => {
            try {
                await requestPermissionsAsync();      
                const subscriber = await watchPositionAsync({
                    accuracy: Accuracy.BestForNavigation,
                    timeInterval: 1000,
                    distanceInterval: 10
                }, 
                callback
                // (location) => {
                //     // console.log(location);
                //     addLocation(location);
                // }
                );
            }catch(e){
                setErr(e);
            }
    
        };

        if(shouldTrack){
            startwatching();
        } else {
            if(subscriber){
                subscriber.remove();
            }
            subscriber = null;
        }

        return () => {
            if(subscriber){
                subscriber.remove();
            }
        }
    }, [shouldTrack, callback]);

    return [err];
};