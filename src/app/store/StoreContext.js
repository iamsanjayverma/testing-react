import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const StoreContext = createContext();

// Create the provider component
export const StoreProvider = ({ children }) => {
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const apiKey = process.env.REACT_APP_STORE_SECRET_KEY;
    const apiUrl = process.env.REACT_APP_STORE_API_VIEW_URL;

    const fetchStores = async () => {
        try {
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + apiKey
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setStores(data.stores || []);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStores();
    }, []);

    return (
        <StoreContext.Provider value={{ stores, loading, error }}>
            {children}
        </StoreContext.Provider>
    );
};
