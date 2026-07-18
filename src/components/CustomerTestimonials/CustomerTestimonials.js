import React, { useState, useEffect, useRef, useCallback } from 'react';
import testimonialsData from './testimonialsData.json';
import { FiChevronLeft, FiChevronRight, FiStar, FiCalendar, FiCheckCircle } from 'react-icons/fi';
import {
  TestimonialsSection, TestimonialsContainer,
  TestimonialsHeader, TestimonialsTitle, TestimonialsSubtitle,
  HeaderStats, StatPill, StatIcon, StatContent, StatValue, StatLabelTest,
  TestimonialCard, QuoteMark, CustomerInfo, AvatarWrapper, CustomerAvatar,
  CustomerDetails, CustomerMetaTop, CustomerName,
  RatingStars, RatingNumber, CompactInfo,
  FeedbackContainer, FeedbackText,
  TestimonialFooter, FooterLeft, FeedbackDate,
  VerifiedBadge,
  TestimonialsControls, NavBtn,
  CarouselWrapper, CarouselTrack,
  DotsContainer, Dot,
} from './CustomerTestimonialsStyles';

const AUTO_PLAY_MS = 3500;

const getAvatarSrc = (image, name) => {
  if (image && image.trim()) return image;
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1f7a94&color=fff&bold=true&size=80`;
};

const CustomerTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const wrapperRef = useRef(null);
  const timerRef = useRef(null);

  const { title, testimonials } = testimonialsData;
  const totalCards = testimonials.length;

  const averageRating = (
    testimonials.reduce((sum, t) => sum + t.rating, 0) / totalCards
  ).toFixed(1);
  const fiveStarReviews = testimonials.filter(t => t.rating === 5).length;

  const maxIndex = Math.max(0, totalCards - cardsPerView);

  const updateLayout = useCallback(() => {
    if (!wrapperRef.current) return;
    const cpv = window.innerWidth < 768 ? 1 : 3;
    const gap = cpv > 1 ? 24 : 0;
    const wrapperWidth = wrapperRef.current.offsetWidth;
    const w = (wrapperWidth - gap * (cpv - 1)) / cpv;
    setCardsPerView(cpv);
    setCardWidth(w);
    setCurrentIndex(prev => Math.min(prev, Math.max(0, totalCards - cpv)));
  }, [totalCards]);

  useEffect(() => {
    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, [updateLayout]);

  const next = useCallback(() => {
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prev = useCallback(() => {
    setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const goTo = useCallback((idx) => {
    clearInterval(timerRef.current);
    setCurrentIndex(Math.max(0, Math.min(idx, maxIndex)));
    timerRef.current = setInterval(next, AUTO_PLAY_MS);
  }, [maxIndex, next]);

  useEffect(() => {
    if (maxIndex === 0) return;
    timerRef.current = setInterval(next, AUTO_PLAY_MS);
    return () => clearInterval(timerRef.current);
  }, [next, maxIndex]);

  const handleNav = (fn) => {
    clearInterval(timerRef.current);
    fn();
    timerRef.current = setInterval(next, AUTO_PLAY_MS);
  };

  const renderStars = (rating) => (
    <RatingStars>
      {[1, 2, 3, 4, 5].map((star) => (
        <FiStar
          key={star}
          style={{
            width: 14, height: 14,
            color: star <= rating ? '#fbbf24' : '#e5e7eb',
            fill: star <= rating ? 'currentColor' : 'none',
          }}
        />
      ))}
      <RatingNumber>{rating.toFixed(1)}</RatingNumber>
    </RatingStars>
  );

  const gap = cardsPerView > 1 ? 24 : 0;
  const translateX = -(currentIndex * (cardWidth + gap));

  return (
    <TestimonialsSection id="testimonials">
      <TestimonialsContainer>

        <TestimonialsHeader>
          <TestimonialsTitle variant="h2">{title}</TestimonialsTitle>
          <TestimonialsSubtitle>
            Trusted by homebuyers across Gurgaon — real stories, real experiences.
          </TestimonialsSubtitle>
          <HeaderStats>
            {[
              { icon: '⭐', value: `${averageRating}/5`, label: 'Avg Rating' },
              { icon: '👥', value: `${totalCards}+`, label: 'Customers' },
              { icon: '🏆', value: fiveStarReviews, label: '5-Star Reviews' },
            ].map(({ icon, value, label }) => (
              <StatPill key={label}>
                <StatIcon>{icon}</StatIcon>
                <StatContent>
                  <StatValue>{value}</StatValue>
                  <StatLabelTest>{label}</StatLabelTest>
                </StatContent>
              </StatPill>
            ))}
          </HeaderStats>
        </TestimonialsHeader>

        <CarouselWrapper ref={wrapperRef}>
          <CarouselTrack style={{ transform: `translateX(${translateX}px)` }}>
            {testimonials.map((testimonial) => {
              const infoParts = [testimonial.propertyType, testimonial.city, testimonial.role].filter(Boolean);
              return (
                <TestimonialCard
                  key={testimonial.id}
                  style={{ width: cardWidth > 0 ? cardWidth : undefined, flexShrink: 0 }}
                >
                  <QuoteMark>"</QuoteMark>

                  <CustomerInfo>
                    <AvatarWrapper>
                      <CustomerAvatar
                        src={getAvatarSrc(testimonial.image, testimonial.name)}
                        alt={testimonial.name}
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=1f7a94&color=fff&bold=true&size=80`;
                          e.target.onerror = null;
                        }}
                      />
                      
                    </AvatarWrapper>
                    <CustomerDetails>
                      <CustomerMetaTop>
                        <CustomerName>{testimonial.name}</CustomerName>
                        {renderStars(testimonial.rating)}
                      </CustomerMetaTop>
                      {infoParts.length > 0 && (
                        <CompactInfo>{infoParts.join(' • ')}</CompactInfo>
                      )}
                    </CustomerDetails>
                  </CustomerInfo>

                  <FeedbackContainer>
                    <FeedbackText>{testimonial.feedback}</FeedbackText>
                  </FeedbackContainer>

                  <TestimonialFooter>
                    <FooterLeft>
                      <FeedbackDate>
                        <FiCalendar />
                        <span>{testimonial.date}</span>
                      </FeedbackDate>
                    </FooterLeft>
                    <VerifiedBadge>
                      <FiCheckCircle />
                      <span>Verified</span>
                    </VerifiedBadge>
                  </TestimonialFooter>
                </TestimonialCard>
              );
            })}
          </CarouselTrack>
        </CarouselWrapper>

        <TestimonialsControls>
          <NavBtn onClick={() => handleNav(prev)} aria-label="Previous">
            <FiChevronLeft />
          </NavBtn>
          <DotsContainer>
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <Dot key={i} active={i === currentIndex} onClick={() => goTo(i)} />
            ))}
          </DotsContainer>
          <NavBtn onClick={() => handleNav(next)} aria-label="Next">
            <FiChevronRight />
          </NavBtn>
        </TestimonialsControls>

      </TestimonialsContainer>
    </TestimonialsSection>
  );
};

export default CustomerTestimonials;
