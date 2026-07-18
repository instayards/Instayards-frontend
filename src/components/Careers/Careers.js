// src/components/Careers/Careers.js
import { useState } from 'react';
import {
  FiBriefcase, FiHeart, FiTarget, FiUsers, FiTrendingUp,
  FiSend, FiCheckCircle, FiChevronRight, FiAlertCircle,
} from 'react-icons/fi';
import {
  CareersContainer, Container,
  CareersHero, HeroOverlay, OverlayGradient, HeroContent,
  HeroBadge, HeroTitle, HeroSubtitle, HeroCtaRow,
  HeroBtnPrimary, HeroBtnSecondary,
  HeroStats, StatItem, StatNumber, StatLabel, StatDivider,
  SectionHeader, SectionEyebrow, SectionTitle, SectionSubtitle,
  CultureSection, CultureGrid, CultureCard, CultureIconBox,
  CultureCardTitle, CultureCardText,
  ApplicationSection, ApplicationWrapper,
  ApplicationInfo, InfoBadge, InfoTitle, InfoSubtitle,
  TipsBox, TipsTitle, TipItem, ContactBox, ContactTitle, ContactText,
  ApplicationFormBox, FormTitle, FormDesc, FormDivider, FormGroup, FormLabel,
  StyledInput, StyledSelect, StyledTextarea, FormRow,
  FileUploadBox, FileLabel, FileHint, FormCheckboxRow, SubmitButton,
} from './CareersStyles';
import SEO from '../SEO/SEO';

