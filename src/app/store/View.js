import React, { useState, useContext } from 'react';
import { StoreProvider, StoreContext } from './StoreContext'; // Adjust the path

const StoreList = () => {
    const { stores, loading, error } = useContext(StoreContext);
    const [searchTerm, setSearchTerm] = useState('');

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

    // Filter stores based on the search term
    const filteredStores = stores.filter(store =>
        store.store_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.segment.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.customer_type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="">
            {/* Search Input */}
                <div className="d-lg-inline-flex d-sm-inline-flex mb-3">
                    <div className="justify-content-center"><input type="text" className="form-control" placeholder="Search stores by name, email, city, etc." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
                </div>

            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Store Name</th>
                            <th>Email</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Segment</th>
                            <th>Customer Type</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStores.length > 0 ? (
                            filteredStores.map((store) => (
                                <tr key={store.id}>
                                    <td>{store.id}</td>
                                    <td>{store.store_name}</td>
                                    <td>{store.email}</td>
                                    <td>{store.city}</td>
                                    <td>{store.state}</td>
                                    <td>{store.segment}</td>
                                    <td>{store.customer_type}</td>
                                    <td>
                                        <a href={`/stores/${store.id}`} className='btn btn-outline-success'>
                                            <i className="bi bi-eye">
                                                <span className="badge text-bg-success m-2">View Store</span>
                                            </i>
                                        </a>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="text-center">No stores found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const View = () => {
    return (
        <StoreProvider>
            <StoreList />
        </StoreProvider>
    );
};

export default View;
