// src/components/pages/HomePage/HomePageStyles.js

import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const HpWrapper = styled(Box)({
  width: '100%',

  '& .seo-content': {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '60px 20px',
    lineHeight: '1.8',
    textAlign: 'left',
    color: '#333',
  },

  '& .seo-content h1': {
    fontSize: '2rem',
    fontWeight: 700,
    marginBottom: '16px',
    color: '#1a1a1a',
  },

  '& .seo-content h2': {
    fontSize: '1.3rem',
    fontWeight: 600,
    marginTop: '32px',
    marginBottom: '10px',
    color: '#222',
  },

  '& .seo-content p': {
    fontSize: '0.97rem',
    color: '#555',
    marginBottom: '8px',
  },
});