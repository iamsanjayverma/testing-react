import React, { useState } from 'react';
import Add from './Add.js';
import View from './View.js';
import Delete from './Delete.js';

function Index() {
  // State to manage the currently displayed component
  const [store_handle, setStore_handle] = useState(<View />);
  // State to manage which button is active
  const [activeButton, setActiveButton] = useState('view');

  const handleButtonClick = (component, buttonName) => {
    setStore_handle(component);
    setActiveButton(buttonName);
  };

  return (
    <>
      <div className='bg-light d-flex flex-wrap justify-content-center p-3'>
        <div className="btn-group" role="group" aria-label="Basic outlined example">
          <button
            type="button"
            className={`btn btn-outline-success ${activeButton === 'add' ? 'active' : ''}`}
            onClick={() => handleButtonClick(<Add />, 'add')}
          >
            <i className="bi bi-house-add">
              <span className="badge text-bg-success m-2">Add</span>
            </i>
          </button>
          <button
            type="button"
            className={`btn btn-outline-success ${activeButton === 'view' ? 'active' : ''}`}
            onClick={() => handleButtonClick(<View />, 'view')}
          >
            <i className="bi bi-shop">
              <span className="badge text-bg-success m-2">View</span>
            </i>
          </button>
          <button
            type="button"
            className={`btn btn-outline-success ${activeButton === 'delete' ? 'active' : ''}`}
            onClick={() => handleButtonClick(<Delete />, 'delete')}
          >
            <i className="bi bi-archive">
              <span className="badge text-bg-success m-2">Delete</span>
            </i>
          </button>
        </div>
      </div>

      <div className='bg-light p-3'>
        {store_handle}
      </div>
    </>
  );
}

export default Index;
