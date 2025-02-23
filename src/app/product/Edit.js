import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProductProvider, ProductContext } from './ProductsContext';

const Edit = () => {
    return (
        <ProductProvider>
            <ProductEdit />
        </ProductProvider>
    );
};

export default Edit;

const ProductEdit = () => {
    const { product, loading, error } = useContext(ProductContext);
    const { stores_Id, products_Id } = useParams(); // Get store and product IDs from URL
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (product.length > 0 && products_Id) {
            const specificProduct = product.find((p) => p.id === parseInt(products_Id));

            if (specificProduct) {
                setFormData(specificProduct);
            }
        }
    }, [product, products_Id]);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://admin.kesho.in/api/product/edit.php', { // Replace with your actual edit.php URL
                method: 'POST', // or 'PUT' based on your API
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ // Send updated product data
                    ...formData,
                    store_id: stores_Id, // Include the store ID if necessary
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update product');
            }

            const result = await response.json();
            console.log('Product updated successfully:', result);
            // Optionally, you can redirect the user or display a success message
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!formData) {
        return <div>No product found</div>;
    }

    return (
        <div className="container">

            <div className='p-3'>
                <a href="/"><i class="bi bi-house"></i></a>
                <span> / </span>
                <a href={`/stores/${stores_Id}`}>Store</a>

            </div>

            <h2>Edit Product</h2>
            <form onSubmit={handleSubmit}>
            <div className='row'>
                {Object.keys(formData).map((key) => (
                    key !== 'id' && key !== 'store_id' ? (
                        
                        <div className="col-lg-4 col-sm-4 mb-3" key={key}>
                            <label htmlFor={key} className="form-label">
                                {key.replace(/_/g, ' ').toUpperCase()}
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id={key}
                                name={key}
                                value={formData[key] || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                    
                    ) : null
                ))}
                <button type="submit" className="btn btn-primary">Save Changes</button>
                </div>
            </form>
        </div>
    );
};


