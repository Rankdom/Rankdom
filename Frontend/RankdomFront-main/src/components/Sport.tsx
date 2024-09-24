import React from 'react';
import { Link } from 'react-router-dom';

const sportsSubcategories = [
  { name: 'Soccer', href: '/sport/soccer', icon: '⚽' },
  { name: 'Basketball', href: '/sport/basketball', icon: '🏀' },
  { name: 'Baseball', href: '/sport/baseball', icon: '⚾' },
  { name: 'Tennis', href: '/sport/tennis', icon: '🎾' },
  { name: 'Cricket', href: '/sport/cricket', icon: '🏏' },
  { name: 'American Football', href: '/sport/american-football', icon: '🏈' },
  { name: 'Rugby', href: '/sport/rugby', icon: '🏉' },
  { name: 'Hockey', href: '/sport/hockey', icon: '🏒' },
  { name: 'Golf', href: '/sport/golf', icon: '⛳' },
  { name: 'Boxing', href: '/sport/boxing', icon: '🥊' },
  { name: 'Swimming', href: '/sport/swimming', icon: '🏊' },
  { name: 'Athletics', href: '/sport/athletics', icon: '🏃' },
  { name: 'Cycling', href: '/sport/cycling', icon: '🚴' },
  { name: 'Martial Arts', href: '/sport/martial-arts', icon: '🥋' },
  { name: 'Esports', href: '/sport/esports', icon: '🎮' },
];

const Sport: React.FC = () => {
  return (
    <div>
      <h2>Sport Subcategories</h2>
      <div className="category-grid">
        {sportsSubcategories.map((subcategory) => (
          <Link key={subcategory.name} to={subcategory.href} className="category-button">
            <span className="category-icon">{subcategory.icon}</span>
            <span className="category-name">{subcategory.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sport;
