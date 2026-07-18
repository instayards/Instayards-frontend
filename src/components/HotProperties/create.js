import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiMapPin, FiCheckCircle, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import {
  HpContainer, HpHeader, HpHeaderLeft, HpSectionTitle, HpViewAll,
  HpGrid, HpCardWrapper, HpCardLink, HpCard,
  HpImageSection, HpImage, HpCarouselControls, HpCarouselBtn,
  HpCarouselDots, HpCarouselDot, HpImageOverlay, HpBadges, HpBadge,
  HpContent, HpName, HpAddressLine,
  HpSpecs, HpSpecItem, HpSpecIcon, HpSpecDivider, HpSpecContent, HpSpecValue,
  HpFeatures, HpFeatureItem, HpFeatureInfo, HpFeatureValue, HpFeatureLabel,
  HpCta, HpEnquireBtn,
  HpBackdrop, HpModal, HpModalTitle, HpModalInput, HpModalActions, HpBtnCancel, HpBtnSubmit,
  HpLoadingBox, HpSpinner, HpErrorMsg, HpRetryBtn, HpSoldStamp, HpImageSkeleton,
} from './HotPropertiesStyles';

const HomeIconSVG = () => <span style={{ fontSize: 16, lineHeight: 1 }}>🏠</span>;

const HotProperties = () => {
  const [propertiesData, setPropertiesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [enquiryForm, setEnquiryForm] = useState({ full_name: '', contact_number: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [loadedImages, setLoadedImages] = useState({});

  const handleEnquiryChange = (e) => {
    setEnquiryForm({ ...enquiryForm, [e.target.name]: e.target.value });
  };

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus(null);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/buyer-enquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(enquiryForm),
      });
      const data = await res.json();
      if (res.ok) {
        setSubmitStatus({ ok: true, msg: 'Enquiry sent! We will contact you shortly.' });
        setEnquiryForm({ full_name: '', contact_number: '' });
        setTimeout(() => { setShowEnquiry(false); setSubmitStatus(null); }, 2000);
      } else {
        setSubmitStatus({ ok: false, msg: data.message || 'Something went wrong' });
      }
    } catch {
      setSubmitStatus({ ok: false, msg: 'Server error. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  const handlePrevImage = (propertyId, e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => {
      const current = prev[propertyId] || 0;
      const property = propertiesData?.properties.find(p => p.id === propertyId);
      const images = property?.inventory_images || [];
      const count = images.length || 1;
      const nextIdx = current > 0 ? current - 1 : count - 1;
      const aheadIdx = nextIdx > 0 ? nextIdx - 1 : count - 1;
      if (images[aheadIdx]) { const img = new Image(); img.src = images[aheadIdx]; }
      return { ...prev, [propertyId]: nextIdx };
    });
  };

  const handleNextImage = (propertyId, e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => {
      const current = prev[propertyId] || 0;
      const property = propertiesData?.properties.find(p => p.id === propertyId);
      const images = property?.inventory_images || [];
      const count = images.length || 1;
      const nextIdx = current < count - 1 ? current + 1 : 0;
      const aheadIdx = nextIdx < count - 1 ? nextIdx + 1 : 0;
      if (images[aheadIdx]) { const img = new Image(); img.src = images[aheadIdx]; }
      return { ...prev, [propertyId]: nextIdx };
    });
  };

  useEffect(() => { fetchHotProperties(); }, []);

  const fetchHotProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/residential/properties`);
      const result = await res.json();
      if (!result || !result.data || !Array.isArray(result.data.properties)) {
        throw new Error('No properties found');
      }
      const apiData = result.data;
      const transformedData = {
        sectionTitle: apiData.sectionTitle || 'Hot Properties',
        viewAllLink: apiData.viewAllLink || 'Gurgaon',
        properties: [...apiData.properties] 
          .sort((a, b) => {
            const getOrder = (p) => {
              if (p.status?.toLowerCase() === 'sold') return 2;
              if (!p.property_images || p.property_images.length === 0) return 1;
              return 0;
            };
            return getOrder(a) - getOrder(b);
          })
          .slice(0, 6)
          .map((property) => {
          let images = property.property_images || [];
          if (!Array.isArray(images) || images.length === 0) {
            images = ['https://instayards-assets-652698422443-ap-south-1-an.s3.ap-south-1.amazonaws.com/Others/coming+soon+/ChatGPT+Image+May+14%2C+2026%2C+04_48_17+PM.png'];
          }
          return {
            id: property.residential_id,
            title: property.society_name || 'Property',
            sector: property.sector || 'Location',
            bhk: property.bhk ? `${property.bhk} BHK` : 'N/A',
            area: property.area_sqft ? `${property.area_sqft} sq. ft.` : 'N/A',
            price: formatPrice(property.price),
            floor: formatOrdinal(property.floor_number),
            parking: property.parking_slots || 'N/A',
            facing: property.facing || 'N/A',
            property_type: property.property_type || null,
            inventory_images: images,
            imageUrl: images[0],
            badge: property.status || 'Available',
            isSold: property.status?.toLowerCase() === 'sold',
            isReadyToMove: property.status?.toLowerCase() === 'ready to move',
          };
        }),
      };
      setPropertiesData(transformedData);
      const indexObj = {};
      transformedData.properties.forEach(p => { indexObj[p.id] = 0; });
      setCurrentImageIndex(indexObj);
      transformedData.properties.forEach(p => {
        if (p.inventory_images[0]) { const img = new Image(); img.src = p.inventory_images[0]; }
      });
    } catch (err) {
      setError(err.message || 'Failed to load properties');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (priceString) => {
    if (!priceString) return 'Price on Request';
    const price = parseFloat(priceString);
    if (isNaN(price)) return priceString;
    if (price >= 10000000) return `${parseFloat((price / 10000000).toFixed(2))} Cr`;
    if (price >= 100000) return `${parseFloat((price / 100000).toFixed(2))} Lakh`;
    return price.toLocaleString('en-IN');
  };

  const formatOrdinal = (number) => {
    if (!number) return 'N/A';
    const n = Number(number);
    if (isNaN(n)) return number;
    const lastTwo = n % 100;
    const lastOne = n % 10;
    if (lastTwo >= 11 && lastTwo <= 13) return `${n}th`;
    switch (lastOne) {
      case 1: return `${n}st`;
      case 2: return `${n}nd`;
      case 3: return `${n}rd`;
      default: return `${n}th`;
    }
  };

  if (loading) {
    return (
      <HpContainer>
        <HpLoadingBox>
          <HpSpinner />
          <p>Loading properties...</p>
        </HpLoadingBox>
      </HpContainer>
    );
  }

  if (error) {
    return (
      <HpContainer>
        <HpLoadingBox>
          <HpErrorMsg>{error}</HpErrorMsg>
          <HpRetryBtn onClick={fetchHotProperties}>Retry</HpRetryBtn>
        </HpLoadingBox>
      </HpContainer>
    );
  }

  const { sectionTitle, viewAllLink, properties } = propertiesData;

  return (
    <HpContainer>
      <HpHeader>
        <HpHeaderLeft>
          <HpSectionTitle variant="h2">{sectionTitle}</HpSectionTitle>
        </HpHeaderLeft>
        <HpViewAll to="/properties">View all in {viewAllLink} →</HpViewAll>
      </HpHeader>

      <HpGrid>
        {properties.map((property, cardIndex) => {
          const currentIndex = currentImageIndex[property.id] || 0;
          const hasMultipleImages = property.inventory_images.length > 1;
          const currentImage = property.inventory_images[currentIndex];
          const imgKey = `${property.id}-${currentIndex}`;
          const isImgLoaded = !!loadedImages[imgKey];
          const isAboveFold = cardIndex < 3;

          return (
            <HpCardWrapper key={property.id}>
              <HpCardLink to={`/property/${property.id}`}>
                <HpCard>
                  <HpImageSection>
                    {!isImgLoaded && <HpImageSkeleton />}
                    <HpImage
                      src={currentImage}
                      alt={property.title}
                      loading={isAboveFold ? 'eager' : 'lazy'}
                      fetchpriority={cardIndex === 0 ? 'high' : 'auto'}
                      decoding="async"
                      onLoad={() => setLoadedImages(prev => ({ ...prev, [imgKey]: true }))}
                      style={{
                        ...(property.isSold ? { filter: 'brightness(0.75)' } : {}),
                        opacity: isImgLoaded ? 1 : 0,
                        transition: 'opacity 0.3s ease',
                      }}
                    />
                    {property.isSold && <HpSoldStamp>SOLD</HpSoldStamp>}
{/* 
                    {hasMultipleImages && (
                      <>
                        <HpCarouselControls>
                          <HpCarouselBtn onClick={(e) => handlePrevImage(property.id, e)}>
                            <FiChevronLeft />
                          </HpCarouselBtn>
                          <HpCarouselBtn onClick={(e) => handleNextImage(property.id, e)}>
                            <FiChevronRight />
                          </HpCarouselBtn>
                        </HpCarouselControls>

                        <HpCarouselDots>
                          {property.inventory_images.map((_, index) => (
                            <HpCarouselDot
                              key={index}
                              active={index === currentIndex ? 1 : 0}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setCurrentImageIndex(prev => ({ ...prev, [property.id]: index }));
                              }}
                            />
                          ))}
                        </HpCarouselDots>
                      </>
                    )} */}

                    <HpBadges>
                      <HpBadge statustype={property.isSold ? 'sold' : property.isReadyToMove ? 'ready' : 'default'}>
                        <FiCheckCircle />
                        {property.badge}
                      </HpBadge>
                    </HpBadges>

                    <HpImageOverlay />
                  </HpImageSection>

                  <HpContent>
                    <HpName variant="h3">{property.title}</HpName>

                    <HpAddressLine>
                      <FiMapPin style={{ color: '#0d5aa7', fontSize: '0.875rem' }} />
                      <span>{property.sector}</span>
                    </HpAddressLine>

                    <HpSpecs>
                      <HpSpecItem>
                        <HpSpecIcon><HomeIconSVG /></HpSpecIcon>
                        <HpSpecContent><HpSpecValue>{property.bhk}</HpSpecValue></HpSpecContent>
                      </HpSpecItem>
                      <HpSpecDivider />
                      <HpSpecItem>
                        <HpSpecIcon><span>📐</span></HpSpecIcon>
                        <HpSpecContent><HpSpecValue>{property.area}</HpSpecValue></HpSpecContent>
                      </HpSpecItem>
                      <HpSpecDivider />
                      <HpSpecItem>
                        <HpSpecIcon><span>💰</span></HpSpecIcon>
                        <HpSpecContent><HpSpecValue>{property.price}</HpSpecValue></HpSpecContent>
                      </HpSpecItem>
                    </HpSpecs>

                    <HpFeatures>
                      <HpFeatureItem>
                        <HpFeatureInfo>
                          <HpFeatureValue>{property.floor}</HpFeatureValue>
                          <HpFeatureLabel>Floor</HpFeatureLabel>
                        </HpFeatureInfo>
                      </HpFeatureItem>
                      <HpFeatureItem>
                        <HpFeatureInfo>
                          <HpFeatureValue>{property.parking}</HpFeatureValue>
                          <HpFeatureLabel>Parking</HpFeatureLabel>
                        </HpFeatureInfo>
                      </HpFeatureItem>
                      <HpFeatureItem>
                        <HpFeatureInfo>
                          <HpFeatureValue>{property.facing}</HpFeatureValue>
                          <HpFeatureLabel>Facing</HpFeatureLabel>
                        </HpFeatureInfo>
                      </HpFeatureItem>
                      {/* {property.property_type && (
                        <HpFeatureItem>
                          <HpFeatureInfo>
                            <HpFeatureValue>{property.property_type}</HpFeatureValue>
                            <HpFeatureLabel>Type</HpFeatureLabel>
                          </HpFeatureInfo>
                        </HpFeatureItem>
                      )} */}
                    </HpFeatures>

                    <HpCta>
                      <HpEnquireBtn
                        disabled={property.isSold}
                        style={property.isSold ? { background: '#94a3b8', cursor: 'not-allowed' } : {}}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (!property.isSold) setShowEnquiry(true);
                        }}
                      >
                        {property.isSold ? 'Sold Out' : 'Enquire Now'}
                      </HpEnquireBtn>
                    </HpCta>
                  </HpContent>
                </HpCard>
              </HpCardLink>
            </HpCardWrapper>
          );
        })}
      </HpGrid>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
        <HpViewAll to="/properties">View all in {viewAllLink} →</HpViewAll>
      </div>

      {showEnquiry && (
        <HpBackdrop>
          <HpModal>
            <HpModalTitle variant="h3">Enquire Now</HpModalTitle>
            {submitStatus?.ok ? (
              <p style={{ color: '#10b981', textAlign: 'center', padding: '16px 0' }}>{submitStatus.msg}</p>
            ) : (
              <form onSubmit={handleEnquirySubmit}>
                <HpModalInput
                  type="text"
                  name="full_name"
                  placeholder="Full Name"
                  value={enquiryForm.full_name}
                  onChange={handleEnquiryChange}
                  required
                />
                <HpModalInput
                  type="tel"
                  name="contact_number"
                  placeholder="10-digit Mobile Number"
                  value={enquiryForm.contact_number}
                  onChange={handleEnquiryChange}
                  required
                />
                {submitStatus && !submitStatus.ok && (
                  <p style={{ color: '#ef4444', fontSize: 13, marginTop: 8 }}>{submitStatus.msg}</p>
                )}
                <HpModalActions>
                  <HpBtnCancel type="button" onClick={() => { setShowEnquiry(false); setSubmitStatus(null); }}>
                    Cancel
                  </HpBtnCancel>
                  <HpBtnSubmit type="submit" disabled={submitting}>
                    {submitting ? 'Submitting...' : 'Submit'}
                  </HpBtnSubmit>
                </HpModalActions>
              </form>
            )}
          </HpModal>
        </HpBackdrop>
      )}
    </HpContainer>
  );
};

export default HotProperties;
