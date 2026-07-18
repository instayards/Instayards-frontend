// src/components/Footer/FooterController.js
import React from 'react';
import data from './Footer.json';
import logo from '../../assets/logo.png';
import {
  FiMail, FiPhone, FiMapPin,
  FiFacebook, FiInstagram, FiLinkedin, FiTwitter,
  FiChevronRight, FiArrowUp,
} from 'react-icons/fi';
import {
  FooterRoot, FooterGlow, FooterContainer, FooterMain,
  BrandSection, BrandRow, FooterLogo, BrandText, BrandName, BrandTagline,
  FooterDescription, NewsletterBox, NewsletterTitle, NewsletterInput, SubscribeBtn,
  FooterGrid, NavSection, NavGroup, FooterGroupTitle, NavLinks, FooterNavLink,
  ContactSection, ContactInfoList, ContactItem, ContactIconBox,
  ContactDetails, ContactLabel, ContactValue,
  SocialRow, SocialLink, SocialTooltip,
  FooterBottom, FooterBottomContent, Copyright, LegalLinks, LegalLink,
  LegalDivider, BackToTop,
} from './FooterStyles';

const socials = [
  { href: 'https://www.facebook.com/instayards', icon: <FiFacebook />, label: 'Facebook' },
  { href: 'https://www.instagram.com/instantyards?igsh=eGRhejY1OTRmM2sz', icon: <FiInstagram />, label: 'Instagram' },
  { href: 'https://www.linkedin.com/company/instayards/', icon: <FiLinkedin />, label: 'LinkedIn' },
  { href: 'https://x.com/instayards', icon: <FiTwitter />, label: 'Twitter' },
];

const contactItems = (contact) => [
  { icon: <FiMapPin />, label: 'Location', value: contact.address },
  { icon: <FiPhone />, label: 'Phone',    value: contact.phone },
  { icon: <FiMail />,  label: 'Email',    value: contact.email },
];

const FooterController = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <FooterRoot>
      <FooterGlow />
      <FooterContainer>
        <FooterMain>

          {/* Brand */}
          <BrandSection>
            <BrandRow>
              <FooterLogo src={logo} alt="Instayards Logo" />
              <BrandText>
                <BrandName>Instayards</BrandName>
                <BrandTagline>Simplifying Real Estate</BrandTagline>
              </BrandText>
            </BrandRow>

            <FooterDescription>
              Transforming real estate experiences with cutting-edge technology,
              transparent processes, and personalized guidance for every property journey.
            </FooterDescription>

            <NewsletterBox>
              <NewsletterTitle>Stay Updated</NewsletterTitle>
              <NewsletterInput>
                <input type="email" placeholder="Enter your email" />
                <SubscribeBtn aria-label="Subscribe">
                  <FiMail />
                </SubscribeBtn>
              </NewsletterInput>
            </NewsletterBox>
          </BrandSection>

          {/* Grid */}
          <FooterGrid>

            {/* Nav */}
            <NavSection>
              <NavGroup>
                <FooterGroupTitle><span>✦</span> Quick Links</FooterGroupTitle>
                <NavLinks>
                  {data.links.map((item) => (
                    <FooterNavLink key={item.path} to={item.path}>
                      <FiChevronRight /><span>{item.label}</span>
                    </FooterNavLink>
                  ))}
                </NavLinks>
              </NavGroup>

              <NavGroup>
                <FooterGroupTitle><span>✦</span> Company</FooterGroupTitle>
                <NavLinks>
                  {data.company.map((item) => (
                    <FooterNavLink key={item.path} to={item.path}>
                      <FiChevronRight /><span>{item.label}</span>
                    </FooterNavLink>
                  ))}
                </NavLinks>
              </NavGroup>
            </NavSection>

            {/* Contact + Social */}
            <ContactSection>
              <NavGroup>
                <FooterGroupTitle><span>✦</span> Get In Touch</FooterGroupTitle>
                <ContactInfoList>
                  {contactItems(data.contact).map(({ icon, label, value }) => (
                    <ContactItem key={label}>
                      <ContactIconBox>{icon}</ContactIconBox>
                      <ContactDetails>
                        <ContactLabel>{label}</ContactLabel>
                        <ContactValue>{value}</ContactValue>
                      </ContactDetails>
                    </ContactItem>
                  ))}
                </ContactInfoList>
              </NavGroup>

              <NavGroup>
                <FooterGroupTitle><span>✦</span> Follow Us</FooterGroupTitle>
                <SocialRow>
                  {socials.map(({ href, icon, label }) => (
                    <SocialLink key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                      {icon}
                      <SocialTooltip className="social-tooltip">{label}</SocialTooltip>
                    </SocialLink>
                  ))}
                </SocialRow>
              </NavGroup>
            </ContactSection>

          </FooterGrid>
        </FooterMain>

        {/* Bottom */}
        <FooterBottom>
          <FooterBottomContent>
            <Copyright>© {new Date().getFullYear()} Instayards. All rights reserved.</Copyright>
            <LegalLinks>
              <LegalLink to="/privacy">Privacy Policy</LegalLink>
              <LegalDivider>•</LegalDivider>
              <LegalLink to="/terms">Terms of Service</LegalLink>
              <LegalDivider>•</LegalDivider>
              <LegalLink to="/privacy">Cookie Policy</LegalLink>
            </LegalLinks>
            <BackToTop onClick={scrollToTop} aria-label="Back to top">
              <FiArrowUp />
            </BackToTop>
          </FooterBottomContent>
        </FooterBottom>

      </FooterContainer>
    </FooterRoot>
  );
};

export default FooterController;
