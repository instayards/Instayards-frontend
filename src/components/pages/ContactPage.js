// src/pages/ContactPage.js
import React from 'react';
import Navbar from '../Navbar/Navbar';
import Contact from '../Contact/Contact';
import FooterController from '../Footer/FooterController';

const ContactPage = () => {
  return (
    <>
      <Navbar />
      <main>
        <Contact />
      </main>
      <FooterController />
    </>
  );
};

export default ContactPage;