// src/components/NewlyLaunch/property.js
import { useEffect, useMemo, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiPhone, FiMessageCircle, FiCheckCircle } from 'react-icons/fi';
import { FiCoffee, FiHome, FiGrid } from 'react-icons/fi';
import { fetchNewLaunchById } from '../../services/newlaunchApi';
import SEO from '../SEO/SEO';
import {
  PrContainer, PrLoadingBox, PrErrorBox,
  PrBackBtn, PrHeader, PrTitle,
  PrMediaSection, PrCarouselWrapper, PrCarouselMain,
  PrCarouselSlide, PrCarouselMedia, PrCarouselVideo,
  PrCarouselBtn, PrCarouselCounter,
  PrThumbsWrapper, PrThumbScrollBtn, PrThumbnails, PrThumbnail,
  PrMain, PrLeftSection, PrRightSection,
  PrSectionCard, PrSectionTitle,
  PrHighlightsGrid, PrHighlightItem,
  PrStatsGrid, PrStatCard, PrStatLabel, PrStatValue,
  PrBhkTabs, PrBhkTab,
  PrLayoutGrid, PrLayoutCard, PrLayoutCardImg, PrViewLayoutBtn, PrLayoutCardDetails,
  PrLayoutArea, PrLayoutPrice,
  PrLayoutModalOverlay, PrLayoutModal, PrLayoutModalClose,
  PrCurrentPhase, PrPhaseSectionTitle, PrPhaseContent,
  PrPhaseStatsGrid, PrPhaseStat, PrSubsectionTitle,
  PrTableResponsive, PrPaymentTable,
  PrOffersGrid, PrOfferCard, PrOfferHeader, PrOfferTable,
  PrMaintenanceSection, PrMaintenanceTableContainer, PrMaintenanceTable,
  PrAmenitiesCategories, PrAmenityCategory, PrCategoryTitle,
  PrSubCategories, PrSubCategory, PrAmenitiesMiniGrid, PrAmenityMiniItem,
  PrFacilitiesGrid, PrFacilityCard, PrFacilityHeader, PrFacilityList,
  PrPlaceName, PrPlaceDistance,
  PrFlagsSection, PrGreenFlags, PrRedFlags,
  PrInfoGrid, PrInfoItem,
  PrPriceCard, PrPriceBadge, PrPriceValue, PrPriceSub,
  PrHighlightsCard, PrApartmentHighlightItem,
  PrContactButtons, PrContactBtn,
  PrCallFormModal, PrModalContent, PrModalClose, PrFormGroup, PrSubmitBtn,
} from './PropertyStyles';

