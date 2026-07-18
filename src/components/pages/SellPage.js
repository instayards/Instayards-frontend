// src/pages/SellPage.js
import Navbar from '../Navbar/Navbar';
import SellProperty from '../SellProperty/SellProperty';
import FooterController from '../Footer/FooterController';


const SellPage = () => {
  return (
    <>
      <Navbar />
      <main>
        <SellProperty />
      </main>
      <FooterController />
    </>
  );
};

export default SellPage;