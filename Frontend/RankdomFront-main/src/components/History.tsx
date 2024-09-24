import React from 'react';
import { Link } from 'react-router-dom';

const historySubcategories = [
  { name: 'Ancient Civilizations', href: '/history/ancient-civilizations', icon: '🏛️' },
  { name: 'World War II', href: '/history/world-war-ii', icon: '🌍' },
  { name: 'The Renaissance', href: '/history/the-renaissance', icon: '🎨' },
  { name: 'The Industrial Revolution', href: '/history/the-industrial-revolution', icon: '⚙️' },
  { name: 'Cold War Era', href: '/history/cold-war-era', icon: '🕵️' },
  { name: 'The American Revolution', href: '/history/the-american-revolution', icon: '🇺🇸' },
  { name: 'The Roman Empire', href: '/history/the-roman-empire', icon: '🏛️' },
  { name: 'Medieval Europe', href: '/history/medieval-europe', icon: '⚔️' },
  { name: 'The Civil Rights Movement', href: '/history/the-civil-rights-movement', icon: '✊' },
  { name: 'The French Revolution', href: '/history/the-french-revolution', icon: '🇫🇷' },
  { name: 'Colonialism', href: '/history/colonialism', icon: '🌍' },
  { name: 'The Ottoman Empire', href: '/history/the-ottoman-empire', icon: '🕌' },
  { name: 'The Silk Road', href: '/history/the-silk-road', icon: '🛤️' },
  { name: 'The Age of Exploration', href: '/history/the-age-of-exploration', icon: '🧭' },
  { name: 'The Space Race', href: '/history/the-space-race', icon: '🚀' },
];

const History: React.FC = () => {
  return (
    <div>
      <h2>History Subcategories</h2>
      <div className="category-grid">
        {historySubcategories.map((subcategory) => (
          <Link key={subcategory.name} to={subcategory.href} className="category-button">
            <span className="category-icon">{subcategory.icon}</span>
            <span className="category-name">{subcategory.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default History;
