// src/components/About/About.js
import React from 'react';
import aboutData from './AboutData';
import FooterController from '../../components/Footer/FooterController';
import SEO from '../SEO/SEO';
import { Box } from '@mui/material';
import { FiTarget, FiUsers, FiAward, FiCheckCircle } from 'react-icons/fi';
import {
  AboutPage, Container,
  AboutHero, HeroContent, HeroBadge, BadgeDot, HeroTitle, HeroSubtitle,
  HeroStatsRow, StatCard, StatNumberAbout, StatLabelAbout,
  SectionHeader, SectionTitle,
  CompanyOverview, OverviewGrid, OverviewImageBox, CompanyPhoto,
  ImageBadge, OverviewContent, DescriptionCard, CompanyDescription,
  MissionVision, MvGrid, MvCard, MvTitle, MvText, ValuesList,
  TeamSection, TeamGrid, TeamCard, TeamAvatarBox, TeamAvatarImg,
  AvatarBadge, TeamName, TeamRole, TeamBio, TeamSocial, SocialItem, SocialDivider,
} from './AboutStyles';

const About = () => {
  return (
    <AboutPage>
      <SEO
        title="About Us | Instayards - Trusted Real Estate Experts in Gurugram"
        description="Learn about Instayards' mission to bring transparency and trust to real estate in Gurugram. Verified listings, expert guidance, and a stress-free property search."
        keywords="about instayards, real estate company gurugram, property consultants gurgaon"
        path="/about"
      />

      {/* Hero */}
      <AboutHero>
        <HeroContent>
          <HeroBadge>
            <BadgeDot />
            Since 2024
          </HeroBadge>
          <HeroTitle variant="h1">
            Redefining Real Estate with Transparency & Trust
          </HeroTitle>
          <HeroSubtitle>
            We're on a mission to simplify property transactions through technology,
            making real estate accessible and stress-free for everyone.
          </HeroSubtitle>
          <HeroStatsRow>
            {[
              { number: '100+', label: 'Happy Families' },
              { number: '₹ 150Cr+', label: 'Property Value' },
              
            ].map(({ number, label }) => (
              <StatCard key={label}>
                <StatNumberAbout>{number}</StatNumberAbout>
                <StatLabelAbout>{label}</StatLabelAbout>
              </StatCard>
            ))}
          </HeroStatsRow>
        </HeroContent>
      </AboutHero>

      {/* Company Overview */}
      <CompanyOverview>
        <Container>
          <OverviewGrid>
            <OverviewImageBox>
              <CompanyPhoto
                src="https://images.unsplash.com/photo-1497366216548-37526070297c"
                alt="Instayards Office Team"
              />
              <ImageBadge>
                <FiAward />
                <span>Trusted Since 2024</span>
              </ImageBadge>
            </OverviewImageBox>

            <OverviewContent>
              <SectionHeader sx={{ textAlign: 'left', mb: 0 }}>
                <SectionTitle variant="h2" sx={{ '&::after': { left: 0, transform: 'none' } }}>
                  Company Overview
                </SectionTitle>
              </SectionHeader>
              <DescriptionCard>
                <CompanyDescription>
                  At Instayards, we are revolutionizing the real estate industry through innovation
                  and technology. Our mission is to simplify property transactions, making them
                  transparent, efficient, and stress-free. Guided by our core values of
                  Transparency, Integrity, Customer-Centricity, Innovation, and Excellence,
                  we serve <strong>25+ cities</strong> across India with a network of{' '}
                  <strong>500+ certified property experts</strong>. We pride ourselves on
                  completing transactions in just <strong>45 days</strong>, significantly
                  faster than the industry standard of 90+ days.
                </CompanyDescription>
              </DescriptionCard>
            </OverviewContent>
          </OverviewGrid>
        </Container>
      </CompanyOverview>

      {/* Mission & Vision */}
      <MissionVision>
        <Container>
          <MvGrid>
            <MvCard variant="mission">
              <Box className="mv-icon-box"><FiTarget /></Box>
              <MvTitle variant="h3">Our Mission</MvTitle>
              <MvText>
                To democratize real estate access through technology, making property
                transactions transparent, efficient, and trustworthy for every Indian.
              </MvText>
            </MvCard>

            <MvCard variant="vision">
              <Box className="mv-icon-box"><FiUsers /></Box>
              <MvTitle variant="h3">Our Vision</MvTitle>
              <MvText>
                To become India's most trusted real estate platform where finding,
                buying, or selling property is as simple as ordering food online.
              </MvText>
            </MvCard>

            <MvCard variant="values">
              <Box className="mv-icon-box"><FiAward /></Box>
              <MvTitle variant="h3">Our Values</MvTitle>
              <ValuesList>
                {['Transparency First', 'Customer Centricity', 'Innovation Driven', 'Integrity Always'].map(v => (
                  <li key={v}><FiCheckCircle />{v}</li>
                ))}
              </ValuesList>
            </MvCard>
          </MvGrid>
        </Container>
      </MissionVision>

      {/* Team */}
      <TeamSection>
        <Container>
          <SectionHeader>
            <SectionTitle variant="h2">Meet Our Leaders</SectionTitle>
          </SectionHeader>
          <TeamGrid>
            {aboutData.team.map((member, i) => (
              <TeamCard key={i}>
                <TeamAvatarBox>
                  <TeamAvatarImg src={member.avatar} alt={member.name} />
                  <AvatarBadge />
                </TeamAvatarBox>
                <TeamName variant="h3">{member.name}</TeamName>
                <TeamRole>{member.role}</TeamRole>
                <TeamBio>{member.bio}</TeamBio>
                <TeamSocial>
                  <SocialItem>LinkedIn</SocialItem>
                  <SocialDivider>•</SocialDivider>
                  <SocialItem>Twitter</SocialItem>
                </TeamSocial>
              </TeamCard>
            ))}
          </TeamGrid>
        </Container>
      </TeamSection>

      <FooterController />
    </AboutPage>
  );
};

export default About;
