// src/components/Terms/Terms.js
import { FiAlertCircle } from 'react-icons/fi';
import SEO from '../SEO/SEO';
import {
  TmMain, TmWrapper, TmContent,
  TmIntro, TmIntroTitle, TmIntroText,
  TmSection, TmSectionHeader, TmSectionTitle, TmSectionContents, TmSectionDetails,
  TmNotice, TmNoticeContent,
} from './TermsStyles';

const sections = [
  { id: 'introduction', title: '1. Introduction', content: 'These Terms and Conditions ("Terms") govern your use of the services provided by Instayards Technologies Private Limited ("Company"), operating under the brand name Instayards. By accessing or using our services, you agree to be bound by these Terms.' },
  { id: 'services', title: '2. Services Offered', content: 'Instayards provides real estate services, including property listings, property evaluations, brokerage facilitation, price discovery, and related offerings for secondary residential real estate transactions.' },
  { id: 'eligibility', title: '3. User Eligibility', content: 'You must be at least 18 years old and legally competent to contract under Indian laws to use our services. By using our platform, you represent and warrant that you meet these requirements.' },
  { id: 'responsibilities', title: '4. User Responsibilities', content: 'Users of the Instayards platform are expected to uphold the following responsibilities:' },
  { id: 'intellectual-property', title: '5. Intellectual Property', content: 'All content, design, software, graphics, and intellectual property on the Instayards platform are owned by or licensed to the Company. No content may be copied, modified, reproduced, republished, uploaded, posted, or transmitted without prior written consent.' },
  { id: 'privacy', title: '6. Privacy Policy', content: 'Our collection and use of your personal data are governed by our Privacy Policy. By using our platform, you consent to the terms of the Privacy Policy.' },
  { id: 'valuation', title: '7. Offer and Valuation Disclaimer', content: 'Any offer or price range communicated by Instayards is indicative, non-binding, and subject to inspection, verification, and final approval. Instayards reserves the right to withdraw or revise offers at any time without prior notice.' },
  { id: 'liability', title: '8. Limitation of Liability', content: 'To the fullest extent permitted by law, the Company shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the platform or reliance on any information therein.' },
  { id: 'indemnification', title: '9. Indemnification', content: 'You agree to indemnify, defend and hold harmless the Company and its affiliates, directors, officers, employees, and agents from any claims, liabilities, damages, or expenses arising out of your misuse of the services or violation of these Terms.' },
  { id: 'termination', title: '10. Termination', content: 'We reserve the right to suspend or terminate access to your account or the platform at our discretion, with or without notice, if we believe you have violated these Terms or any applicable law.' },
  { id: 'governing-law', title: '11. Governing Law and Jurisdiction', content: 'These Terms shall be governed by and interpreted in accordance with the laws of India. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of courts located in Gurgaon, Haryana, India.' },
  { id: 'changes', title: '12. Amendments', content: 'We reserve the right to modify these Terms at any time. Changes will be posted on this page, and continued use of the platform after updates constitutes your acceptance of the revised Terms.' },
  { id: 'contact', title: '13. Contact Us', content: 'For any questions, clarifications, or grievances, please contact us:' },
];

const Terms = () => {
  return (
    <TmMain>
      <SEO
        title="Terms & Conditions | Instayards"
        description="Read the terms and conditions governing the use of Instayards' real estate platform and services."
        path="/terms"
      />
      <TmWrapper>
        <TmContent>
          <TmIntro>
            <TmIntroTitle variant="h2">Instayards Terms & Conditions</TmIntroTitle>
            <TmIntroText>
              These Terms and Conditions govern your use of the services provided by
              Instayards Technologies Private Limited, operating under the brand name Instayards.
              By accessing or using our services, you agree to be bound by these Terms.
            </TmIntroText>
          </TmIntro>

          {sections.map((section, index) => (
            <TmSection key={section.id} id={section.id}>
              <TmSectionHeader>
                <TmSectionTitle variant="h3">{section.title}</TmSectionTitle>
              </TmSectionHeader>
              <TmSectionContents>
                <p>{section.content}</p>

                {section.id === 'responsibilities' && (
                  <TmSectionDetails>
                    <ul>
                      <li><strong>Account Information:</strong> You agree to provide accurate and complete information during registration and update it as required.</li>
                      <li><strong>Compliance:</strong> You agree to use the platform in accordance with applicable laws and not for any unlawful or harmful activities.</li>
                      <li><strong>Content Submission:</strong> Any content you provide (property details, documentation, etc.) must be truthful and not infringe any third-party rights.</li>
                    </ul>
                  </TmSectionDetails>
                )}

                {section.id === 'contact' && (
                  <TmSectionDetails>
                    <p><strong>Instayards Technologies Private Limited</strong></p>
                    <p>Office # 301, M3M Cosmopolitan, Badshahpur,<br />Sector 66, Gurugram, Haryana 122002</p>
                    <p>Email: care@instayards.com</p>
                    <p>Phone: +91 70421 18400</p>
                  </TmSectionDetails>
                )}
              </TmSectionContents>
            </TmSection>
          ))}

          <TmNotice>
            <FiAlertCircle />
            <TmNoticeContent>
              <h3>Important Legal Notice</h3>
              <p>
                These Terms & Conditions constitute a legal agreement between you
                and Instayards. If you do not agree with any part of these terms,
                please discontinue use of our services immediately. For clarifications,
                consult with a legal professional.
              </p>
            </TmNoticeContent>
          </TmNotice>
        </TmContent>
      </TmWrapper>
    </TmMain>
  );
};

export default Terms;
