import React, { useState, useContext, useEffect } from 'react';
import { ProductProvider, ProductContext } from './ProductsContext'; // Adjust the path as needed
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
    const { product, loading, error } = useContext(ProductContext); // Fetch product data from context
    const { stores_Id, products_Id } = useParams(); // Fetch stores_Id and products_Id from the URL
    console.log(stores_Id, "store", products_Id, "product")

    const [filteredProduct, setFilteredProduct] = useState(null); // State for the specific product

    // Filter products by stores_Id and products_Id when products are loaded
    useEffect(() => {
        if (product && stores_Id && products_Id) {
            const specificProduct = product.find(
                (p) => p.store_id === parseInt(stores_Id) && p.id === parseInt(products_Id)
            );
            setFilteredProduct(specificProduct);
        }
    }, [product, stores_Id, products_Id]);

    // Loading state
    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    // Error handling
    if (error) {
        return <div>Error: {error}</div>;
    }

    // Message when no product is found
    if (!filteredProduct) {
        return <div className="alert alert-info">No product found for this store and product ID.</div>;
    }

    // Render the product details
    return (
        <>
        <section className='pt-3 pb-3'>
        <div className="container">

        <div className='p-3'>
                               <a href="/"><i class="bi bi-house"></i></a>
                               <span> / </span>
                               <a href={`/stores/${stores_Id}`}>Store</a>
                                                     
                    </div>

            <h2>Product Details for Store {stores_Id} and Product {products_Id}</h2>
            <table className="table table-bordered">
                <tbody>
                    <tr>
                        <th>ID</th>
                        <td>{filteredProduct.id}</td>
                    </tr>
                    <tr>
                        <th>Part Number</th>
                        <td>{filteredProduct.part_number}</td>
                    </tr>
                    <tr>
                        <th>Part Name</th>
                        <td>{filteredProduct.part_name}</td>
                    </tr>
                    <tr>
                        <th>Description</th>
                        <td>{filteredProduct.part_description}</td>
                    </tr>
                    <tr>
                        <th>Brand</th>
                        <td>{filteredProduct.brand}</td>
                    </tr>
                    <tr>
                        <th>Category</th>
                        <td>{filteredProduct.category}</td>
                    </tr>
                    <tr>
                        <th>Location</th>
                        <td>{filteredProduct.location}</td>
                    </tr>
                    <tr>
                        <th>HSN Number</th>
                        <td>{filteredProduct.hsn_number}</td>
                    </tr>
                    <tr>
                        <th>MRP</th>
                        <td>{filteredProduct.mrp}</td>
                    </tr>
                    <tr>
                        <th>Tax Description</th>
                        <td>{filteredProduct.tax_description}</td>
                    </tr>
                    <tr>
                        <th>Taxable Price</th>
                        <td>{filteredProduct.taxable_price}</td>
                    </tr>
                    <tr>
                        <th>Discount</th>
                        <td>{filteredProduct.discount}</td>
                    </tr>
                    <tr>
                        <th>Sale Price</th>
                        <td>{filteredProduct.sale_price}</td>
                    </tr>
                    <tr>
                        <th>Product Image</th>
                        <td className="">
                            {filteredProduct.images ? (
                                (() => {
                                    const decodedImages = filteredProduct.images.replace(/&quot;/g, '"'); // Replace HTML entities with actual quotes
                                    const imageArray = JSON.parse(decodedImages); // Parse the JSON string to an array

                                    return Array.isArray(imageArray) && imageArray.length > 0 ? (
                                        <div
                                            id={`carousel-${filteredProduct.id}`}
                                            className="carousel slide"
                                            data-bs-ride="carousel"
                                            style={{ maxWidth: '250px', maxHeight: '250px' }}
                                        >
                                            <div className="carousel-inner">
                                                {imageArray.map((image, index) => (
                                                    <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                                        <img
                                                            src={image}
                                                            alt={`Product Image ${index + 1}`}
                                                            className="d-block w-100 img-fluid rounded img-thumbnail"
                                                            style={{ maxWidth: '250px', maxHeight: '250px' }} // Limit size to 250x250
                                                        />
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Carousel controls (prev/next) that only show on hover */}
                                            <button
                                                className="carousel-control-prev text-bg-dark"
                                                type="button"
                                                data-bs-target={`#carousel-${filteredProduct.id}`}
                                                data-bs-slide="prev"
                                            >
                                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                <span className="visually-hidden">Previous</span>
                                            </button>
                                            <button
                                                className="carousel-control-next text-bg-dark"
                                                type="button"
                                                data-bs-target={`#carousel-${filteredProduct.id}`}
                                                data-bs-slide="next"
                                            >
                                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                <span className="visually-hidden">Next</span>
                                            </button>
                                        </div>
                                    ) : (
                                        'No Image'
                                    );
                                })()
                            ) : (
                                'No Image'
                            )}
                        </td>


                    </tr>
                </tbody>
            </table>
        </div>
        </section>
        </>
    );
};

const ProductDetailsPage = () => {
    return (
        <ProductProvider>
            <ProductDetails />
        </ProductProvider>
    );
};

export default ProductDetailsPage;
