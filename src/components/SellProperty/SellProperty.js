// src/components/SellProperty/SellProperty.js
import { useState } from 'react';
import {
  FiUser, FiPhone, FiCheckCircle,
  FiCalendar, FiShield, FiTrendingUp, FiSend,
} from 'react-icons/fi';
import {
  SpContainer, SpHero, SpHeroOverlay, SpHeroContent, SpHeroBadge,
  SpHeroTitle, SpHeroSubtitle, SpHeroStats, SpStatItem, SpStatNumber, SpStatLabel, SpStatDivider,
  SpMain, SpInner, SpWrapper,
  SpFormSection, SpFormCard, SpFormHeader, SpFormBadge, SpFormTitle, SpFormSubtitle,
  SpSimpleForm, SpFormGroup, SpInputHint, SpFormAgreement, SpSubmitBtn, SpFormAssurance,
  SpSuccessMessage, SpSuccessIcon, SpSuccessTitle, SpSuccessText, SpSuccessDetails,
  SpSupportInfo, SpSupportItem,
  SpBenefitsSection, SpBenefitsCard, SpBenefitsTitle, SpBenefitsGrid, SpBenefitItem,
  SpBenefitIcon, SpBenefitContent,
} from './SellPropertyStyles';
import SEO from '../SEO/SEO';

const HomeIconSVG = () => (
  <svg viewBox="0 0 48 44" xmlns="http://www.w3.org/2000/svg" width="22" height="20" style={{ display: 'block' }}>
    <defs>
      <linearGradient id="roofLeft" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#1f7a94" />
        <stop offset="100%" stopColor="#165f73" />
      </linearGradient>
      <linearGradient id="roofRight" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#2494b4" />
        <stop offset="100%" stopColor="#1f7a94" />
      </linearGradient>
    </defs>
    {/* Roof left side - dark teal */}
    <polygon points="24,2 2,22 24,22" fill="url(#roofLeft)" />
    {/* Roof right side - lighter teal */}
    <polygon points="24,2 46,22 24,22" fill="url(#roofRight)" />
    {/* Chimney */}
    <rect x="30" y="6" width="5" height="9" fill="#165f73" rx="1" />
    {/* House body */}
    <rect x="7" y="22" width="34" height="20" fill="#f5c842" rx="1" />
    {/* Door */}
    <rect x="19" y="30" width="10" height="12" fill="#1f7a94" rx="2" />
    {/* Left window */}
    <rect x="10" y="26" width="7" height="6" rx="1" fill="rgba(255,255,255,0.7)" />
    {/* Right window */}
    <rect x="31" y="26" width="7" height="6" rx="1" fill="rgba(255,255,255,0.7)" />
  </svg>
);

const benefits = [
  
  { icon: '🛡️', title: 'Verified Buyers', description: 'Only genuine, pre-approved buyers get access' },
  { icon: '⚡', title: 'Fast Sale', description: 'Average selling time: 30 days or less' },
  { icon: '📊', title: 'Price Optimization', description: 'Get 5-15% higher than market price' },
  { icon: '⚖️', title: 'Legal Protection', description: 'End-to-end legal documentation support' },
  { icon: '📱', title: 'Dedicated Manager', description: 'Single point of contact throughout the process' },
  {
  icon: '🧾',
  title: 'Taxation Guidence',
  description: 'Get expert guidance on tax-related matters and financial compliance'
}
];

