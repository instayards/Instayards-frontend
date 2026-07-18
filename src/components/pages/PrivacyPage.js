// src/pages/PrivacyPage.js
import Navbar from '../Navbar/Navbar';
import PrivacyPolicy from '../PrivacyPolicy/PrivacyPolicy';
import FooterController from '../Footer/FooterController';

const PrivacyPage = () => {
  return (
    <>
      <Navbar />
      <main>
        <PrivacyPolicy />
      </main>
      <FooterController />
    </>
  );
};

export default PrivacyPage;