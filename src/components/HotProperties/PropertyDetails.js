import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SEO from '../SEO/SEO';
import { getAmenityIcon } from '../../utils/amenityIcons';
import {
  FiArrowLeft, FiChevronLeft, FiChevronRight, FiMaximize2,
  FiHome, FiMapPin, FiCheckCircle, FiXCircle,
  FiPhone, FiMessageCircle, FiDownload, FiShare2,
  FiCheck, FiVideo, FiImage, FiUsers, FiShoppingBag,
} from 'react-icons/fi';
import {
  PdContainer, PdBackBtn, PdMainHeader, PdMainTitle, PdActions, PdActionBtn,
  PdGallery, PdMainMedia, PdMainImageWrap, PdMainImage,
  PdImgOverlayControls, PdImgNavBtn, PdImgFullscreenBtn, PdMediaCounter, PdNoMedia,
  PdThumbnailGallery, PdThumbnailHeader, PdThumbnailTab, PdThumbnailScroll,
  PdThumbnailItem, PdNoThumbnails,
  PdVideoSection, PdVideoContainer, PdVideoPlaceholder,
  PdMainContent, PdContentLeft, PdNavigation, PdNavTab,
  PdContentSections, PdSectionContent,
  PdDescSection, PdDescContent, PdDescText,
  PdSpecCard, PdHeaderTitle, PdSpecGrid, PdSpecColumn,
  PdSpecSection, PdSpecSectionTitle, PdTitleIcon,
  PdConfigItems, PdConfigItem, PdConfigText,
  PdAreaDetails, PdAreaItem, PdAreaIcon, PdAreaLabel, PdAreaValue, PdAreaDivider,
  PdSpecDetails, PdDetailItem, PdDetailIcon, PdDetailContent, PdDetailLabel, PdDetailValue,
  PdFurnishingBadge,
  PdImageSkeleton,
  PdFloorPlanSection, PdFloorPlanHeader, PdFloorPlanStats,
  PdFloorPlanImageWrap, PdFloorPlanImage, PdFloorPlanOverlay, PdDownloadBtn,
  PdFurnishingSection, PdFurnishingCards, PdFurnishingCard,
  PdSocietyHeader, PdSocietyTitle, PdSectorBadge, PdReraBadge,
  PdSocietyDescSection, PdSocietyAddress,
  PdSocietyStats, PdStatCard, PdStatValue, PdStatLabel,
  PdDetailGrids, PdGridDetailItem, PdGridDetailLabel, PdGridDetailValue,
  PdBhkSection, PdBhkCardRow, PdBhkCard, PdBhkHeader, PdBhkContent,
  PdBhkDetail, PdBhkLabel, PdBhkValue, PdLayoutBtn,
  PdSelectedLayout, PdLayoutHeader, PdLayoutPreview,
  PdLayoutImageWrap, PdLayoutImage, PdZoomBtn, PdNoConfigs,
  PdSectionCard, PdAmenitiesCategory, PdAmenitiesGrid,
  PdAmenityItem, PdAmenityIcon, PdAmenityName,
  PdNearbyFacilities, PdFacilityCategory,
  PdFlagsSection, PdGreenFlags, PdRedFlags, PdFlagsList, PdFlagItem,
  PdAdditionalInfos, PdInfoItem, PdInfoLabel, PdInfoValue,
  PdContentRight, PdPriceCard, PdPriceDisplay, PdPriceLabel, PdPriceValue,
  PdPriceDetails, PdPriceDetail,
  PdContactButtons, PdCallBtn, PdWhatsappBtn,
  PdCallModal, PdModalContent, PdFormGroup, PdFormActions, PdSubmitBtn, PdCancelBtn,
  PdHighlightsCard, PdHighlightItem,
} from './PropertyDetailsStyles';