const SellProperty = () => {
  const [formData, setFormData] = useState({ fullName: '', contactNumber: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ fullName: '', contactNumber: '' });
    }, 3000);
  };

  return (
    <SpContainer>
      <SEO
        title="Sell Your Property in Gurugram | Instayards"
        description="Sell your property in Gurugram quickly and confidently with Instayards. Get a fair valuation, expert support, and access to verified buyers."
        keywords="sell property in gurgaon, sell house gurugram, property valuation gurgaon"
        path="/sell"
      />
      {/* Hero */}
      <SpHero>
        <SpHeroOverlay />
        <SpHeroContent>
          <SpHeroBadge>
            <HomeIconSVG />
            <span>Sell With Confidence</span>
          </SpHeroBadge>
          <SpHeroTitle variant="h1">Sell Your Property </SpHeroTitle>
          <SpHeroSubtitle>
            Free Inspection. Online and Offline Marketing. Connect with verified buyers. End to-end documentation and Legal Support.
            Get the best price for your property.
          </SpHeroSubtitle>
          <SpHeroStats>
            
            {/* <SpStatDivider /> */}
            <SpStatItem>
              <SpStatNumber>40 Days</SpStatNumber>
              <SpStatLabel>Average Sale</SpStatLabel>
            </SpStatItem>
            {/* <SpStatDivider /> */}
            
          </SpHeroStats>
        </SpHeroContent>
      </SpHero>

      {/* Main Content */}
      <SpMain>
        <SpInner>
          <SpWrapper>
            {/* Contact Form */}
            <SpFormSection>
              <SpFormCard>
                <SpFormHeader>
                  <SpFormBadge>
                    <FiSend />
                    <span>Get Free Consultation</span>
                  </SpFormBadge>
                  <SpFormTitle variant="h2">Start Selling Today</SpFormTitle>
                  <SpFormSubtitle>
                    Share your details and our property expert will contact you within 2 hours.
                  </SpFormSubtitle>
                </SpFormHeader>

                {isSubmitted ? (
                  <SpSuccessMessage>
                    <SpSuccessIcon><FiCheckCircle /></SpSuccessIcon>
                    <SpSuccessTitle variant="h3">Thank You!</SpSuccessTitle>
                    <SpSuccessText>Our property expert will contact you within 2 hours.</SpSuccessText>
                    <SpSuccessDetails>
                      <p><strong>Next Steps:</strong></p>
                      <ul>
                        <li>Initial consultation call</li>
                        <li>Free property valuation</li>
                        <li>Personalized selling strategy</li>
                      </ul>
                    </SpSuccessDetails>
                  </SpSuccessMessage>
                ) : (
                  <SpSimpleForm onSubmit={handleSubmit}>
                    <SpFormGroup>
                      <label htmlFor="fullName">
                        <FiUser />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        required
                      />
                    </SpFormGroup>

                    <SpFormGroup>
                      <label htmlFor="contactNumber">
                        <FiPhone />
                        Contact Number *
                      </label>
                      <input
                        type="tel"
                        id="contactNumber"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleInputChange}
                        placeholder="10-digit mobile number"
                        pattern="[0-9]{10}"
                        required
                      />
                      <SpInputHint>We'll call on this number</SpInputHint>
                    </SpFormGroup>

                    <SpFormAgreement>
                      <input type="checkbox" id="agreeTerms" required />
                      <label htmlFor="agreeTerms">
                        I agree to receive calls and WhatsApp messages regarding my property sale
                      </label>
                    </SpFormAgreement>

                    <SpSubmitBtn type="submit">
                      <FiSend />
                      Get Free Consultation
                    </SpSubmitBtn>

                    <SpFormAssurance>
                      <FiShield />
                      <span>Your information is secure. We don't share your details.</span>
                    </SpFormAssurance>
                  </SpSimpleForm>
                )}

                <SpSupportInfo>
                  <SpSupportItem>
                    <FiPhone />
                    <div>
                      <span>Need immediate assistance?</span>
                      <strong>+91 9818420044</strong>
                    </div>
                  </SpSupportItem>
                  <SpSupportItem>
                    <FiCalendar />
                    <div>
                      <span>Available</span>
                      <strong>Tuesday - Sunday, 10AM - 7PM</strong>
                    </div>
                  </SpSupportItem>
                </SpSupportInfo>
              </SpFormCard>
            </SpFormSection>

            {/* Benefits */}
            <SpBenefitsSection>
              <SpBenefitsCard>
                <SpBenefitsTitle variant="h3">
                  <FiTrendingUp />
                  Why Choose Instayards?
                </SpBenefitsTitle>
                <SpBenefitsGrid>
                  {benefits.map((benefit, index) => (
                    <SpBenefitItem key={index}>
                      <SpBenefitIcon>{benefit.icon}</SpBenefitIcon>
                      <SpBenefitContent>
                        <h4>{benefit.title}</h4>
                        <p>{benefit.description}</p>
                      </SpBenefitContent>
                    </SpBenefitItem>
                  ))}
                </SpBenefitsGrid>
              </SpBenefitsCard>
            </SpBenefitsSection>
          </SpWrapper>
        </SpInner>
      </SpMain>
    </SpContainer>
  );
};

export default SellProperty;
