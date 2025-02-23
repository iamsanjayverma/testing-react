import React, { useState, useContext, useEffect } from 'react';
import { ProductProvider, ProductContext } from './ProductsContext'; // Adjust the path as needed
import { useParams , Link} from 'react-router-dom';

// const ProductDetails = () => {
//     const { product, loading, error } = useContext(ProductContext); // Fetch product data from context
//     const { storeId, productId } = useParams(); // Fetch storeId and productId from the URL

//     const [filteredProduct, setFilteredProduct] = useState(null); // State for the specific product

//     // Filter products by storeId and productId when products are loaded
//     useEffect(() => {
//         if (product && storeId && productId) {
//             const specificProduct = product.find(
//                 (p) => p.store_id === parseInt(storeId) && p.id === parseInt(productId)
//             );
//             setFilteredProduct(specificProduct);
//         }
//     }, [product, storeId, productId]);

//     // Loading state
//     if (loading) {
//         return (
//             <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
//                 <div className="spinner-border text-primary" role="status">
//                     <span className="visually-hidden">Loading...</span>
//                 </div>
//             </div>
//         );
//     }

//     // Error handling
//     if (error) {
//         return <div>Error: {error}</div>;
//     }

//     // Message when no product is found
//     if (!filteredProduct) {
//         return <div className="alert alert-info">No product found for this store and product ID.</div>;
//     }

//     // Render the product details
//     return (
//         <div className="container">
//             <h2>Product Details for Store {storeId} and Product {productId}</h2>
//             <table className="table table-bordered">
//                 <tbody>
//                     <tr>
//                         <th>ID</th>
//                         <td>{filteredProduct.id}</td>
//                     </tr>
//                     <tr>
//                         <th>Part Number</th>
//                         <td>{filteredProduct.part_number}</td>
//                     </tr>
//                     <tr>
//                         <th>Part Name</th>
//                         <td>{filteredProduct.part_name}</td>
//                     </tr>
//                     <tr>
//                         <th>Description</th>
//                         <td>{filteredProduct.part_description}</td>
//                     </tr>
//                     <tr>
//                         <th>Brand</th>
//                         <td>{filteredProduct.brand}</td>
//                     </tr>
//                     <tr>
//                         <th>Category</th>
//                         <td>{filteredProduct.category}</td>
//                     </tr>
//                     <tr>
//                         <th>Location</th>
//                         <td>{filteredProduct.location}</td>
//                     </tr>
//                     <tr>
//                         <th>HSN Number</th>
//                         <td>{filteredProduct.hsn_number}</td>
//                     </tr>
//                     <tr>
//                         <th>MRP</th>
//                         <td>{filteredProduct.mrp}</td>
//                     </tr>
//                     <tr>
//                         <th>Tax Description</th>
//                         <td>{filteredProduct.tax_description}</td>
//                     </tr>
//                     <tr>
//                         <th>Taxable Price</th>
//                         <td>{filteredProduct.taxable_price}</td>
//                     </tr>
//                     <tr>
//                         <th>Discount</th>
//                         <td>{filteredProduct.discount}</td>
//                     </tr>
//                     <tr>
//                         <th>Sale Price</th>
//                         <td>{filteredProduct.sale_price}</td>
//                     </tr>
//                 </tbody>
//             </table>
//         </div>
//     );
// };

const ProductDetailsPage = () => {
    return (
        <ProductProvider>
            <ProductDetails />
        </ProductProvider>
    );
};

export default ProductDetailsPage;

const ProductDetails = () => {
    const { product, loading, error } = useContext(ProductContext); // Fetch products from context
    const { id } = useParams(); // Get the store id from the URL
    const [filteredProducts, setFilteredProducts] = useState([]); // State to hold the filtered products

    // Filter products by store_id when products are loaded
    useEffect(() => {
        if (product && id) {
            const filtered = product.filter(p => p.store_id === parseInt(id));
            setFilteredProducts(filtered);
        }
    }, [product, id]);

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

    // Message when no products are found
    if (filteredProducts.length === 0) {
        return <div className="alert alert-info">No products found for this store.</div>;
    }

    // Render the filtered product list
    return (
        <div className="container">
            <h2>Products for Store {id}</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Part Number</th>
                        <th>Part Name</th>
                        <th>MRP</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.map(product => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.part_number}</td>
                            <td>{product.part_name}</td>
                            <td>{product.mrp}</td>
                            <td className="">
    {product.images ? (
        (() => {
            const decodedImages = product.images.replace(/&quot;/g, '"'); // Replace HTML entities with actual quotes
            const imageArray = JSON.parse(decodedImages); // Parse the JSON string to an array

            return Array.isArray(imageArray) && imageArray.length > 0 ? (
                <div
                    id={`carousel-${product.id}`}
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

                    {/* Carousel controls that only show on hover */}
                    <button
                        className="carousel-control-prev text-bg-dark d-none d-md-block"
                        type="button"
                        data-bs-target={`#carousel-${product.id}`}
                        data-bs-slide="prev"
                    >
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                        className="carousel-control-next text-bg-dark d-none d-md-block"
                        type="button"
                        data-bs-target={`#carousel-${product.id}`}
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

                            <td>
                                <Link to={`/stores/${product.store_id}/products/${product.id}`} className="btn btn-outline-success">
                                    <i className="bi bi-eye">
                                        <span className="badge text-bg-success m-2">View Product</span>
                                    </i>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};


