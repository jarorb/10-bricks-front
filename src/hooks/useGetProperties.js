import { useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from 'axios';

const useGetProperties = (API) => {
	const { state, setProperties } = useContext(AppContext);
	const { properties } = state;
	useEffect(() => {
		async function fetchProperties() {
		  	const response = await axios(API);
			setProperties(response.data.data);
		}
		fetchProperties();
	}, []);
	
	return properties;
};

export { useGetProperties };
