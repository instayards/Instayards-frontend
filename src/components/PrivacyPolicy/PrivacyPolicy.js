// src/components/PrivacyPolicy/PrivacyPolicy.js
import {
  FiShield, FiAlertCircle, FiCheckCircle,
  FiEye, FiTrash2, FiDatabase, FiLock,
  FiMail, FiUser, FiGlobe,
} from 'react-icons/fi';
import {
  PpContainer, PpMain, PpWrapper,
  PpSidebar, PpSidebarSection, PpSidebarTitle, PpSidebarNav, PpSidebarLink,
  PpHighlightsList, PpHighlightItem,
  PpContent, PpIntro, PpIntroTitle, PpIntroText,
  PpSections, PpSection, PpSectionHeader, PpSectionNumber, PpSectionTitle, PpSectionContent,
  PpSectionText, PpList, PpListIcon, PpNote,
  PpContactDetails, PpContactItem,
  PpRightsSummary, PpRightsHeader, PpRightsGrid, PpRightCard, PpRightIcon,
  PpRightCardTitle, PpRightCardText,
} from './PrivacyPolicyStyles';
import SEO from '../SEO/SEO';

const sections = [
  {
    id: 'introduction',
    title: '1. Introduction',
    content: 'Instayards is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our real estate platform.',
  },
  {
    id: 'data-collection',
    title: '2. Information We Collect',
    items: [
      'Personal Information: Name, email, phone number, address',
      'Property Preferences: Budget, location, property type',
      'Transaction Details: Property inquiries, purchase history',
      'Technical Data: IP address, browser type, device information',
      'Usage Data: Pages visited, time spent, features used',
    ],
  },
  {
    id: 'collection-methods',
    title: '3. How We Collect Information',
    items: [
      'Directly from you when you register or use our services',
      'Automatically through cookies and tracking technologies',
      'From third-party partners and service providers',
      'Through property inquiry forms and consultations',
    ],
  },
  {
    id: 'data-usage',
    title: '4. How We Use Your Information',
    items: [
      'To provide and improve our real estate services',
      'To match you with suitable properties',
      'To communicate about properties and services',
      'To process transactions and documentation',
      'To personalize your experience',
      'To ensure platform security and prevent fraud',
      'To comply with legal obligations',
    ],
  },
  {
    id: 'data-sharing',
    title: '5. Information Sharing & Disclosure',
    content: 'We do not sell your personal information. We may share information with:',
    items: [
      'Property owners and sellers (with your consent)',
      'Legal and financial service providers for transactions',
      'Government authorities when required by law',
      'Service providers who assist our operations',
      'In case of business transfers or mergers',
    ],
  },
  {
    id: 'data-security',
    title: '6. Data Security Measures',
    items: [
      'Encryption of sensitive data during transmission',
      'Secure servers with restricted access',
      'Regular security audits and vulnerability testing',
      'Employee training on data protection',
      'Incident response and breach notification procedures',
    ],
  },
  {
    id: 'data-retention',
    title: '7. Data Retention Period',
    content: 'We retain your personal data only as long as necessary for the purposes outlined in this policy, or as required by law. Typical retention periods:',
    items: [
      'Active user data: Until account deletion request',
      'Transaction records: 7 years for legal compliance',
      'Inactive accounts: 2 years before deletion',
      'Marketing data: Until opt-out request',
    ],
  },
  {
    id: 'user-rights',
    title: '8. Your Rights & Choices',
    items: [
      'Right to access your personal information',
      'Right to correct inaccurate data',
      'Right to delete your data (right to be forgotten)',
      'Right to restrict or object to processing',
      'Right to data portability',
      'Right to withdraw consent',
      'Right to lodge complaints with authorities',
    ],
  },
  {
    id: 'cookies',
    title: '9. Cookies & Tracking Technologies',
    content: 'We use cookies and similar technologies to enhance your experience:',
    items: [
      'Essential Cookies: Necessary for platform functionality',
      'Analytics Cookies: Help us understand user behavior',
      'Preference Cookies: Remember your settings',
      'Marketing Cookies: Show relevant property ads',
    ],
    note: 'You can control cookie preferences through your browser settings.',
  },
  {
    id: 'third-party',
    title: '10. Third-Party Services',
    content: 'We may use third-party services that have their own privacy policies:',
    items: [
      'Payment processors (Razorpay, Stripe)',
      'Analytics providers (Google Analytics)',
      'Cloud hosting services (AWS, Google Cloud)',
      'Communication tools (SendGrid, Twilio)',
    ],
  },
  {
    id: 'children',
    title: "11. Children's Privacy",
    content: 'Our services are not intended for individuals under 18 years of age. We do not knowingly collect personal information from children. If we become aware of such collection, we will delete it promptly.',
  },
  {
    id: 'updates',
    title: '12. Policy Updates',
    content: 'We may update this Privacy Policy periodically. We will notify you of significant changes through email or platform notifications. Continued use after changes constitutes acceptance.',
  },
  {
    id: 'contact',
    title: '13. Contact Information',
    content: 'For privacy-related questions or to exercise your rights, contact our Data Protection Officer:',
    contact: {
      email: 'instayards@gmail.com',
      phone: '+91 9818420044',
      address: 'Data Protection Officer, Instayards, Sector 44, Gurugram, Haryana 122003',
    },
  },
];