const getYouTubeId = (url) => {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([^?&"'>]+)/);
  return match ? match[1] : null;
};

const YoutubeEmbed = ({ url }) => {
  const [playing, setPlaying] = useState(false);
  const videoId = getYouTubeId(url);
  if (!videoId) return null;
  const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  if (playing) {
    return (
      <iframe
        width="100%" height="100%"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
        title="Society Video"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
        style={{ borderRadius: 16 }}
      />
    );
  }
  return (
    <div
      onClick={() => setPlaying(true)}
      style={{ position: 'relative', width: '100%', height: '100%', cursor: 'pointer', borderRadius: 16, overflow: 'hidden' }}
    >
      <img src={thumbnail} alt="Video thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      <div style={{
        position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,0,0,0.9)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ width: 0, height: 0, borderTop: '12px solid transparent', borderBottom: '12px solid transparent', borderLeft: '22px solid white', marginLeft: 5 }} />
        </div>
      </div>
    </div>
  );
};

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [society, setSociety] = useState(null);
  const [mediaTab, setMediaTab] = useState('property');
  const [activeTab, setActiveTab] = useState('property');
  const [activeSection, setActiveSection] = useState('about');
  const [activeImage, setActiveImage] = useState(0);
  const [showCallForm, setShowCallForm] = useState(false);
  const [callFormData, setCallFormData] = useState({ name: '', phone: '' });
  const [activeLayout, setActiveLayout] = useState(null);
  const [furnishings, setFurnishings] = useState([]);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [brochureToast, setBrochureToast] = useState(false);

  const hasValue = (v) => v !== null && v !== undefined && v.toString().trim() !== '';

  const formatIndianPrice = (value) => {
    if (!value) return 'Price on request';
    const num = Number(value);
    const format = (v) => parseFloat(v.toFixed(2));
    if (num >= 10000000) return `${format(num / 10000000)} Cr`;
    if (num >= 100000) return `${format(num / 100000)} Lakh`;
    return num.toLocaleString('en-IN');
  };

  const calculatePricePerSqft = (price, area) => {
    if (!price || !area) return null;
    const p = Number(price);
    const a = Number(area);
    if (!a) return null;
    return Math.round(p / a);
  };

  const formattedPrice = formatIndianPrice(property?.price);
  const pricePerSqft = calculatePricePerSqft(property?.price, property?.super_area || property?.area_sqft);

  const propertyImages = property?.property_images || [];
  const propertyVideos = property?.property_videos || [];
  const societyImages = society?.society_images || [];
  const societyVideos = society?.society_video || [];
  const activeImages = mediaTab === 'property' ? propertyImages : societyImages;
  const activeVideos = mediaTab === 'property' ? propertyVideos : societyVideos;

  const flatBHKCards = society?.configuration
    ? Object.entries(society.configuration).flatMap(([bhkType, config]) =>
        config.layouts.map((layout, index) => ({
          bhkType,
          bhkTitle: config.title,
          layoutId: `${bhkType}-${index}`,
          layout: { ...layout, bhkType, layoutId: `${bhkType}-${index}` },
        }))
      )
    : [];

  const renderValue = (value, fallback = 'N/A') => {
    if (value === undefined || value === null || value === '') return fallback;
    if (typeof value === 'number') return value.toString();
    return value;
  };

  useEffect(() => { setActiveImage(0); setImgLoaded(false); }, [activeTab, mediaTab]);
  useEffect(() => { fetchPropertyDetails(); }, [id]);
  useEffect(() => {
    if (!activeLayout && flatBHKCards.length > 0) {
      setActiveLayout({ ...flatBHKCards[0].layout });
    }
  }, [flatBHKCards, activeLayout]);

  const fetchPropertyDetails = async () => {
    try {
      const propertyResponse = await fetch(
        `${process.env.REACT_APP_API_URL}/api/residential/property/${id}`
      );
      if (!propertyResponse.ok) throw new Error(`HTTP Error: ${propertyResponse.status}`);
      const result = await propertyResponse.json();
      const propertyData = result.data;
      setProperty(propertyData);
      setSociety(propertyData.society);
      setFurnishings(propertyData.furnishing_details || []);

      const allImages = [
        ...(propertyData.property_images || []),
        ...(propertyData.society?.society_images || []),
      ];
      allImages.forEach(src => { const img = new Image(); img.src = src; });

      const ytIds = [...(propertyData.property_videos || []), ...(propertyData.society?.society_video || [])]
        .map(url => url?.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([^?&"'>]+)/)?.[1])
        .filter(Boolean);
      ytIds.forEach(id => { const img = new Image(); img.src = `https://img.youtube.com/vi/${id}/hqdefault.jpg`; });
    } catch (err) {
      console.error('Error fetching property details:', err);
    }
  };

  if (!property || !society) {
    return (
      <PdContainer>
        <PdBackBtn onClick={() => navigate(-1)}>
          <FiArrowLeft /> Back to Properties
        </PdBackBtn>
      </PdContainer>
    );
  }

  const handleImageChange = (direction) => {
    if (activeImages.length === 0) return;
    setImgLoaded(false);
    setActiveImage((prev) => {
      let nextIdx;
      if (direction === 'next') {
        nextIdx = (prev + 1) % activeImages.length;
        const aheadIdx = (nextIdx + 1) % activeImages.length;
        if (activeImages[aheadIdx]) { const img = new Image(); img.src = activeImages[aheadIdx]; }
      } else {
        nextIdx = (prev - 1 + activeImages.length) % activeImages.length;
        const aheadIdx = (nextIdx - 1 + activeImages.length) % activeImages.length;
        if (activeImages[aheadIdx]) { const img = new Image(); img.src = activeImages[aheadIdx]; }
      }
      return nextIdx;
    });
  };

  const handleCallFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/buyer-enquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ full_name: callFormData.name, contact_number: callFormData.phone }),
      });
      const result = await response.json();
      if (!response.ok) {
        alert(result.errors?.join(', ') || 'Something went wrong');
        return;
      }
      alert('Your call back request has been submitted');
      setShowCallForm(false);
      setCallFormData({ name: '', phone: '' });
    } catch {
      alert('Server error. Please try again later.');
    }
  };

  const handleWhatsAppQuery = () => {
    const message = `Hi, I'm interested in ${property.title || property.bhk}. Please share more details.`;
    window.open(`https://wa.me/919818420044?text=${encodeURIComponent(message)}`, '_blank');
  };

  const downloadImage = (imageUrl) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `floor-plan-${property.title || 'property'}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadBrochure = async () => {
    if (!society?.brochure) {
      setBrochureToast(true);
      setTimeout(() => setBrochureToast(false), 3000);
      return;
    }
    try {
      const res = await fetch(society.brochure);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${(society.society_name || 'Society').replace(/\s+/g, '-')}-Brochure.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch {
      window.open(society.brochure, '_blank');
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setActiveImage(0);
  };

  const renderAmenitiesSection = () => {
    const clubHouseAmenities = society?.club_house_aminities || [];
    const otherAmenities = society?.other_aminities || [];

    if (clubHouseAmenities.length === 0 && otherAmenities.length === 0) {
      return (
        <PdSectionCard>
          <h2>Amenities</h2>
          <div style={{ color: '#9ca3af', fontSize: 14 }}>No amenities available</div>
        </PdSectionCard>
      );
    }

    return (
      <PdSectionCard>
        <h2>Amenities</h2>
        {clubHouseAmenities.length > 0 && (
          <PdAmenitiesCategory>
            <h4>Club House Amenities</h4>
            <PdAmenitiesGrid>
              {clubHouseAmenities.map((amenity, index) => {
                const IconComponent = getAmenityIcon(amenity.icon);
                return (
                  <PdAmenityItem key={`club-${index}`}>
                    <PdAmenityIcon><IconComponent /></PdAmenityIcon>
                    <PdAmenityName>{amenity.name}</PdAmenityName>
                  </PdAmenityItem>
                );
              })}
            </PdAmenitiesGrid>
          </PdAmenitiesCategory>
        )}
        {otherAmenities.length > 0 && (
          <PdAmenitiesCategory>
            <h4>Other Amenities</h4>
            <PdAmenitiesGrid>
              {otherAmenities.map((amenity, index) => {
                const IconComponent = getAmenityIcon(amenity.icon);
                return (
                  <PdAmenityItem key={`other-${index}`}>
                    <PdAmenityIcon><IconComponent /></PdAmenityIcon>
                    <PdAmenityName>{amenity.name}</PdAmenityName>
                  </PdAmenityItem>
                );
              })}
            </PdAmenitiesGrid>
          </PdAmenitiesCategory>
        )}
      </PdSectionCard>
    );
  };

  const renderPropertyDetails = () => (
    <PdContentSections>
      <PdSectionContent>
        <PdDescSection>
          <h3>About this Property</h3>
          <PdDescContent>
            <PdDescText>{renderValue(property.property_description, 'No description available.')}</PdDescText>
          </PdDescContent>
        </PdDescSection>

        <PdSpecCard>
          <PdHeaderTitle>
            <h3>Property Specifications</h3>
          </PdHeaderTitle>
          <PdSpecGrid>
            {/* Column 1 */}
            <PdSpecColumn>
              {hasValue(property.configuration) && (
                <PdSpecSection>
                  <PdSpecSectionTitle>
                    <PdTitleIcon><span className="emoji-icon">🏘️</span></PdTitleIcon>
                    <span>Configuration</span>
                  </PdSpecSectionTitle>
                  <PdConfigItems>
                    {property.configuration.split('+').map((item, index) => (
                      <PdConfigItem key={index}>
                        <PdConfigText>{item.trim()}</PdConfigText>
                      </PdConfigItem>
                    ))}
                  </PdConfigItems>
                </PdSpecSection>
              )}

              {(hasValue(property.super_area) || hasValue(property.carpet_area)) && (
                <PdAreaDetails>
                  {hasValue(property.super_area) && (
                    <PdAreaItem>
                      <PdAreaIcon><span className="emoji-icon">📐</span></PdAreaIcon>
                      <div>
                        <PdAreaLabel>Super Built-up Area</PdAreaLabel>
                        <PdAreaValue>{property.super_area} Sq.ft</PdAreaValue>
                      </div>
                    </PdAreaItem>
                  )}
                  {hasValue(property.super_area) && hasValue(property.carpet_area) && <PdAreaDivider />}
                  {hasValue(property.carpet_area) && (
                    <PdAreaItem>
                      <PdAreaIcon><span className="emoji-icon">🧮</span></PdAreaIcon>
                      <div>
                        <PdAreaLabel>Carpet Area</PdAreaLabel>
                        <PdAreaValue>{property.carpet_area} Sq.ft</PdAreaValue>
                      </div>
                    </PdAreaItem>
                  )}
                </PdAreaDetails>
              )}
            </PdSpecColumn>

            {/* Column 2 */}
            <PdSpecColumn>
              <PdSpecDetails>
                {hasValue(property.floor_number) && (
                  <PdDetailItem>
                    <PdDetailIcon><span className="emoji-icon">🏢</span></PdDetailIcon>
                    <PdDetailContent>
                      <PdDetailLabel>Floor</PdDetailLabel>
                      <PdDetailValue>{property.floor_number}</PdDetailValue>
                    </PdDetailContent>
                  </PdDetailItem>
                )}
                {hasValue(property.total_floors) && (
                  <PdDetailItem>
                    <PdDetailIcon><span className="emoji-icon">🏗️</span></PdDetailIcon>
                    <PdDetailContent>
                      <PdDetailLabel>Total Floors</PdDetailLabel>
                      <PdDetailValue>{property.total_floors}</PdDetailValue>
                    </PdDetailContent>
                  </PdDetailItem>
                )}
                {hasValue(property.unit_number) && (
                  <PdDetailItem>
                    <PdDetailIcon><span className="emoji-icon">🚪</span></PdDetailIcon>
                    <PdDetailContent>
                      <PdDetailLabel>Unit Number</PdDetailLabel>
                      <PdDetailValue>{property.unit_number}</PdDetailValue>
                    </PdDetailContent>
                  </PdDetailItem>
                )}
                {hasValue(property.tower) && (
                  <PdDetailItem>
                    <PdDetailIcon><span className="emoji-icon">🗼</span></PdDetailIcon>
                    <PdDetailContent>
                      <PdDetailLabel>Tower</PdDetailLabel>
                      <PdDetailValue>{property.tower}</PdDetailValue>
                    </PdDetailContent>
                  </PdDetailItem>
                )}
                {hasValue(property.property_type) && (
                  <PdDetailItem>
                    <PdDetailIcon><span className="emoji-icon">🏠</span></PdDetailIcon>
                    <PdDetailContent>
                      <PdDetailLabel>Property Type</PdDetailLabel>
                      <PdDetailValue>{property.property_type}</PdDetailValue>
                    </PdDetailContent>
                  </PdDetailItem>
                )}
              </PdSpecDetails>
            </PdSpecColumn>

            {/* Column 3 */}
            <PdSpecColumn>
              <PdSpecDetails>
                {hasValue(property.parking_slots) && (
                  <PdDetailItem>
                    <PdDetailIcon><span className="emoji-icon">🚗</span></PdDetailIcon>
                    <PdDetailContent>
                      <PdDetailLabel>Parking</PdDetailLabel>
                      <PdDetailValue>{property.parking_slots}</PdDetailValue>
                    </PdDetailContent>
                  </PdDetailItem>
                )}
                {hasValue(property.facing) && (
                  <PdDetailItem>
                    <PdDetailIcon><span className="emoji-icon">🧭</span></PdDetailIcon>
                    <PdDetailContent>
                      <PdDetailLabel>Facing</PdDetailLabel>
                      <PdDetailValue>{property.facing}</PdDetailValue>
                    </PdDetailContent>
                  </PdDetailItem>
                )}
                {hasValue(property.age_of_construction) && (
                  <PdDetailItem>
                    <PdDetailIcon><span className="emoji-icon">📅</span></PdDetailIcon>
                    <PdDetailContent>
                      <PdDetailLabel>Age of Construction</PdDetailLabel>
                      <PdDetailValue>{property.age_of_construction}</PdDetailValue>
                    </PdDetailContent>
                  </PdDetailItem>
                )}
                {hasValue(property.furnishing_status) && (
                  <PdDetailItem>
                    <PdDetailIcon><span className="emoji-icon">⭐</span></PdDetailIcon>
                    <PdDetailContent>
                      <PdDetailLabel>Furnishing Status</PdDetailLabel>
                      <PdDetailValue>
                        <PdFurnishingBadge>{property.furnishing_status}</PdFurnishingBadge>
                      </PdDetailValue>
                    </PdDetailContent>
                  </PdDetailItem>
                )}
              </PdSpecDetails>
            </PdSpecColumn>
          </PdSpecGrid>
        </PdSpecCard>

        {property?.layout_url && (
          <PdFloorPlanSection>
            <PdFloorPlanHeader>
              <h3>Floor Plan & Layout</h3>
              {(property?.super_area || property?.carpet_area) && (
                <PdFloorPlanStats>
                  {property?.super_area && (
                    <span>Super Area: <strong>{property.super_area}</strong></span>
                  )}
                  {property?.carpet_area && (
                    <span>Carpet Area: <strong>{property.carpet_area}</strong></span>
                  )}
                </PdFloorPlanStats>
              )}
            </PdFloorPlanHeader>
            <PdFloorPlanImageWrap>
              <PdFloorPlanImage src={property.layout_url} alt="Floor Plan" />
              <PdFloorPlanOverlay>
                <PdDownloadBtn onClick={() => downloadImage(property.layout_url)}>
                  <FiDownload /> Download
                </PdDownloadBtn>
              </PdFloorPlanOverlay>
            </PdFloorPlanImageWrap>
          </PdFloorPlanSection>
        )}

        {furnishings.length > 0 && (
          <PdFurnishingSection>
            <h3>Furnishing Details</h3>
            <PdFurnishingCards>
              {furnishings.map((item, index) => (
                <PdFurnishingCard key={index}>
                  <FiCheckCircle className="check-icon" />
                  <span>{renderValue(item)}</span>
                </PdFurnishingCard>
              ))}
            </PdFurnishingCards>
          </PdFurnishingSection>
        )}
      </PdSectionContent>
    </PdContentSections>
  );

  const renderSocietyDetails = () => (
    <PdContentSections>
      <PdSectionContent>
        <h2>Society Information</h2>
        <PdSocietyHeader>
          <PdSocietyTitle>
            <h3>
              {renderValue(society.society_name)}
              {society.sector && <PdSectorBadge>{renderValue(society.sector)}</PdSectorBadge>}
            </h3>
          </PdSocietyTitle>
          {society.rera_registration_no && (
            <PdReraBadge>
              <FiCheckCircle />
              <span>RERA: {renderValue(society.rera_registration_no)}</span>
            </PdReraBadge>
          )}
        </PdSocietyHeader>

        <PdSocietyDescSection>
          <h3>About Society</h3>
          <PdDescContent>
            <PdDescText>
              {renderValue(society.description || 'Bestech Park View Grand Spa in Sector 81, Gurgaon is a ready-to-move housing society.')}
            </PdDescText>
          </PdDescContent>
        </PdSocietyDescSection>

        {society.address && (
          <PdSocietyAddress>
            <FiMapPin />
            {renderValue(society.address)}
          </PdSocietyAddress>
        )}

        <PdSocietyStats>
          {society?.society_info &&
            Object.entries(society.society_info).map(([key, value]) => (
              <PdStatCard key={key}>
                <PdStatValue>{renderValue(value)}</PdStatValue>
                <PdStatLabel>{key.replaceAll('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</PdStatLabel>
              </PdStatCard>
            ))}
        </PdSocietyStats>

        <h3>Specifications</h3>
        <PdDetailGrids>
          {society?.specifications &&
            Object.entries(society.specifications).map(([key, value]) => (
              <PdGridDetailItem key={key}>
                <PdGridDetailLabel>
                  {key.replaceAll('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </PdGridDetailLabel>
                <PdGridDetailValue>{renderValue(value)}</PdGridDetailValue>
              </PdGridDetailItem>
            ))}
        </PdDetailGrids>

        <PdBhkSection>
          <h2>Available Configurations in Society</h2>
          {flatBHKCards.length > 0 ? (
            <PdBhkCardRow>
              {flatBHKCards.map((card) => (
                <PdBhkCard key={card.layoutId} active={activeLayout?.layoutId === card.layoutId ? 1 : 0}>
                  <PdBhkHeader><h3>{card.bhkTitle}</h3></PdBhkHeader>
                  <PdBhkContent>
                    <PdBhkDetail>
                      <PdBhkLabel>Super Built-up Area</PdBhkLabel>
                      <PdBhkValue>{card.layout.superBuiltUp}</PdBhkValue>
                    </PdBhkDetail>
                    <PdLayoutBtn
                      isActive={activeLayout?.layoutId === card.layoutId}
                      onClick={() => setActiveLayout(card.layout)}
                    >
                      {activeLayout?.layoutId === card.layoutId ? '✓ Selected' : 'View Layout'}
                    </PdLayoutBtn>
                  </PdBhkContent>
                </PdBhkCard>
              ))}
            </PdBhkCardRow>
          ) : (
            <PdNoConfigs>No configurations available</PdNoConfigs>
          )}

          {activeLayout && (
            <PdSelectedLayout>
              <PdLayoutHeader>
                <h3>Selected Layout - {activeLayout.bhkType}</h3>
                <span><strong>Super Built-up Area:</strong> {activeLayout.superBuiltUp}</span>
              </PdLayoutHeader>
              <PdLayoutPreview>
                <PdLayoutImageWrap>
                  <PdLayoutImage
                    src={activeLayout.imageUrl}
                    alt={`${activeLayout.bhkType} Layout`}
                  />
                  <PdZoomBtn onClick={() => window.open(activeLayout.imageUrl, '_blank')}>
                    🔍 Open Full Size
                  </PdZoomBtn>
                </PdLayoutImageWrap>
              </PdLayoutPreview>
            </PdSelectedLayout>
          )}
        </PdBhkSection>

        {renderAmenitiesSection()}

        {(society?.near_by_school?.length > 0 ||
          society?.near_by_hospital?.length > 0 ||
          society?.near_by_shopping_complex?.length > 0) && (
          <h3>Nearby Facilities</h3>
        )}

        <PdNearbyFacilities>
          {society?.near_by_school?.length > 0 && (
            <PdFacilityCategory>
              <h4><FiUsers /> Schools</h4>
              <ul>
                {society.near_by_school.map((school, index) => (
                  <li key={index}>{school.name}</li>
                ))}
              </ul>
            </PdFacilityCategory>
          )}
          {society?.near_by_hospital?.length > 0 && (
            <PdFacilityCategory>
              <h4><FiCheckCircle /> Hospitals</h4>
              <ul>
                {society.near_by_hospital.map((hospital, index) => (
                  <li key={index}>{hospital.name}</li>
                ))}
              </ul>
            </PdFacilityCategory>
          )}
          {society?.near_by_shopping_complex?.length > 0 && (
            <PdFacilityCategory>
              <h4><FiShoppingBag /> Shopping Complex</h4>
              <ul>
                {society.near_by_shopping_complex.map((mall, index) => (
                  <li key={index}>{mall.name}</li>
                ))}
              </ul>
            </PdFacilityCategory>
          )}
        </PdNearbyFacilities>

        <PdFlagsSection>
          {society?.green_flags?.length > 0 && (
            <PdGreenFlags>
              <h4>✅ Green Flags</h4>
              <PdFlagsList>
                {society.green_flags.map((flag, index) => (
                  <PdFlagItem key={index}>
                    <FiCheck style={{ color: '#16a34a' }} />
                    <span>{flag}</span>
                  </PdFlagItem>
                ))}
              </PdFlagsList>
            </PdGreenFlags>
          )}
          {society?.red_flags?.length > 0 && (
            <PdRedFlags>
              <h4>❌ Red Flags</h4>
              <PdFlagsList>
                {society.red_flags.map((flag, index) => (
                  <PdFlagItem key={index}>
                    <FiXCircle style={{ color: '#dc2626' }} />
                    <span>{flag}</span>
                  </PdFlagItem>
                ))}
              </PdFlagsList>
            </PdRedFlags>
          )}
        </PdFlagsSection>

        <h3>Additional Information</h3>
        <PdAdditionalInfos>
          {society?.additional_info &&
            Object.entries(society.additional_info).map(([key, value], index) => (
              <PdInfoItem key={index}>
                <PdInfoLabel>
                  {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:
                </PdInfoLabel>
                <PdInfoValue>{value}</PdInfoValue>
              </PdInfoItem>
            ))}
        </PdAdditionalInfos>
      </PdSectionContent>
    </PdContentSections>
  );

  const complexName = property.complexName || society.society_name || 'Gurugram';
  const sectorLabel = society.sector ? ` ${society.sector}` : '';
  const seoTitle = `${property.bhk ? `${property.bhk} BHK ` : ''}${property.property_type || 'Property'} for Sale in ${complexName}${sectorLabel}, Gurugram | Instayards`;
  const seoDescription = `${property.bhk ? `${property.bhk} BHK ` : ''}${property.property_type || 'property'} for sale in ${complexName}${sectorLabel}, Gurugram. ${formattedPrice !== 'Price on request' ? `Price: ${formattedPrice}. ` : ''}${property.super_area ? `Super area: ${property.super_area} sq.ft. ` : ''}Verified listing on Instayards.`;
  const seoImage = property.property_images?.[0] || society.society_images?.[0];
  const seoJsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Residence',
      name: `${complexName}${sectorLabel}`,
      description: seoDescription,
      image: seoImage,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Gurugram',
        addressRegion: 'Haryana',
        addressCountry: 'IN',
        streetAddress: society.address || undefined,
      },
      ...(property.price && {
        offers: {
          '@type': 'Offer',
          price: property.price,
          priceCurrency: 'INR',
        },
      }),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://instayards.com/' },
        { '@type': 'ListItem', position: 2, name: 'Properties', item: 'https://instayards.com/properties' },
        { '@type': 'ListItem', position: 3, name: complexName, item: `https://instayards.com/property/${id}` },
      ],
    },
  ];

  return (
    <PdContainer>
      <SEO
        title={seoTitle}
        description={seoDescription}
        path={`/property/${id}`}
        image={seoImage}
        type="product"
        jsonLd={seoJsonLd}
      />
      <PdBackBtn onClick={() => navigate(-1)}>
        <FiArrowLeft /> Back to Properties
      </PdBackBtn>

      <PdMainHeader>
        <PdMainTitle>
          {renderValue(property.bhk, 'Property')} BHK in{' '}
          {renderValue(property.complexName || society.society_name, 'Unknown Complex')}
          {society.sector && ` ${renderValue(society.sector)}`}
        </PdMainTitle>
        <PdActions>
          <PdActionBtn><FiShare2 /> Share</PdActionBtn>
          <PdActionBtn onClick={downloadBrochure}>
            <FiDownload /> Brochure
          </PdActionBtn>
        </PdActions>
      </PdMainHeader>

      <PdGallery>
        {/* Main Image */}
        <PdMainMedia>
          {activeImages.length > 0 ? (
            <PdMainImageWrap>
              {!imgLoaded && <PdImageSkeleton />}
              <PdMainImage
                src={activeImages[activeImage]}
                alt={`${complexName} - ${activeTab === 'society' ? 'society' : 'property'} photo ${activeImage + 1}`}
                decoding="async"
                onLoad={() => setImgLoaded(true)}
                style={{ opacity: imgLoaded ? 1 : 0, transition: 'opacity 0.3s ease' }}
              />
              {activeImages.length > 1 && (
                <>
                  <PdImgOverlayControls>
                    <PdImgNavBtn onClick={() => handleImageChange('prev')}><FiChevronLeft /></PdImgNavBtn>
                    <PdImgNavBtn onClick={() => handleImageChange('next')}><FiChevronRight /></PdImgNavBtn>
                    <PdImgFullscreenBtn><FiMaximize2 /></PdImgFullscreenBtn>
                  </PdImgOverlayControls>
                  <PdMediaCounter>
                    <FiImage /> {activeImage + 1} / {activeImages.length}
                  </PdMediaCounter>
                </>
              )}
            </PdMainImageWrap>
          ) : (
            <PdNoMedia>
              <FiImage style={{ fontSize: 48 }} />
              <p>No {activeTab} images available</p>
            </PdNoMedia>
          )}
        </PdMainMedia>

        {/* Thumbnails */}
        <PdThumbnailGallery>
          <PdThumbnailHeader>
            <PdThumbnailTab active={mediaTab === 'property' ? 1 : 0} onClick={() => setMediaTab('property')}>
              <FiImage /> Property Photos
            </PdThumbnailTab>
            <PdThumbnailTab active={mediaTab === 'society' ? 1 : 0} onClick={() => setMediaTab('society')}>
              <FiHome /> Society Photos
            </PdThumbnailTab>
          </PdThumbnailHeader>
          <PdThumbnailScroll>
            {activeImages.length > 0 ? (
              activeImages.map((img, index) => (
                <PdThumbnailItem key={index} active={index === activeImage ? 1 : 0} onClick={() => { setActiveImage(index); setImgLoaded(false); }}>
                  <img src={img} alt={`Thumbnail ${index + 1}`} loading="lazy" decoding="async" />
                </PdThumbnailItem>
              ))
            ) : (
              <PdNoThumbnails>No {activeTab} images available</PdNoThumbnails>
            )}
          </PdThumbnailScroll>
        </PdThumbnailGallery>

        {/* Video */}
        <PdVideoSection>
          <PdThumbnailHeader>
            <PdThumbnailTab active={mediaTab === 'property' ? 1 : 0} onClick={() => setMediaTab('property')}>
              <FiImage /> Property Videos
            </PdThumbnailTab>
            <PdThumbnailTab active={mediaTab === 'society' ? 1 : 0} onClick={() => setMediaTab('society')}>
              <FiHome /> Society Videos
            </PdThumbnailTab>
          </PdThumbnailHeader>
          <PdVideoContainer>
            {propertyVideos.length > 0 && (
              <div style={{ display: mediaTab === 'property' ? 'block' : 'none', width: '100%', height: '100%' }}>
                {getYouTubeId(propertyVideos[0]) ? (
                  <YoutubeEmbed url={propertyVideos[0]} />
                ) : (
                  <video style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 16 }} src={propertyVideos[0]} controls preload="metadata" />
                )}
              </div>
            )}
            {societyVideos.length > 0 && (
              <div style={{ display: mediaTab === 'society' ? 'block' : 'none', width: '100%', height: '100%' }}>
                {getYouTubeId(societyVideos[0]) ? (
                  <YoutubeEmbed url={societyVideos[0]} />
                ) : (
                  <video style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 16 }} src={societyVideos[0]} controls preload="metadata" />
                )}
              </div>
            )}
            {(mediaTab === 'property' ? propertyVideos : societyVideos).length === 0 && (
              <PdVideoPlaceholder>
                <FiVideo style={{ fontSize: 48, display: 'block', margin: '0 auto 16px' }} />
                <span>No {mediaTab === 'property' ? 'Property' : 'Society'} Video Available</span>
              </PdVideoPlaceholder>
            )}
          </PdVideoContainer>
        </PdVideoSection>
      </PdGallery>

      <PdMainContent>
        <PdContentLeft>
          <PdNavigation>
            <PdNavTab active={activeSection === 'about' ? 1 : 0} onClick={() => setActiveSection('about')}>
              <FiHome /> About Home
            </PdNavTab>
            <PdNavTab active={activeSection === 'society' ? 1 : 0} onClick={() => setActiveSection('society')}>
              <FiUsers /> About Society
            </PdNavTab>
          </PdNavigation>
          {activeSection === 'about' ? renderPropertyDetails() : renderSocietyDetails()}
        </PdContentLeft>

        <PdContentRight>
          <PdPriceCard>
            <PdPriceDisplay>
              <PdPriceLabel>Price</PdPriceLabel>
              <PdPriceValue>{formattedPrice}</PdPriceValue>
            </PdPriceDisplay>
            {pricePerSqft && (
              <PdPriceDetails>
                <PdPriceDetail>
                  <span>Price per sq.ft</span>
                  <span>₹{pricePerSqft.toLocaleString('en-IN')}</span>
                </PdPriceDetail>
              </PdPriceDetails>
            )}
          </PdPriceCard>

          <PdContactButtons>
            <PdCallBtn onClick={() => setShowCallForm(true)}>
              <FiPhone /> Request Call Back
            </PdCallBtn>
            <PdWhatsappBtn onClick={handleWhatsAppQuery}>
              <FiMessageCircle /> Ask on WhatsApp
            </PdWhatsappBtn>
          </PdContactButtons>

          {showCallForm && (
            <PdCallModal>
              <PdModalContent>
                <h3>Request Call Back</h3>
                <form onSubmit={handleCallFormSubmit}>
                  <PdFormGroup>
                    <label>Full Name</label>
                    <input
                      type="text"
                      value={callFormData.name}
                      onChange={(e) => setCallFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter your name"
                      required
                    />
                  </PdFormGroup>
                  <PdFormGroup>
                    <label>Contact Number</label>
                    <input
                      type="tel"
                      value={callFormData.phone}
                      onChange={(e) => setCallFormData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="Enter your phone number"
                      required
                    />
                  </PdFormGroup>
                  <PdFormActions>
                    <PdSubmitBtn type="submit">Submit Request</PdSubmitBtn>
                    <PdCancelBtn type="button" onClick={() => setShowCallForm(false)}>Cancel</PdCancelBtn>
                  </PdFormActions>
                </form>
              </PdModalContent>
            </PdCallModal>
          )}

          <PdHighlightsCard>
            <h3>
              <FiCheckCircle style={{ marginRight: 8, color: '#4361ee' }} />
              {activeSection === 'about' ? 'Property Highlights' : 'Society Highlights'}
            </h3>
            {(activeSection === 'about' ? property?.highlights : society?.society_highlights)?.length > 0 ? (
              (activeSection === 'about' ? property.highlights : society.society_highlights).map((highlight, index) => (
                <PdHighlightItem key={index}>
                  <FiCheckCircle style={{ color: '#10b981' }} />
                  <span>{highlight}</span>
                </PdHighlightItem>
              ))
            ) : (
              <PdHighlightItem>
                <FiCheckCircle style={{ color: '#94a3b8' }} />
                <span>No {activeSection === 'about' ? 'property' : 'society'} highlights available</span>
              </PdHighlightItem>
            )}
          </PdHighlightsCard>
        </PdContentRight>
      </PdMainContent>
      {brochureToast && (
        <div style={{
          position: 'fixed', bottom: 32, left: '50%', transform: 'translateX(-50%)',
          background: '#1e293b', color: '#fff', padding: '12px 24px',
          borderRadius: 10, fontSize: 14, fontWeight: 500,
          boxShadow: '0 4px 20px rgba(0,0,0,0.2)', zIndex: 9999,
          display: 'flex', alignItems: 'center', gap: 10,
          animation: 'fadeInUp 0.25s ease',
        }}>
          <FiDownload style={{ color: '#94a3b8' }} />
          Brochure not available for this property.
        </div>
      )}
    </PdContainer>
  );
};

export default PropertyDetails;
