import React, { useState, useContext } from 'react';
import { ProductProvider, ProductContext } from './ProductsContext'; // Adjust the path

const ProductsList = () => {
    const { product, loading, error } = useContext(ProductContext);
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });



    // Sorting function
    const sortedProduct = [...product].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="">
            <h2>Product List</h2>
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>
                                <p>ID</p>
                                <span><i
                                    className={`ms-2 bi bi-arrow-${sortConfig.key === 'id' && sortConfig.direction === 'ascending' ? 'up' : 'down'}`}
                                    onClick={() => handleSort('id')}
                                    style={{ cursor: 'pointer' }}
                                ></i></span>
                            </th>
                            <th>
                                <p>Part Number</p>
                                <span><i
                                    className={`ms-2 bi bi-arrow-${sortConfig.key === 'part_number' && sortConfig.direction === 'ascending' ? 'up' : 'down'}`}
                                    onClick={() => handleSort('part_number')}
                                    style={{ cursor: 'pointer' }}
                                ></i></span>
                            </th>
                            <th>
                                <p>Part Name</p>
                                <span><i
                                    className={`ms-2 bi bi-arrow-${sortConfig.key === 'part_name' && sortConfig.direction === 'ascending' ? 'up' : 'down'}`}
                                    onClick={() => handleSort('part_name')}
                                    style={{ cursor: 'pointer' }}
                                ></i></span>
                            </th>
                            <th>
                                <p>Description</p>
                                <span><i
                                    className={`ms-2 bi bi-arrow-${sortConfig.key === 'part_description' && sortConfig.direction === 'ascending' ? 'up' : 'down'}`}
                                    onClick={() => handleSort('part_description')}
                                    style={{ cursor: 'pointer' }}
                                ></i></span>
                            </th>
                            <th>
                                <p>Brand</p>
                                <span><i
                                    className={`ms-2 bi bi-arrow-${sortConfig.key === 'brand' && sortConfig.direction === 'ascending' ? 'up' : 'down'}`}
                                    onClick={() => handleSort('brand')}
                                    style={{ cursor: 'pointer' }}
                                ></i></span>
                            </th>
                            <th>
                                <p>Category</p>
                                <span><i
                                    className={`ms-2 bi bi-arrow-${sortConfig.key === 'category' && sortConfig.direction === 'ascending' ? 'up' : 'down'}`}
                                    onClick={() => handleSort('category')}
                                    style={{ cursor: 'pointer' }}
                                ></i></span>
                            </th>
                            <th>
                                <p>Location</p>
                                <span><i
                                    className={`ms-2 bi bi-arrow-${sortConfig.key === 'location' && sortConfig.direction === 'ascending' ? 'up' : 'down'}`}
                                    onClick={() => handleSort('location')}
                                    style={{ cursor: 'pointer' }}
                                ></i></span>
                            </th>
                            <th>
                                <p>HSN Number</p>
                                <span><i
                                    className={`ms-2 bi bi-arrow-${sortConfig.key === 'hsn_number' && sortConfig.direction === 'ascending' ? 'up' : 'down'}`}
                                    onClick={() => handleSort('hsn_number')}
                                    style={{ cursor: 'pointer' }}
                                ></i></span>
                            </th>
                            <th>
                                <p>MRP</p>
                                <span><i
                                    className={`ms-2 bi bi-arrow-${sortConfig.key === 'mrp' && sortConfig.direction === 'ascending' ? 'up' : 'down'}`}
                                    onClick={() => handleSort('mrp')}
                                    style={{ cursor: 'pointer' }}
                                ></i></span>
                            </th>
                            <th>
                                <p>Tax Description</p>
                                <span><i
                                    className={`ms-2 bi bi-arrow-${sortConfig.key === 'tax_description' && sortConfig.direction === 'ascending' ? 'up' : 'down'}`}
                                    onClick={() => handleSort('tax_description')}
                                    style={{ cursor: 'pointer' }}
                                ></i></span>
                            </th>
                            <th>
                                <p>Taxable Price</p>
                                <span><i
                                    className={`ms-2 bi bi-arrow-${sortConfig.key === 'taxable_price' && sortConfig.direction === 'ascending' ? 'up' : 'down'}`}
                                    onClick={() => handleSort('taxable_price')}
                                    style={{ cursor: 'pointer' }}
                                ></i></span>
                            </th>
                            <th>
                                <p>Discount</p>
                                <span><i
                                    className={`ms-2 bi bi-arrow-${sortConfig.key === 'discount' && sortConfig.direction === 'ascending' ? 'up' : 'down'}`}
                                    onClick={() => handleSort('discount')}
                                    style={{ cursor: 'pointer' }}
                                ></i></span>
                            </th>
                            <th>
                                <p>Sale Price</p>
                                <span><i
                                    className={`ms-2 bi bi-arrow-${sortConfig.key === 'sale_price' && sortConfig.direction === 'ascending' ? 'up' : 'down'}`}
                                    onClick={() => handleSort('sale_price')}
                                    style={{ cursor: 'pointer' }}
                                ></i></span>
                            </th>
                            <th>
                                <p>Images</p>
                                <span><i
                                    className={`ms-2 bi bi-arrow-${sortConfig.key === 'images' && sortConfig.direction === 'ascending' ? 'up' : 'down'}`}
                                    onClick={() => handleSort('images')}
                                    style={{ cursor: 'pointer' }}
                                ></i></span>
                            </th>
                            <th>
                                <p>Segment</p>
                                <span><i
                                    className={`ms-2 bi bi-arrow-${sortConfig.key === 'segment' && sortConfig.direction === 'ascending' ? 'up' : 'down'}`}
                                    onClick={() => handleSort('segment')}
                                    style={{ cursor: 'pointer' }}
                                ></i></span>
                            </th>
                            <th>
                                <p>Store ID</p>
                                <span><i
                                    className={`ms-2 bi bi-arrow-${sortConfig.key === 'store_id' && sortConfig.direction === 'ascending' ? 'up' : 'down'}`}
                                    onClick={() => handleSort('store_id')}
                                    style={{ cursor: 'pointer' }}
                                ></i></span>
                            </th>
                            <th>
                                <p>Store Name</p>
                                <span><i
                                    className={`ms-2 bi bi-arrow-${sortConfig.key === 'store_name' && sortConfig.direction === 'ascending' ? 'up' : 'down'}`}
                                    onClick={() => handleSort('store_name')}
                                    style={{ cursor: 'pointer' }}
                                ></i></span>
                            </th>
                            <th>
                                <p>Actions</p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedProduct.map((products) => (
                            <tr key={products.id}>
                                <td>{products.id}</td>
                                <td>{products.part_number}</td>
                                <td>{products.part_name}</td>
                                <td>{products.part_description}</td>
                                <td>{products.brand}</td>
                                <td>{products.category}</td>
                                <td>{products.location}</td>
                                <td>{products.hsn_number}</td>
                                <td>{products.mrp}</td>
                                <td>{products.tax_description}</td>
                                <td>{products.taxable_price}</td>
                                <td>{products.discount}</td>
                                <td>{products.sale_price}</td>
                                <td className=''>
                                    {products.images ? (
                                        (() => {
                                            const decodedImages = products.images.replace(/&quot;/g, '"'); // Replace HTML entities with actual quotes
                                            const imageArray = JSON.parse(decodedImages); // Parse the JSON string to an array

                                            return Array.isArray(imageArray) && imageArray.length > 0 ? (
                                                imageArray.map((image, index) => (
                                                    <img key={index} src={image} alt={`products Image ${index + 1}`} className='img-fluid rounded img-thumbnail' />
                                                ))
                                            ) : (
                                                'No Image'
                                            );
                                        })()
                                    ) : (
                                        'No Image'
                                    )}
                                </td>

                                <td>{products.segment}</td>
                                <td>{products.store_id}</td>
                                <td>{products.store_name}</td>
                                <td>
                                    <a href={`/stores/${products.store_id}/products/${products.id}`} className="btn btn-outline-success">
                                        <i className="bi bi-eye">
                                            {/* <span className="badge text-bg-success m-2">View Product</span> */}
                                        </i>
                                    </a>
                                    <a href={`/stores/${products.store_id}/products/${products.id}/edit`} className="btn btn-outline-success">
                                    <i class="bi bi-pencil-square"></i>
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const View = () => {
    return (
        <ProductProvider>
            <ProductsList />
        </ProductProvider>
    );
};

export default View;
