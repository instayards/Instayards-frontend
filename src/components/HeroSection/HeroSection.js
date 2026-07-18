// src/components/HeroSection/HeroSection.js
import { useState, useEffect } from 'react';
import {
  InstaHero, CarouselContainer, CarouselSlide, CarouselBg,
  HeroContentMain, HeroTitle, HeroSubtitle,
  CarouselIndicators, Indicator,
} from './HeroSectionStyles';

const carouselData = [
  {
    id: 1,
    title: 'Verified & Exclusive Homes in Gurugram',
    subtitle: 'Every listing on Instayards is authenticated and hand-picked — browse only genuine, exclusive properties across Gurgaon\'s most sought-after locations.',
    bgImage: 'https://instayards-assets-652698422443-ap-south-1-an.s3.ap-south-1.amazonaws.com/Others/Main_Carousels/c1.jpg',
  },
  {
    id: 2,
    title: 'Skip the Endless Visits',
    subtitle: 'Get every floor plan, pricing detail, amenities, and walkthrough right here. Make confident decisions without stepping out your door.',
    bgImage: 'https://instayards-assets-652698422443-ap-south-1-an.s3.ap-south-1.amazonaws.com/Others/Main_Carousels/pool.jpeg',
  },
  {
    id: 3,
    title: '100% Transparent. Zero Compromise.',
    subtitle: 'Professional documentation, strict ethical standards, and complete transparency from search to possession — because you deserve nothing less.',
    bgImage: 'https://instayards-assets-652698422443-ap-south-1-an.s3.ap-south-1.amazonaws.com/Others/Main_Carousels/c3.jpg',
  },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <InstaHero>
      <CarouselContainer>
        {carouselData.map((slide, index) => (
          <CarouselSlide key={slide.id} active={index === currentSlide ? 1 : 0}>
            <CarouselBg bgimage={slide.bgImage} />
            <HeroContentMain>
              <HeroTitle variant="h1">{slide.title}</HeroTitle>
              <HeroSubtitle>{slide.subtitle}</HeroSubtitle>
            </HeroContentMain>
          </CarouselSlide>
        ))}

        <CarouselIndicators>
          {carouselData.map((_, index) => (
            <Indicator
              key={index}
              active={index === currentSlide ? 1 : 0}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </CarouselIndicators>
      </CarouselContainer>
    </InstaHero>
  );
};

export default HeroSection;
