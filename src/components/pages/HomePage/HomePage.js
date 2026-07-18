// src/pages/HomePage/HomePage.js

import SEO from '../../SEO/SEO';
import HeroSection from '../../HeroSection/HeroSection';
import HomeAround from '../../HotProperties/create';
import CustomerTestimonials from '../../CustomerTestimonials/CustomerTestimonials';
import HandholdingController from '../../Handholding/HandholdingController';
import FAQController from '../../FAQ/FAQController';
import FooterController from '../../Footer/FooterController';
import { HpWrapper } from './HomePageStyles';

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'Instayards',
    url: 'https://instayards.com',
    logo: 'https://instayards.com/logo.png',
    image: 'https://instayards.com/logo.png',
    description: 'Verified and exclusive luxury properties, apartments, villas and farmhouses in Gurugram.',
    areaServed: {
      '@type': 'City',
      name: 'Gurugram',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Gurugram',
      addressRegion: 'Haryana',
      addressCountry: 'IN',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Instayards',
    url: 'https://instayards.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://instayards.com/properties?search={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  },
];

const HomePage = () => {
  return (
    <>
      <SEO
        title="Luxury Properties in Gurugram | Apartments, Villas, Farmhouses | Instayards"
        description="Discover luxury properties in Gurugram with Instayards. Explore premium apartments, villas, farmhouses, ready-to-move homes and top residential projects."
        keywords="property in gurgaon, property in gurugram, luxury property in Gurugram, apartments in Gurugram, villas in Gurugram, farmhouses in Gurugram, flats in gurgaon, real estate in Gurugram, buy property in gurgaon"
        path="/"
        jsonLd={jsonLd}
      />

      <HpWrapper>
        <HeroSection />
        <HomeAround />
        <CustomerTestimonials />
        <HandholdingController />
        <FAQController />
        <FooterController />
      </HpWrapper>
    </>
  );
};

export default HomePage;