const Property = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCallForm, setShowCallForm] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedBHK, setSelectedBHK] = useState(null);
  const [selectedLayout, setSelectedLayout] = useState(null);
  const [showLayoutModal, setShowLayoutModal] = useState(false);
  const [callFormData, setCallFormData] = useState({ name: '', phone: '' });
  const thumbRef = useRef(null);

  const handleWhatsAppQuery = () => {
    const propertyName = project?.project_name || 'this project';
    const message = `Hi, I'm interested in ${propertyName}. Please share more details.`;
    window.open(`https://wa.me/919818420044?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleCallFormSubmit = async (e) => {
    e.preventDefault();
    if (!callFormData.name || !callFormData.phone) { alert('Please fill all details'); return; }
    try {
      alert('Your call back request has been submitted');
      setShowCallForm(false);
      setCallFormData({ name: '', phone: '' });
    } catch {
      alert('Server error. Please try again later.');
    }
  };

  const carouselMedia = useMemo(() => {
    return (project?.media || []).map((m) => ({
      type: m.label === 'video' ? 'video' : 'image',
      url: m.value,
    }));
  }, [project]);

  const validMedia = carouselMedia?.filter((item) => item?.url && item.url.trim() !== '');

  const goNext = () => setCurrentSlide((prev) => (prev === validMedia.length - 1 ? 0 : prev + 1));
  const goPrev = () => setCurrentSlide((prev) => (prev === 0 ? validMedia.length - 1 : prev - 1));

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const scrollUp = () => thumbRef.current?.scrollBy({ top: -120, behavior: 'smooth' });
  const scrollDown = () => thumbRef.current?.scrollBy({ top: 120, behavior: 'smooth' });

  useEffect(() => {
    if (!id) return;
    const loadProject = async () => {
      try {
        setLoading(true);
        const data = await fetchNewLaunchById(id);
        setProject(data);
      } catch (error) {
        console.error('Failed to load project:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProject();
  }, [id]);

  useEffect(() => {
    if (project?.bhk_configurations?.length) {
      setSelectedBHK(project.bhk_configurations[0].bhkType);
    }
  }, [project]);

  if (loading) return <PrLoadingBox>Loading property details...</PrLoadingBox>;

  if (!project) return (
    <PrErrorBox>
      <h2>Property not found</h2>
      <PrBackBtn onClick={() => navigate('/new-launch/all')}>← Back to Listings</PrBackBtn>
    </PrErrorBox>
  );

  const seoTitle = `${project.project_name}${project.sector ? `, ${project.sector}` : ''} - New Launch Project in Gurugram | Instayards`;
  const seoDescription = `${project.project_name} is a new launch residential project${project.sector ? ` in ${project.sector}, Gurugram` : ' in Gurugram'}. ${project.price_info?.value ? `Price: ${project.price_info.value}. ` : ''}Explore floor plans, amenities and pricing on Instayards.`;
  const seoImage = project.media?.find((m) => m?.value)?.value;
  const seoJsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Residence',
      name: project.project_name,
      description: seoDescription,
      image: seoImage,
      address: {
        '@type': 'PostalAddress',
        streetAddress: project.address || undefined,
        addressLocality: 'Gurugram',
        addressRegion: 'Haryana',
        addressCountry: 'IN',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://instayards.com/' },
        { '@type': 'ListItem', position: 2, name: 'New Launch', item: 'https://instayards.com/new-launch' },
        { '@type': 'ListItem', position: 3, name: project.project_name, item: `https://instayards.com/new-launch/${id}` },
      ],
    },
  ];

  return (
    <PrContainer>
      <SEO
        title={seoTitle}
        description={seoDescription}
        path={`/new-launch/${id}`}
        image={seoImage}
        type="product"
        jsonLd={seoJsonLd}
      />
      <PrBackBtn onClick={() => navigate(-1)}>← Back to All Properties</PrBackBtn>

      <PrHeader>
        <div>
          <PrTitle component="h1">
            {project.project_name} {project.sector} {project.address}
          </PrTitle>
        </div>
      </PrHeader>

      {validMedia?.length > 0 && (
        <PrMediaSection>
          <PrCarouselWrapper>
            <PrCarouselMain>
              {validMedia.map((item, index) => (
                <PrCarouselSlide key={index} active={index === currentSlide ? 1 : 0}>
                  {item.type === 'image' ? (
                    <PrCarouselMedia
                      src={item.url}
                      alt={`${project.project_name} photo ${index + 1}`}
                      loading="lazy"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  ) : (
                    <PrCarouselVideo
                      src={item.url}
                      muted
                      playsInline
                      preload="none"
                      autoPlay={index === currentSlide}
                      loop
                    />
                  )}
                </PrCarouselSlide>
              ))}

              <PrCarouselBtn pos="prev" onClick={goPrev}>❮</PrCarouselBtn>
              <PrCarouselBtn pos="next" onClick={goNext}>❯</PrCarouselBtn>
              <PrCarouselCounter>{currentSlide + 1} / {validMedia.length}</PrCarouselCounter>
            </PrCarouselMain>

            <PrThumbsWrapper>
              <PrThumbScrollBtn onClick={scrollUp}>▲</PrThumbScrollBtn>
              <PrThumbnails ref={thumbRef}>
                {validMedia.map((item, index) => (
                  <PrThumbnail
                    key={index}
                    active={index === currentSlide ? 1 : 0}
                    onClick={() => setCurrentSlide(index)}
                  >
                    {item.type === 'image' ? (
                      <img src={item.url} alt="thumb" loading="lazy" />
                    ) : (
                      <video src={item.url} muted preload="none" />
                    )}
                  </PrThumbnail>
                ))}
              </PrThumbnails>
              <PrThumbScrollBtn onClick={scrollDown}>▼</PrThumbScrollBtn>
            </PrThumbsWrapper>
          </PrCarouselWrapper>
        </PrMediaSection>
      )}

      <PrMain>
        <PrLeftSection>
          {project?.project_highlights?.length > 0 && (
            <PrSectionCard>
              <PrSectionTitle component="h2">Project Highlights</PrSectionTitle>
              <PrHighlightsGrid>
                {project.project_highlights.map((h, i) => (
                  <PrHighlightItem key={i}>
                    <span>{h.icon}</span>
                    <span>{h.title}</span>
                  </PrHighlightItem>
                ))}
              </PrHighlightsGrid>
            </PrSectionCard>
          )}

          {project?.project_overview_stats?.length > 0 && (
            <PrSectionCard>
              <PrSectionTitle component="h2">Project Overview</PrSectionTitle>
              <PrStatsGrid>
                {project.project_overview_stats.map((s, i) => (
                  <PrStatCard key={i}>
                    <PrStatLabel>{s.label}</PrStatLabel>
                    <PrStatValue>{s.value}</PrStatValue>
                  </PrStatCard>
                ))}
              </PrStatsGrid>
            </PrSectionCard>
          )}

          {project?.bhk_configurations?.length > 0 && (
            <PrSectionCard>
              <PrSectionTitle component="h2">Configuration</PrSectionTitle>
              <PrBhkTabs>
                {project.bhk_configurations.map((cfg, i) => (
                  <PrBhkTab
                    key={i}
                    active={cfg.bhkType === selectedBHK ? 1 : 0}
                    onClick={() => setSelectedBHK(cfg.bhkType)}
                  >
                    {cfg.bhkType}
                  </PrBhkTab>
                ))}
              </PrBhkTabs>

              <PrLayoutGrid>
                {showLayoutModal && selectedLayout && (
                  <PrLayoutModalOverlay onClick={() => setShowLayoutModal(false)}>
                    <PrLayoutModal onClick={(e) => e.stopPropagation()}>
                      <img src={selectedLayout.imageUrl} alt="Layout" />
                      <PrLayoutModalClose onClick={() => setShowLayoutModal(false)}>✕</PrLayoutModalClose>
                    </PrLayoutModal>
                  </PrLayoutModalOverlay>
                )}
                {project.bhk_configurations
                  .find((cfg) => cfg.bhkType === selectedBHK)
                  ?.layouts?.map((l, j) => (
                    <PrLayoutCard
                      key={j}
                      active={selectedLayout?.imageUrl === l.imageUrl ? 1 : 0}
                      onClick={() => setSelectedLayout(l)}
                    >
                      <PrLayoutCardImg>
                        <img src={l.imageUrl} alt="" />
                        <PrViewLayoutBtn
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedLayout(l);
                            setShowLayoutModal(true);
                          }}
                        >
                          View Layout
                        </PrViewLayoutBtn>
                      </PrLayoutCardImg>
                      <PrLayoutCardDetails>
                        <h4>{l.type || selectedBHK}</h4>
                        <PrLayoutArea>{l.superBuiltUp}</PrLayoutArea>
                        <PrLayoutPrice>{l.price}</PrLayoutPrice>
                      </PrLayoutCardDetails>
                    </PrLayoutCard>
                  ))}
              </PrLayoutGrid>
            </PrSectionCard>
          )}

          {project?.current_phase && (
            <PrCurrentPhase>
              <PrPhaseSectionTitle component="h2">Current Phase</PrPhaseSectionTitle>
              <PrPhaseContent>
                {project.current_phase?.stats?.length > 0 && (
                  <PrPhaseStatsGrid>
                    {project.current_phase.stats.map((stat, i) => (
                      <PrPhaseStat key={i}>
                        <span>{stat.label}</span>
                        <span>{stat.value}</span>
                      </PrPhaseStat>
                    ))}
                  </PrPhaseStatsGrid>
                )}

                {project.current_phase?.paymentPlan && (
                  <>
                    <PrSubsectionTitle component="h3">
                      {project.current_phase.paymentPlan.title}
                    </PrSubsectionTitle>
                    <PrTableResponsive>
                      <PrPaymentTable>
                        <thead>
                          <tr>
                            {project.current_phase.paymentPlan.tableHeadings?.map((h, i) => (
                              <th key={i}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {project.current_phase.paymentPlan.rows?.map((row, i) => (
                            <tr key={i}>
                              {row?.map((cell, j) => <td key={j}>{cell}</td>)}
                            </tr>
                          ))}
                        </tbody>
                      </PrPaymentTable>
                    </PrTableResponsive>
                  </>
                )}

                {project.current_phase?.specialOffers?.offers?.length > 0 && (
                  <>
                    <PrSubsectionTitle component="h3">
                      {project.current_phase.specialOffers.title}
                    </PrSubsectionTitle>
                    <PrOffersGrid>
                      {project.current_phase.specialOffers.offers.map((offer, i) => (
                        <PrOfferCard key={i}>
                          <PrOfferHeader><span>{offer.tag}</span></PrOfferHeader>
                          <PrOfferTable>
                            <tbody>
                              {offer.rows?.map((row, j) => (
                                <tr key={j}>
                                  <td>{row?.[0]}</td>
                                  <td>{row?.[1]}</td>
                                </tr>
                              ))}
                            </tbody>
                          </PrOfferTable>
                        </PrOfferCard>
                      ))}
                    </PrOffersGrid>
                  </>
                )}

                {project.current_phase?.maintenanceCharges && (
                  <PrMaintenanceSection>
                    <PrSubsectionTitle component="h3">
                      {project.current_phase.maintenanceCharges.title}
                    </PrSubsectionTitle>
                    <PrMaintenanceTableContainer>
                      <PrMaintenanceTable>
                        <thead>
                          <tr>
                            {project.current_phase.maintenanceCharges.tableHeadings?.map((h, i) => (
                              <th key={i}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {project.current_phase.maintenanceCharges.rows?.map((row, i) => (
                            <tr key={i}>
                              {row?.map((cell, j) => <td key={j}>{cell || '-'}</td>)}
                            </tr>
                          ))}
                        </tbody>
                      </PrMaintenanceTable>
                    </PrMaintenanceTableContainer>
                  </PrMaintenanceSection>
                )}
              </PrPhaseContent>
            </PrCurrentPhase>
          )}

          {project?.amenities?.amenities?.length > 0 && (
            <PrSectionCard>
              <PrSectionTitle component="h2"><FiCoffee /> Amenities</PrSectionTitle>
              <PrAmenitiesCategories>
                {project.amenities.amenities.map((section, idx) => (
                  <PrAmenityCategory key={idx}>
                    <PrCategoryTitle component="h3">
                      {section.icon === 'FiHome' ? <FiHome /> : <FiGrid />}
                      <span>{section.title}</span>
                    </PrCategoryTitle>
                    {section.subCategories?.length > 0 ? (
                      <PrSubCategories>
                        {section.subCategories.map((subCat, subIdx) => (
                          <PrSubCategory key={subIdx}>
                            <h4><span>{subCat.icon}</span> {subCat.name}</h4>
                            <PrAmenitiesMiniGrid>
                              {subCat.items?.map((item, itemIdx) => (
                                <PrAmenityMiniItem key={itemIdx}>
                                  <i className={item.icon}></i>
                                  <span>{item.name}</span>
                                </PrAmenityMiniItem>
                              ))}
                            </PrAmenitiesMiniGrid>
                          </PrSubCategory>
                        ))}
                      </PrSubCategories>
                    ) : (
                      <PrAmenitiesMiniGrid>
                        {section.items?.map((item, itemIdx) => (
                          <PrAmenityMiniItem key={itemIdx}>
                            <i className={item.icon}></i>
                            <span>{item.name}</span>
                          </PrAmenityMiniItem>
                        ))}
                      </PrAmenitiesMiniGrid>
                    )}
                  </PrAmenityCategory>
                ))}
              </PrAmenitiesCategories>
            </PrSectionCard>
          )}

          {project?.nearby_facilities?.length > 0 && (
            <PrSectionCard>
              <PrSectionTitle component="h2">Nearby Facilities</PrSectionTitle>
              <PrFacilitiesGrid>
                {project.nearby_facilities.map((cat, i) => (
                  <PrFacilityCard key={i}>
                    <PrFacilityHeader>
                      <i className={cat.icon}></i>
                      <span>{cat.category}</span>
                    </PrFacilityHeader>
                    <PrFacilityList>
                      {cat.places?.map((p, j) => (
                        <li key={j}>
                          <PrPlaceName>{p.name}</PrPlaceName>
                          <PrPlaceDistance>{p.distance}</PrPlaceDistance>
                        </li>
                      ))}
                    </PrFacilityList>
                  </PrFacilityCard>
                ))}
              </PrFacilitiesGrid>
            </PrSectionCard>
          )}

          {(project?.green_flags?.length > 0 || project?.red_flags?.length > 0) && (
            <PrFlagsSection>
              {project?.green_flags?.length > 0 && (
                <PrGreenFlags>
                  <h3><i className="fas fa-check-circle"></i> Green Flags</h3>
                  <ul>
                    {project.green_flags.map((flag, i) => (
                      <li key={i}><i className="fas fa-check-circle"></i>{flag}</li>
                    ))}
                  </ul>
                </PrGreenFlags>
              )}
              {project?.red_flags?.length > 0 && (
                <PrRedFlags>
                  <h3><i className="fas fa-exclamation-circle"></i> Points to Consider</h3>
                  <ul>
                    {project.red_flags.map((flag, i) => (
                      <li key={i}><i className="fas fa-exclamation-circle"></i>{flag}</li>
                    ))}
                  </ul>
                </PrRedFlags>
              )}
            </PrFlagsSection>
          )}

          {project?.additional_info?.filter(
            (i) => i?.value !== null && i?.value !== '' && i?.value !== undefined
          ).length > 0 && (
            <PrSectionCard>
              <PrSectionTitle component="h2">Additional Info</PrSectionTitle>
              <PrInfoGrid>
                {project.additional_info
                  .filter((i) => i?.value !== null && i?.value !== '' && i?.value !== undefined)
                  .map((i, idx) => (
                    <PrInfoItem key={idx}>
                      <span>{i.label}</span>
                      <strong>{i.value}</strong>
                    </PrInfoItem>
                  ))}
              </PrInfoGrid>
            </PrSectionCard>
          )}
        </PrLeftSection>

        <PrRightSection>
          {project?.price_info && (
            <PrPriceCard>
              <PrPriceBadge>{project.price_info?.badge}</PrPriceBadge>
              <PrPriceValue>{project.price_info?.value}</PrPriceValue>
              <PrPriceSub>{project.price_info?.subtext}</PrPriceSub>
            </PrPriceCard>
          )}

          {project?.apartment_highlights?.length > 0 && (
            <PrHighlightsCard>
              <h3>Apartment Highlights</h3>
              {project.apartment_highlights.map((highlight, i) => (
                <PrApartmentHighlightItem key={i}>
                  <FiCheckCircle />
                  <span>{highlight}</span>
                </PrApartmentHighlightItem>
              ))}
            </PrHighlightsCard>
          )}

          <PrContactButtons>
            <PrContactBtn btntype="call" onClick={() => setShowCallForm(true)}>
              <FiPhone /> Request Call Back
            </PrContactBtn>
            <PrContactBtn btntype="whatsapp" onClick={handleWhatsAppQuery}>
              <FiMessageCircle /> Ask on WhatsApp
            </PrContactBtn>
          </PrContactButtons>
        </PrRightSection>

        {showCallForm && (
          <PrCallFormModal onClick={() => setShowCallForm(false)}>
            <PrModalContent onClick={(e) => e.stopPropagation()}>
              <PrModalClose onClick={() => setShowCallForm(false)}>×</PrModalClose>
              <h3>Request Call Back</h3>
              <form onSubmit={handleCallFormSubmit}>
                <PrFormGroup>
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={callFormData.name}
                    onChange={(e) => setCallFormData((prev) => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </PrFormGroup>
                <PrFormGroup>
                  <label>Contact Number</label>
                  <input
                    type="tel"
                    value={callFormData.phone}
                    onChange={(e) => setCallFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    required
                  />
                </PrFormGroup>
                <PrSubmitBtn type="submit">Submit Request</PrSubmitBtn>
              </form>
            </PrModalContent>
          </PrCallFormModal>
        )}
      </PrMain>
    </PrContainer>
  );
};

export default Property;
