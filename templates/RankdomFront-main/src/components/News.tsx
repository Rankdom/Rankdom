import React from 'react';
import { Link } from 'react-router-dom';

const newsSubcategories = [
  { name: 'Global Politics', href: '/news/global-politics', icon: '🌐' },
  { name: 'Economic Updates', href: '/news/economic-updates', icon: '📈' },
  { name: 'Climate Change', href: '/news/climate-change', icon: '🌍' },
  { name: 'Technology Innovations', href: '/news/technology-innovations', icon: '💡' },
  { name: 'Healthcare Developments', href: '/news/healthcare-developments', icon: '🩺' },
  { name: 'Social Movements', href: '/news/social-movements', icon: '✊' },
  { name: 'International Relations', href: '/news/international-relations', icon: '🌎' },
  { name: 'Crime and Justice', href: '/news/crime-and-justice', icon: '⚖️' },
  { name: 'Education Reforms', href: '/news/education-reforms', icon: '📚' },
  { name: 'Environmental Issues', href: '/news/environmental-issues', icon: '🌳' },
  { name: 'Science Discoveries', href: '/news/science-discoveries', icon: '🔬' },
  { name: 'Sports Highlights', href: '/news/sports-highlights', icon: '🏅' },
  { name: 'Entertainment News', href: '/news/entertainment-news', icon: '🎭' },
  { name: 'Business Trends', href: '/news/business-trends', icon: '📊' },
  { name: 'Public Health Alerts', href: '/news/public-health-alerts', icon: '🚨' },
];

const News: React.FC = () => {
  return (
    <div>
      <h2>News Subcategories</h2>
      <div className="category-grid">
        {newsSubcategories.map((subcategory) => (
          <Link key={subcategory.name} to={subcategory.href} className="category-button">
            <span className="category-icon">{subcategory.icon}</span>
            <span className="category-name">{subcategory.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default News;
