import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Properties } from '../components/Properties';

const Home = () => {
    const { state } = useContext(AppContext);
    const { properties } = state
    return (
        <Properties properties={properties} />
    );
}

export { Home };