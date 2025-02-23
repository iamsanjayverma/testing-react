import React, { useEffect, useState } from 'react';

function footer() {


  return (
    <>
      <footer
        className='position-relative text-center bg-dark text-white w-100'>
        <div className="container p-3">
          <a
            className="btn btn-link btn-floating btn-lg text-white m-1"
            href="#!"
            role="button"
            data-mdb-ripple-color="dark"
          >
            <i className="fa fa-facebook-f"></i>
          </a>

          <a
            className="btn btn-link btn-floating btn-lg text-white m-1"
            href="#!"
            role="button"
            data-mdb-ripple-color="dark"
          >
            <i className="fa fa-twitter"></i>
          </a>

          <a
            className="btn btn-link btn-floating btn-lg text-white m-1"
            href="#!"
            role="button"
            data-mdb-ripple-color="dark"
          >
            <i className="fa fa-google"></i>
          </a>

          <a
            className="btn btn-link btn-floating btn-lg text-white m-1"
            href="#!"
            role="button"
            data-mdb-ripple-color="dark"
          >
            <i className="fa fa-instagram"></i>
          </a>

          <a
            className="btn btn-link btn-floating btn-lg text-white m-1"
            href="#!"
            role="button"
            data-mdb-ripple-color="dark"
          >
            <i className="fa fa-linkedin"></i>
          </a>

          <a
            className="btn btn-link btn-floating btn-lg text-white m-1"
            href="#!"
            role="button"
            data-mdb-ripple-color="dark"
          >
            <i className="fa fa-github"></i>
          </a>
        </div>
      </footer>
    </>
  );
}

export default footer;
