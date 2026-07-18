// src/components/FAQ/FAQController.js
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import data from './FAQ.json';
import { FiPlus, FiMinus } from 'react-icons/fi';
import {
  FaqWrapper, FaqTitle, FaqSubtitle,
  FaqList, FaqItem, FaqQuestion, FaqAnswer, FaqAnswerText,
} from './FAQStyles';

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: data.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};

const FAQController = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => setActiveIndex(activeIndex === index ? null : index);

  return (
    <FaqWrapper>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>
      <FaqTitle variant="h2">Frequently Asked Questions</FaqTitle>
      <FaqSubtitle>Clear answers to help you move forward with confidence</FaqSubtitle>

      <FaqList>
        {data.map((item, index) => {
          const isOpen = activeIndex === index;
          return (
            <FaqItem key={index} open={isOpen}>
              <FaqQuestion open={isOpen} onClick={() => toggle(index)}>
                <span>{item.question}</span>
                {isOpen ? <FiMinus /> : <FiPlus />}
              </FaqQuestion>
              <FaqAnswer open={isOpen}>
                <FaqAnswerText>{item.answer}</FaqAnswerText>
              </FaqAnswer>
            </FaqItem>
          );
        })}
      </FaqList>
    </FaqWrapper>
  );
};

export default FAQController;
