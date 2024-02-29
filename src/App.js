
import './App.css';

import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element:<News pagesize={5} country='in' category='general' />,
  },
  {
    path: "/business",
    element:<News pagesize={5} country='in' category='business' />,
  },
  {
    path: "/health",
    element:<News pagesize={5} country='in' category='health' />,
  },
  {
    path: "/entertainment",
    element:<News pagesize={5} country='in' category='entertainment' />,
  },
  {
    path: "/science",
    element:<News pagesize={5} country='in' category='science' />,
  },
  {
    path: "/sports",
    element:<News pagesize={5} country='in' category='sports' />,
  },

]);

export default class App extends Component {

  
  render() {
    return (
      <>
        <Navbar />
    <RouterProvider router={router} />
               
      </>
    )
  }
}



