// src/pages/TermsPage.js
import Navbar from '../Navbar/Navbar';
import Terms from '../Terms/Terms';
import FooterController from '../Footer/FooterController';

const TermsPage = () => {
  return (
    <>
      <Navbar />
      <main>
        <Terms />
      </main>
      <FooterController />
    </>
  );
};

export default TermsPage;