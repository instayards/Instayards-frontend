// src/components/Contact/Contact.js
import { useState } from 'react';
import SEO from '../SEO/SEO';
import {
  FiMail, FiPhone, FiMapPin, FiMessageCircle,
  FiSend, FiCheckCircle, FiUser, FiMessageSquare, FiAlertCircle,
} from 'react-icons/fi';
import {
  ContactContainer,
  ContactHero, HeroOverlay, OverlayGradient, HeroContent,
  HeroBadge, HeroTitle, HeroSubtitle, HeroCta, ContactLink,
  ContactMain, ContactGrid,
  ContactInfoSection, InfoCard, InfoIconWrapper, InfoCardTitle,
  InfoMain, InfoSub, InfoAction,
  ContactFormSection, FormHeader, FormTitle, FormSubtitle,
  ContactForm, FormRow, FormGroup, FormLabel, StyledInput, StyledTextarea, SubmitBtn,
  SuccessMessage, SuccessIcon, SuccessTitle, SuccessText,
  WhatsappSection, WhatsappContent, WhatsappIconBox, WhatsappInfo,
  WhatsappTitle, WhatsappSubtitle, WhatsappBtn,
} from './ContactStyles';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState(null); // { ok: bool, msg: string }
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => setSubmitted(false), 4000);
      } else {
        setStatus({ ok: false, msg: data.message || 'Something went wrong. Please try again.' });
      }
    } catch {
      setStatus({ ok: false, msg: 'Unable to send message. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ContactContainer>
      <SEO
        title="Contact Us | Instayards - Real Estate Gurugram"
        description="Get in touch with Instayards for luxury property listings, site visits and expert real estate guidance in Gurugram. Call, WhatsApp or send us a message."
        keywords="contact instayards, real estate agent gurugram, property enquiry gurgaon"
        path="/contact"
      />

      {/* Hero */}
      <ContactHero>
        <HeroOverlay>
          <OverlayGradient />
        </HeroOverlay>
        <HeroContent>
          <HeroBadge>
            <FiMessageCircle />
            <span>Connect With Us</span>
          </HeroBadge>
          <HeroTitle variant="h1">Get in Touch with Instayards</HeroTitle>
          <HeroSubtitle>
            Have questions about properties, services, or partnerships?
            We're here to help you find your dream home.
          </HeroSubtitle>
          <HeroCta>
            <ContactLink href="tel:+919818420044" variant="phone">
              <FiPhone /><span>+91 9818420044</span>
            </ContactLink>
            <ContactLink href="mailto:instayards@gmail.com" variant="email">
              <FiMail /><span>instayards@gmail.com</span>
            </ContactLink>
          </HeroCta>
        </HeroContent>
      </ContactHero>

      <ContactMain>
        <ContactGrid>

          {/* Info Card */}
          <ContactInfoSection>
            <InfoCard>
              <InfoIconWrapper><FiMapPin /></InfoIconWrapper>
              <InfoCardTitle>Visit Our Office</InfoCardTitle>
              <InfoMain>Instayards HQ</InfoMain>
              <InfoSub> Office # 301, M3M Cosmopolitan, Badshahpur, Sector 66, Gurugram, Haryana 122002</InfoSub>
              <InfoAction>
                <FiMapPin /> Get Directions
              </InfoAction>
            </InfoCard>
          </ContactInfoSection>

          {/* Form */}
          <ContactFormSection>
            <FormHeader>
              <FormTitle>Send Us a Message</FormTitle>
              <FormSubtitle>
                Fill out the form below and our team will get back to you within 24 hours.
              </FormSubtitle>
            </FormHeader>

            {submitted ? (
              <SuccessMessage>
                <SuccessIcon><FiCheckCircle /></SuccessIcon>
                <SuccessTitle>Thank You!</SuccessTitle>
                <SuccessText>
                  Your message has been sent successfully. We'll contact you shortly.
                </SuccessText>
              </SuccessMessage>
            ) : (
              <ContactForm onSubmit={handleSubmit}>
                <FormRow>
                  <FormGroup>
                    <FormLabel htmlFor="name"><FiUser />Full Name</FormLabel>
                    <StyledInput
                      type="text" id="name" name="name"
                      value={formData.name} onChange={handleChange}
                      placeholder="Enter your full name" required
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel htmlFor="email"><FiMail />Email Address</FormLabel>
                    <StyledInput
                      type="email" id="email" name="email"
                      value={formData.email} onChange={handleChange}
                      placeholder="Enter your email" required
                    />
                  </FormGroup>
                </FormRow>

                <FormGroup>
                  <FormLabel htmlFor="phone"><FiPhone />Phone Number</FormLabel>
                  <StyledInput
                    type="tel" id="phone" name="phone"
                    value={formData.phone} onChange={handleChange}
                    placeholder="10-digit mobile number" required
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="message">
                    <FiMessageSquare />Your Message
                    <span style={{ color: '#94a3b8', fontWeight: 400, marginLeft: 4 }}>(Optional)</span>
                  </FormLabel>
                  <StyledTextarea
                    id="message" name="message"
                    value={formData.message} onChange={handleChange}
                    placeholder="Tell us about your requirements, preferred locations, budget, etc."
                    rows="6"
                  />
                </FormGroup>

                {status && !status.ok && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#ef4444', fontSize: 14, marginBottom: 8 }}>
                    <FiAlertCircle /> {status.msg}
                  </div>
                )}

                <SubmitBtn type="submit" disabled={submitting}>
                  <FiSend /> {submitting ? 'Sending...' : 'Send Message'}
                </SubmitBtn>
              </ContactForm>
            )}
          </ContactFormSection>

        </ContactGrid>

        {/* WhatsApp */}
        <WhatsappSection>
          <WhatsappContent>
            <WhatsappIconBox><FiMessageCircle /></WhatsappIconBox>
            <WhatsappInfo>
              <WhatsappTitle>Quick Response on WhatsApp</WhatsappTitle>
              <WhatsappSubtitle>Get instant assistance for property queries</WhatsappSubtitle>
            </WhatsappInfo>
            <WhatsappBtn
              href="https://wa.me/919873927527?text=Hi%20Instayards,%20I%20need%20help%20with%20property%20information"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chat on WhatsApp
            </WhatsappBtn>
          </WhatsappContent>
        </WhatsappSection>

      </ContactMain>
    </ContactContainer>
  );
};

export default Contact;
