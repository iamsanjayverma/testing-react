import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { StoreProvider, StoreContext } from './StoreContext'; // Adjust the path
import Products from '../product/index'


function Profile() {
    const [activeButton, setActiveButton] = useState('add'); // Initialize state for active button
    const [profileHandle, setProfileHandle] = useState(<StoreProfile />); // Initial component

    const handleButtonClick = (component, buttonType) => {
        setActiveButton(buttonType);
        setProfileHandle(component); // Switch component
    };

    return (
        <StoreProvider>
            <section className='pt-3'>
                <div className="container">

                    <div className='p-3'>
                               <a href="/"><i class="bi bi-house"></i></a>
                               <span> / </span>
                                <span className="text-success" >Store</span>                          
                    </div>

                    <div className="bg-light d-flex flex-wrap justify-content-center p-3">
                        <div className="btn-group" role="group" aria-label="Basic outlined example">
                            <button
                                type="button"
                                className={`btn btn-outline-success ${activeButton === 'add' ? 'active' : ''}`}
                                onClick={() => handleButtonClick(<StoreProfile />, 'add')}
                            >
                                <i className="bi bi-shop">
                                    <span className="badge text-bg-success m-2">Profile</span>
                                </i>
                            </button>
                            <button
                                type="button"
                                className={`btn btn-outline-success ${activeButton === 'view' ? 'active' : ''}`}
                                onClick={() => handleButtonClick(<Products />, 'view')}
                            >
                                <i className="bi bi-cart-dash">
                                    <span className="badge text-bg-success m-2">Products</span>
                                </i>
                            </button>

                        </div>
                    </div>

                    {/* Render the active component */}
                    <div className="">
                        {profileHandle}
                    </div>
                </div>
            </section>
        </StoreProvider>
    );
}

export default Profile;



const StoreProfile = () => {
    const { id } = useParams(); // Get the store ID from the URL
    const { stores, loading, error } = useContext(StoreContext);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // Find the store by ID
    const store = stores.find((store) => store.id === parseInt(id)); // Assuming store.id is an integer

    if (!store) {
        return <div>No store found with ID {id}</div>;
    }

    return (
        <div className="row p-3">
            <div className='col-lg-8 col-sm-8 col-xs-12'>
                <div className='row flex-wrap'>
                    <div className='col-lg-6 col-sm-6 col-xs-12'>
                        <div className='profile-block'>
                            <h2 className='fs-5 fw-bold'>Store Name : <span className='fw-medium'>{store.store_name}</span></h2>
                        </div>
                    </div>

                    <div className='col-lg-6 col-sm-6 col-xs-12'>
                        <div className='profile-block'>
                            <h2 className='fs-5 fw-bold'>Owner Name : <span className='fw-medium'>{store.store_owner_name}</span></h2>
                        </div>
                    </div>
                    <div className='col-lg-6 col-sm-6 col-xs-12'>
                        <div className='profile-block'>
                            <h2 className='fs-5 fw-bold'>Contact Number : <span className='fw-medium'>{store.mobile_number}</span></h2>
                        </div>
                    </div>
                    <div className='col-lg-6 col-sm-6 col-xs-12'>
                        <div className='profile-block'>
                            <h2 className='fs-5 fw-bold'>Alternative Number : <span className='fw-medium'>{store.alternative_number || 'N/A'}</span></h2>
                        </div>
                    </div>
                    <div className='col-lg-6 col-sm-6 col-xs-12'>
                        <div className='profile-block'>
                            <h2 className='fs-5 fw-bold'>Email Address : <span className='fw-medium'>{store.email}</span></h2>
                        </div>
                    </div>
                    <div className='col-lg-6 col-sm-6 col-xs-12'>
                        <div className='profile-block'>
                            <h2 className='fs-5 fw-bold'>Pincode : <span className='fw-medium'>{store.pincode}</span></h2>
                        </div>
                    </div>

                    <div className='col-lg-6 col-sm-6 col-xs-12'>
                        <div className='profile-block'>
                            <h2 className='fs-5 fw-bold'>City : <span className='fw-medium'>{store.city}</span></h2>
                        </div>
                    </div>
                    <div className='col-lg-6 col-sm-6 col-xs-12'>
                        <div className='profile-block'>
                            <h2 className='fs-5 fw-bold'>State : <span className='fw-medium'>{store.state}</span></h2>
                        </div>
                    </div>

                    <div className='col-lg-6 col-sm-6 col-xs-12'>
                        <div className='profile-block'>
                            <h2 className='fs-5 fw-bold'>Gst Number : <span className='fw-medium'>{store.gst_number || 'N/A'}</span></h2>
                        </div>
                    </div>

                    <div className='col-lg-6 col-sm-6 col-xs-12'>
                        <div className='profile-block'>
                            <h2 className='fs-5 fw-bold'>Pancard Number : <span className='fw-medium'>{store.pan_card_number || 'N/A'}</span></h2>
                        </div>
                    </div>

                    <div className='col-lg-6 col-sm-6 col-xs-12'>
                        <div className='profile-block'>
                            <h2 className='fs-5 fw-bold'>Segment : <span className='fw-medium'>{store.segment}</span></h2>
                        </div>
                    </div>

                    <div className='col-lg-6 col-sm-6 col-xs-12'>
                        <div className='profile-block'>
                            <h2 className='fs-5 fw-bold'>Customer Type <span>{store.customer_type}</span></h2>
                        </div>
                    </div>

                </div>

            </div>
            <div className='col-lg-4 col-sm-4 col-xs-12'>
                <div className=''>

                    {store.images ? (
                        (() => {
                            const decodedImages = store.images.replace(/&quot;/g, '"'); // Replace HTML entities with actual quotes
                            const imageArray = JSON.parse(decodedImages); // Parse the JSON string to an array

                            return Array.isArray(imageArray) && imageArray.length > 0 ? (
                                imageArray.map((image, index) => (
                                    <img key={index} src={image} alt={`Store Image ${index + 1}`} className='img-fluid rounded img-thumbnail' />
                                ))
                            ) : (
                                'No Image'
                            );
                        })()
                    ) : (
                        'No Image'
                    )}
                </div>
            </div>

        </div>
    );
};

