import React from 'react';
import { Link } from 'react-router-dom';

const politicsSubcategories = [
  { name: 'Election Reforms', href: '/politics/election-reforms', icon: '🗳️' },
  { name: 'Immigration Policies', href: '/politics/immigration-policies', icon: '🌐' },
  { name: 'Climate Change', href: '/politics/climate-change', icon: '🌍' },
  { name: 'Healthcare Reform', href: '/politics/healthcare-reform', icon: '🩺' },
  { name: 'Taxation', href: '/politics/taxation', icon: '💵' },
  { name: 'Foreign Policy', href: '/politics/foreign-policy', icon: '🌎' },
  { name: 'Gun Control', href: '/politics/gun-control', icon: '🔫' },
  { name: 'Social Justice', href: '/politics/social-justice', icon: '⚖️' },
  { name: 'Education Policy', href: '/politics/education-policy', icon: '📚' },
  { name: 'Trade Agreements', href: '/politics/trade-agreements', icon: '📉' },
  { name: 'Economic Inequality', href: '/politics/economic-inequality', icon: '💰' },
  { name: 'Civil Liberties', href: '/politics/civil-liberties', icon: '🔒' },
  { name: 'National Security', href: '/politics/national-security', icon: '🛡️' },
  { name: 'Public Transportation', href: '/politics/public-transportation', icon: '🚌' },
  { name: 'Infrastructure Development', href: '/politics/infrastructure-development', icon: '🏗️' },
];

const Politics: React.FC = () => {
  return (
    <div>
      <h2>Politics Subcategories</h2>
      <div className="category-grid">
        {politicsSubcategories.map((subcategory) => (
          <Link key={subcategory.name} to={subcategory.href} className="category-button">
            <span className="category-icon">{subcategory.icon}</span>
            <span className="category-name">{subcategory.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Politics;
