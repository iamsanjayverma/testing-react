import React from 'react'
import { Outlet, Link } from "react-router-dom";
import Navbaar from './Navbaar'
import Footer from './footer'

function layout() {
  return (
    <>
    <Navbaar/>
      <Outlet />
      <Footer/>
    </>
  )
}

export default layout