const Careers = () => {
  const [applicationForm, setApplicationForm] = useState({
    name: '', email: '', phone: '', position: '', experience: '', coverLetter: '', resume: null,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApplicationForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setApplicationForm(prev => ({ ...prev, resume: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/careers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: applicationForm.name,
          email: applicationForm.email,
          phone: applicationForm.phone,
          position: applicationForm.position,
          experience: applicationForm.experience,
          coverLetter: applicationForm.coverLetter,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setSubmitted(true);
        setApplicationForm({ name: '', email: '', phone: '', position: '', experience: '', coverLetter: '', resume: null });
      } else {
        setError(data.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Unable to submit application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <CareersContainer>
      <SEO
        title="Careers | Join Instayards - Real Estate Careers in Gurugram"
        description="Explore career opportunities at Instayards. Join our team and help redefine real estate in Gurugram with transparency and technology."
        keywords="instayards careers, real estate jobs gurugram, jobs in gurgaon real estate"
        path="/careers"
      />

      {/* Hero */}
      <CareersHero>
        <HeroOverlay>
          <OverlayGradient />
        </HeroOverlay>
        <HeroContent>
          <HeroBadge>
            <FiBriefcase />
            <span>We're Hiring</span>
          </HeroBadge>
          <HeroTitle variant="h1">Build the Future of Real Estate</HeroTitle>
          <HeroSubtitle>
            Join Instayards in revolutionizing property transactions through technology,
            innovation, and exceptional customer experiences.
          </HeroSubtitle>
          <HeroCtaRow>
            <HeroBtnPrimary onClick={() => scrollTo('applyForm')}>
              Apply Now <FiChevronRight />
            </HeroBtnPrimary>
            <HeroBtnSecondary onClick={() => scrollTo('culture')}>
              Our Culture
            </HeroBtnSecondary>
          </HeroCtaRow>
          <HeroStats>
            <StatItem><StatNumber>50+</StatNumber><StatLabel>Team Members</StatLabel></StatItem>
            <StatDivider />
            <StatItem><StatNumber>25+</StatNumber><StatLabel>Cities Served</StatLabel></StatItem>
            <StatDivider />
            <StatItem><StatNumber>4.8★</StatNumber><StatLabel>Employee Rating</StatLabel></StatItem>
          </HeroStats>
        </HeroContent>
      </CareersHero>

      {/* Culture */}
      <CultureSection id="culture">
        <Container>
          <SectionHeader>
            <SectionEyebrow><FiHeart /> Our Values</SectionEyebrow>
            <SectionTitle variant="h2">Culture That Drives Us</SectionTitle>
            <SectionSubtitle>
              We believe in creating an environment where everyone can thrive, grow, and make a real impact.
            </SectionSubtitle>
          </SectionHeader>
          <CultureGrid>
            {[
              { icon: <FiTarget />,     title: 'Mission Driven',       text: 'Every team member contributes to our goal of simplifying real estate for millions.' },
              { icon: <FiUsers />,      title: 'Collaborative Spirit', text: 'We work together across departments to solve complex problems and deliver value.' },
              { icon: <FiTrendingUp />, title: 'Growth Mindset',       text: 'Continuous learning and personal development are baked into everything we do.' },
              { icon: <FiHeart />,      title: 'Customer First',       text: 'Every decision centers around creating exceptional experiences for our users.' },
            ].map(({ icon, title, text }) => (
              <CultureCard key={title}>
                <CultureIconBox className="culture-icon-inner">{icon}</CultureIconBox>
                <CultureCardTitle variant="h3">{title}</CultureCardTitle>
                <CultureCardText>{text}</CultureCardText>
              </CultureCard>
            ))}
          </CultureGrid>
        </Container>
      </CultureSection>

      {/* Application Form */}
      <ApplicationSection id="applyForm">
        <Container>
          <ApplicationWrapper>

            <ApplicationInfo>
              <InfoBadge><FiSend /><span>Apply Now</span></InfoBadge>
              <InfoTitle>Ready to Join the Team?</InfoTitle>
              <InfoSubtitle>
                Submit your application and our recruitment team will reach out within 48 hours.
              </InfoSubtitle>
              <TipsBox>
                <TipsTitle>Application Tips</TipsTitle>
                {[
                  'Tailor your resume to the position',
                  'Highlight your most relevant experience',
                  'Include portfolio or project links',
                  'Write a compelling cover letter',
                ].map(tip => (
                  <TipItem key={tip}><FiCheckCircle /><span>{tip}</span></TipItem>
                ))}
              </TipsBox>
              <ContactBox>
                <ContactTitle>Have Questions?</ContactTitle>
                <ContactText>Email: <strong>instayards@gmail.com</strong></ContactText>
                <ContactText>Call: <strong>+91 9818420044</strong></ContactText>
                <ContactText sx={{ marginTop: '6px', opacity: 0.7 }}>Mon – Sat, 10 AM – 6 PM</ContactText>
              </ContactBox>
            </ApplicationInfo>

            <ApplicationFormBox>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '60px 24px' }}>
                  <FiCheckCircle style={{ fontSize: 56, color: '#10b981', marginBottom: 16 }} />
                  <FormTitle>Application Submitted!</FormTitle>
                  <FormDesc>Thank you for applying. Our team will reach out within 48 hours.</FormDesc>
                </div>
              ) : (
                <>
                  <FormTitle>Submit Your Application</FormTitle>
                  <FormDesc>Fill in the details below and attach your resume to get started.</FormDesc>
                  <FormDivider />

                  <form onSubmit={handleSubmit}>
                    <FormGroup>
                      <FormLabel htmlFor="name">Full Name *</FormLabel>
                      <StyledInput
                        type="text" id="name" name="name"
                        value={applicationForm.name} onChange={handleInputChange}
                        placeholder="Enter your full name" required
                      />
                    </FormGroup>

                    <FormRow>
                      <FormGroup>
                        <FormLabel htmlFor="email">Email Address *</FormLabel>
                        <StyledInput
                          type="email" id="email" name="email"
                          value={applicationForm.email} onChange={handleInputChange}
                          placeholder="you@email.com" required
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormLabel htmlFor="phone">Phone Number *</FormLabel>
                        <StyledInput
                          type="tel" id="phone" name="phone"
                          value={applicationForm.phone} onChange={handleInputChange}
                          placeholder="+91 98765 43210" required
                        />
                      </FormGroup>
                    </FormRow>

                    <FormRow>
                      <FormGroup>
                        <FormLabel htmlFor="position">Position Applying For *</FormLabel>
                        <StyledInput
                          type="text" id="position" name="position"
                          value={applicationForm.position} onChange={handleInputChange}
                          placeholder="e.g., Frontend Developer" required
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormLabel htmlFor="experience">Years of Experience *</FormLabel>
                        <StyledSelect
                          id="experience" name="experience"
                          value={applicationForm.experience} onChange={handleInputChange}
                          required
                        >
                          <option value="">Select experience</option>
                          <option value="0-1">0 – 1 year (Fresher)</option>
                          <option value="1-3">1 – 3 years</option>
                          <option value="3-5">3 – 5 years</option>
                          <option value="5-8">5 – 8 years</option>
                          <option value="8+">8+ years (Senior)</option>
                        </StyledSelect>
                      </FormGroup>
                    </FormRow>

                    <FormGroup>
                      <FormLabel htmlFor="resume">Upload Resume / CV *</FormLabel>
                      <FileUploadBox>
                        <input
                          type="file" id="resume" name="resume"
                          onChange={handleFileChange} accept=".pdf,.doc,.docx" required
                        />
                        <FileLabel htmlFor="resume">
                          {applicationForm.resume ? applicationForm.resume.name : 'Click to upload (PDF, DOC — max 5MB)'}
                        </FileLabel>
                      </FileUploadBox>
                      <FileHint>Accepted: PDF, DOC, DOCX · Max size: 5 MB</FileHint>
                    </FormGroup>

                    <FormGroup>
                      <FormLabel htmlFor="coverLetter">
                        Cover Letter{' '}
                        <span style={{ color: '#94a3b8', fontWeight: 400 }}>(Optional)</span>
                      </FormLabel>
                      <StyledTextarea
                        id="coverLetter" name="coverLetter" rows="4"
                        value={applicationForm.coverLetter} onChange={handleInputChange}
                        placeholder="Tell us why you're excited about this role..."
                      />
                    </FormGroup>

                    <FormCheckboxRow>
                      <input type="checkbox" id="privacy" required />
                      <label htmlFor="privacy">
                        I agree to the processing of my personal data in accordance with the Privacy Policy.
                      </label>
                    </FormCheckboxRow>

                    {error && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#ef4444', fontSize: 14, margin: '8px 0' }}>
                        <FiAlertCircle /> {error}
                      </div>
                    )}

                    <SubmitButton type="submit" disabled={submitting}>
                      {submitting ? 'Submitting...' : 'Submit Application'} {!submitting && <FiSend />}
                    </SubmitButton>
                  </form>
                </>
              )}
            </ApplicationFormBox>

          </ApplicationWrapper>
        </Container>
      </ApplicationSection>

    </CareersContainer>
  );
};

export default Careers;
