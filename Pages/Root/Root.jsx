import React from 'react';

import { Outlet } from 'react-router';

import Navbar from '../../src/Component/Navbar/Navbar';
import Footer from '../../src/Component/Footer/Footer';

export const Root = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box'
    }}>
<Navbar></Navbar>

      <main style={{
        flex: 1,
        width: '100%',
        overflow: 'visible', // Ensures content isn't clipped
        position: 'relative' // For any absolute positioned children
      }}>
<Outlet></Outlet>
      </main>

   <Footer></Footer>
    </div>
  );
}