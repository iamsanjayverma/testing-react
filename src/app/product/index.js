import React, { useState, useContext } from 'react';
import AddProducts from './Add'
import ViewProducts from './View';

function index() {
  const [activeButton, setActiveButton] = useState('add'); // Initialize state for active button
  const [productHandle, setProductHandle] = useState(<AddProducts />); // Initial component

  const handleButtonClick = (component, buttonType) => {
    setActiveButton(buttonType);
    setProductHandle(component); // Switch component
  };


  return (
    <>
      <section className=''>
          <div className="bg-light d-flex flex-wrap justify-content-center p-3">
            <div className="btn-group" role="group" aria-label="Basic outlined example">
              <button
                type="button"
                className={`btn btn-outline-success ${activeButton === 'add' ? 'active' : ''}`}
                onClick={() => handleButtonClick(<AddProducts />, 'add')}
              >
                <i class="bi bi-bag-plus-fill"></i>
              </button>
              <button
                type="button"
                className={`btn btn-outline-success ${activeButton === 'view' ? 'active' : ''}`}
                onClick={() => handleButtonClick(<ViewProducts />, 'view')}
              >
                <i class="bi bi-card-checklist"></i>                
              </button>

            </div>
          </div>

          <div className="">
            {productHandle}
          </div>

      </section></>
  )
}

export default index