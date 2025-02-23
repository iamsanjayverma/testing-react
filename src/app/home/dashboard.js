import React, { useState } from 'react';
import Store from '../store/index';
import Products from '../product/ProductsList';
import Report from '../report/index';

function dashboard() {
  // State to manage the currently displayed component
  const [dashboard_handle, setDashboard_handle] = useState(<Store />);
  // State to manage which button is active
  const [activeButton, setActiveButton] = useState('store');

  const handleButtonClick = (component, buttonName) => {
    setDashboard_handle(component);
    setActiveButton(buttonName);
  };

  return (
    <section className='p-4'>
      <div className='container'>
        <div className='d-flex flex-wrap justify-content-center p-3'>
          <div className="btn-group" role="group" aria-label="Basic outlined example">
            <button
              type="button"
              className={`btn btn-outline-success ${activeButton === 'store' ? 'active' : ''}`}
              onClick={() => handleButtonClick(<Store />, 'store')}
            >
              <i className="bi bi-shop">
                <span className="badge text-bg-success m-2">Store</span>
              </i>
            </button>
            <button
              type="button"
              className={`btn btn-outline-success ${activeButton === 'product' ? 'active' : ''}`}
              onClick={() => handleButtonClick(<Products />, 'product')}
            >
              <i className="bi bi-cart-dash"></i>
              <span className="badge text-bg-success m-2">Product</span>
            </button>
            <button
              type="button"
              className={`btn btn-outline-success ${activeButton === 'report' ? 'active' : ''}`}
              onClick={() => handleButtonClick(<Report />, 'report')}
            >
              <i className="bi bi-file-richtext">
                <span className="badge text-bg-success m-2">Report</span>
              </i>
            </button>
          </div>
        </div>

        <div className=''>
          {dashboard_handle}
        </div>
      </div>
    </section>
  );
}

export default dashboard;
