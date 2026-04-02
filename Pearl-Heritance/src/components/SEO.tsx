import React from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

type SEOProps = {
  title?: string;
  description?: string;
  keywords?: string;
  url?: string; // Optional override for specific pages
};

const SEO: React.FC<SEOProps> = ({ title, description, keywords, url }) => {
  const { pathname } = useLocation();
  const baseUrl = "https://pearlhe.com";

  // LOGIC: 
  // 1. If 'url' prop is provided, use it.
  // 2. Otherwise, automatically build the URL using the current path.
  const canonicalUrl = url || `${baseUrl}${pathname}`;

  // If no title is passed, it defaults to a strong, high-ranking brand title.
  const fullTitle = title ? `${title} | Pearl Heritance` : "Pearl Heritance | Luxury & Sustainable Architecture in Sri Lanka";

  // AIO: Comprehensive Business Schema (LocalBusiness + FAQ structure)
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "name": "Pearl Heritance",
        "image": "https://pearlhe.com/logo.png",
        "@id": "https://pearlhe.com",
        "url": "https://pearlhe.com",
        "telephone": "+94777725999",
        "priceRange": "$$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "No. 253 B, 1/1, Stanley Thilakarathne Road, Nugegoda, Sri Lanka", 
          "addressLocality": "Nugegoda",
          "addressRegion": "Western Province",
          "postalCode": "12345",
          "addressCountry": "LK"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 6.9271,
          "longitude": 79.8612
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "18:00"
        },
        
      
      },
      // This section tells AI models about your expertise via common questions
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How long does a luxury villa construction take in Sri Lanka?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Typically, high-end residential projects in Sri Lanka take 12 to 18 months from design approval to completion, depending on site conditions and architectural complexity."
            }
          },
          {
            "@type": "Question",
            "name": "Does Pearl Heritance specialize in sustainable architecture?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, we prioritize eco-friendly design, focusing on passive cooling, sustainable materials, and integrating the natural landscape into our architectural projects."
            }
          }
        ]
      }
    ]
  };

  return (
    <Helmet prioritizeSeoTags>
      <title>{fullTitle}</title>

      {/* Primary Meta Tags */}
      <meta name="title" content={fullTitle} />
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Canonical Link */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook / LinkedIn */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:image" content="https://pearlhe.com/og-image.jpg" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={fullTitle} />
      {description && <meta property="twitter:description" content={description} />}
      <meta property="twitter:image" content="https://pearlhe.com/og-image.jpg" />

      {/* Structured Data for AI Optimization (AIO) */}
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  );
};

export default SEO;