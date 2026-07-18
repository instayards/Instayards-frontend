// src/components/SEO/SEO.js
import { Helmet } from 'react-helmet';

const SITE_NAME = 'Instayards';
const SITE_URL = 'https://instayards.com';
const DEFAULT_IMAGE = `${SITE_URL}/logo.png`;

/**
 * Central SEO tag manager for every route.
 * `path` should start with '/' (e.g. '/property/123') and is used to build the canonical URL.
 * `jsonLd` accepts a single schema object or an array of schema objects.
 */
const SEO = ({
  title,
  description,
  keywords,
  path = '/',
  image = DEFAULT_IMAGE,
  type = 'website',
  noindex = false,
  jsonLd,
}) => {
  const canonical = `${SITE_URL}${path === '/' ? '' : path}`;
  const schemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonical} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={image} />

      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
