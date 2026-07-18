// src/components/NewlyLaunch/newlaunch.js
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAllNewLaunches } from '../../services/newlaunchApi';
import SEO from '../SEO/SEO';
import { FaTree, FaBuilding, FaHome, FaRulerCombined } from 'react-icons/fa';
import { BsFillImageFill } from 'react-icons/bs';
import {
  NlContainer, NlPageTitle, NlGrid,
  NlCard, NlImageCarousel, NlPropertyImage, NlImagePlaceholder,
  NlStatusBadge, NlCarouselBtn, NlImageCounter,
  NlContents, NlPropertyName, NlConfigBadges, NlConfigBadge,
  NlPriceSection, NlPriceLabel, NlPriceValue,
  NlStatsContainer, NlStatsRow, NlStatPair, NlStatIcon, NlStatValue, NlStatLabel,
  NlEnquiryBtn, NlLoading, NlNoProperties,
} from './NewLaunchStyles';

const Stat = ({ icon, value, label }) => {
  if (!value) return null;
  return (
    <NlStatPair>
      <NlStatIcon>{icon}</NlStatIcon>
      <div>
        <NlStatValue>{value}</NlStatValue>
        <NlStatLabel>{label}</NlStatLabel>
      </div>
    </NlStatPair>
  );
};

const PropertyCard = ({ property }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  if (!property) return null;

  const images = property?.images || [];
  const currentImage = images[currentImageIndex] || '';

  const handleCardClick = () => {
    if (property?.id) navigate(`/new-launch/${property.id}`);
  };

  const handleEnquiry = (e) => {
    e.stopPropagation();
    alert(`Enquiry for ${property?.propertyName || 'this property'}`);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    if (images.length > 0) setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    if (images.length > 0) setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <NlCard onClick={handleCardClick}>
      <NlImageCarousel>
        {currentImage ? (
          <NlPropertyImage
            className="nl-prop-img"
            src={currentImage}
            alt={property?.propertyName || 'Property'}
          />
        ) : (
          <NlImagePlaceholder>No Image</NlImagePlaceholder>
        )}

        {property?.status && <NlStatusBadge>{property.status}</NlStatusBadge>}

        {images.length > 1 && (
          <>
            <NlCarouselBtn pos="prev" className="nl-carousel-btn" onClick={prevImage}>‹</NlCarouselBtn>
            <NlCarouselBtn pos="next" className="nl-carousel-btn" onClick={nextImage}>›</NlCarouselBtn>
            <NlImageCounter>
              <BsFillImageFill /> {currentImageIndex + 1}/{images.length}
            </NlImageCounter>
          </>
        )}
      </NlImageCarousel>

      <NlContents>
        {property?.propertyName && (
          <NlPropertyName component="h3">{property.propertyName}</NlPropertyName>
        )}

        {property?.configuration?.length > 0 && (
          <NlConfigBadges>
            {property.configuration.map((config, i) => (
              <NlConfigBadge key={i}>{config}</NlConfigBadge>
            ))}
          </NlConfigBadges>
        )}

        {property?.priceInfo && (
          <NlPriceSection>
            <NlPriceLabel>Price Range</NlPriceLabel>
            <NlPriceValue>{property.priceInfo}</NlPriceValue>
          </NlPriceSection>
        )}

        {(property?.landArea || property?.openArea || property?.totalTowers || property?.totalApartments) && (
          <NlStatsContainer>
            <NlStatsRow>
              <Stat icon={<FaRulerCombined />} value={property.landArea} label="Land Area" />
              <Stat icon={<FaTree />} value={property.openArea} label="Open Area" />
            </NlStatsRow>
            <NlStatsRow>
              <Stat icon={<FaBuilding />} value={property.totalTowers} label="Towers" />
              <Stat icon={<FaHome />} value={property.totalApartments} label="Apartments" />
            </NlStatsRow>
          </NlStatsContainer>
        )}

        <NlEnquiryBtn onClick={handleEnquiry}>Enquire Now</NlEnquiryBtn>
      </NlContents>
    </NlCard>
  );
};

const NewLaunchPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchAllNewLaunches();
        const mapped = (data || []).map((item) => ({
          id: item?.project_id,
          propertyName: item?.project_name,
          configuration: item?.configuration || [],
          images: item?.media?.map((m) => m?.value).filter(Boolean) || [],
          priceInfo: item?.price_info?.value,
          status: item?.status,
          landArea: item?.project_info?.land_area,
          openArea: item?.project_info?.open_area,
          totalTowers: item?.project_info?.total_towers,
          totalApartments: item?.project_info?.total_units,
        })).filter((p) => p?.id);
        setProperties(mapped);
      } catch (err) {
        console.error('Failed to load new launches', err);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <NlContainer>
      <SEO
        title="New Launch Projects in Gurugram | Instayards"
        description="Explore the latest new launch residential projects in Gurugram. Pre-launch offers, floor plans, pricing and amenities for upcoming apartments and towers."
        keywords="new launch projects gurugram, new residential projects gurgaon, pre launch flats gurgaon, upcoming projects gurugram"
        path="/new-launch"
      />
      <NlPageTitle component="h1">New Property Launches in Gurugram</NlPageTitle>

      {loading ? (
        <NlLoading>Loading properties...</NlLoading>
      ) : (
        <NlGrid>
          {properties.length > 0 ? (
            properties.map((property) => (
              <PropertyCard key={property?.id || Math.random()} property={property} />
            ))
          ) : (
            <NlNoProperties>No properties found</NlNoProperties>
          )}
        </NlGrid>
      )}
    </NlContainer>
  );
};

export default NewLaunchPage;
