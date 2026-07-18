// src/pages/CareersPage.js
import React from 'react';
import Navbar from '../Navbar/Navbar';
import Careers from '../Careers/Careers';
import FooterController from '../Footer/FooterController';

const CareersPage = () => {
  return (
    <>
      <Navbar />
      <main>
        <Careers />
      </main>
      <FooterController />
    </>
  );
};

export default CareersPage;