const PrivacyPolicy = () => {
  return (
    <PpContainer>
      <SEO
        title="Privacy Policy | Instayards"
        description="Understand how Instayards collects, uses and protects your personal information on our real estate platform."
        path="/privacy"
      />
      <PpMain>
        <PpWrapper>
          {/* Sidebar */}
          <PpSidebar>
            <PpSidebarSection>
              <PpSidebarTitle>
                <FiShield />
                Quick Links
              </PpSidebarTitle>
              <PpSidebarNav>
                {sections.map((section) => (
                  <PpSidebarLink key={section.id} href={`#${section.id}`}>
                    {section.title}
                  </PpSidebarLink>
                ))}
              </PpSidebarNav>
            </PpSidebarSection>

            <PpSidebarSection>
              <PpSidebarTitle>
                <FiAlertCircle />
                Key Highlights
              </PpSidebarTitle>
              <PpHighlightsList>
                {['No data selling', 'Strong encryption', 'Full user control', 'Transparent practices'].map((text) => (
                  <PpHighlightItem key={text}>
                    <FiCheckCircle />
                    <span>{text}</span>
                  </PpHighlightItem>
                ))}
              </PpHighlightsList>
            </PpSidebarSection>
          </PpSidebar>

          {/* Content */}
          <PpContent>
            <PpIntro>
              <PpIntroTitle variant="h2">Your Privacy Matters to Us</PpIntroTitle>
              <PpIntroText>
                At Instayards, we believe in transparent data practices. This Privacy Policy
                outlines our commitment to protecting your personal information while providing
                exceptional real estate services.
              </PpIntroText>
            </PpIntro>

            <PpSections>
              {sections.map((section, index) => (
                <PpSection key={section.id} id={section.id}>
                  <PpSectionHeader>
                    <PpSectionNumber>{index + 1}</PpSectionNumber>
                    <PpSectionTitle variant="h3">{section.title}</PpSectionTitle>
                  </PpSectionHeader>

                  <PpSectionContent>
                    {section.content && (
                      <PpSectionText>{section.content}</PpSectionText>
                    )}

                    {section.items && (
                      <PpList>
                        <ul>
                          {section.items.map((item, idx) => (
                            <li key={idx}>
                              <PpListIcon><FiCheckCircle /></PpListIcon>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </PpList>
                    )}

                    {section.note && (
                      <PpNote>
                        <FiAlertCircle />
                        <p>{section.note}</p>
                      </PpNote>
                    )}

                    {section.contact && (
                      <PpContactDetails>
                        <PpContactItem>
                          <FiMail />
                          <div>
                            <strong>Email:</strong>
                            <span>{section.contact.email}</span>
                          </div>
                        </PpContactItem>
                        <PpContactItem>
                          <FiUser />
                          <div>
                            <strong>Phone:</strong>
                            <span>{section.contact.phone}</span>
                          </div>
                        </PpContactItem>
                        <PpContactItem>
                          <FiGlobe />
                          <div>
                            <strong>Address:</strong>
                            <span>{section.contact.address}</span>
                          </div>
                        </PpContactItem>
                      </PpContactDetails>
                    )}
                  </PpSectionContent>
                </PpSection>
              ))}
            </PpSections>

            {/* Data Rights Summary */}
            <PpRightsSummary>
              <PpRightsHeader>
                <FiShield />
                <h3>Your Data Protection Rights</h3>
              </PpRightsHeader>
              <PpRightsGrid>
                {[
                  { icon: <FiEye />, title: 'Right to Access', text: 'Request a copy of your personal data we hold' },
                  { icon: <FiTrash2 />, title: 'Right to Erasure', text: 'Request deletion of your personal data' },
                  { icon: <FiDatabase />, title: 'Right to Portability', text: 'Receive your data in a structured format' },
                  { icon: <FiLock />, title: 'Right to Object', text: 'Object to certain types of processing' },
                ].map(({ icon, title, text }) => (
                  <PpRightCard key={title}>
                    <PpRightIcon>{icon}</PpRightIcon>
                    <PpRightCardTitle variant="h4">{title}</PpRightCardTitle>
                    <PpRightCardText>{text}</PpRightCardText>
                  </PpRightCard>
                ))}
              </PpRightsGrid>
            </PpRightsSummary>
          </PpContent>
        </PpWrapper>
      </PpMain>
    </PpContainer>
  );
};

export default PrivacyPolicy;
