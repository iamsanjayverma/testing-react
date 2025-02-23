import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const ProductContext = createContext();

// Create the provider component
export const ProductProvider = ({ children }) => {
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const apiKey = process.env.REACT_APP_PRODUCT_SECRET_KEY;
    const apiUrl = process.env.REACT_APP_PRODUCT_API_VIEW_URL;

    const fetchProduct = async () => {
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
            setProduct(data.products || []);
            console.log(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, []);

    return (
        <ProductContext.Provider value={{ product, loading, error }}>
            {children}
        </ProductContext.Provider>
    );
};
