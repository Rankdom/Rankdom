import React from 'react';
import { Link } from 'react-router-dom';

const natureSubcategories = [
  { name: 'Forest Ecosystems', href: '/nature/forest-ecosystems', icon: '🌲' },
  { name: 'Marine Life', href: '/nature/marine-life', icon: '🐠' },
  { name: 'Endangered Species', href: '/nature/endangered-species', icon: '🦏' },
  { name: 'Renewable Energy', href: '/nature/renewable-energy', icon: '🌞' },
  { name: 'Climate Patterns', href: '/nature/climate-patterns', icon: '🌦️' },
  { name: 'National Parks', href: '/nature/national-parks', icon: '🏞️' },
  { name: 'Biodiversity', href: '/nature/biodiversity', icon: '🌺' },
  { name: 'Conservation Efforts', href: '/nature/conservation-efforts', icon: '🌍' },
  { name: 'Geological Formations', href: '/nature/geological-formations', icon: '🪨' },
  { name: 'Weather Phenomena', href: '/nature/weather-phenomena', icon: '⛅' },
  { name: 'Ocean Currents', href: '/nature/ocean-currents', icon: '🌊' },
  { name: 'Desert Landscapes', href: '/nature/desert-landscapes', icon: '🏜️' },
  { name: 'Polar Regions', href: '/nature/polar-regions', icon: '❄️' },
  { name: 'Sustainable Agriculture', href: '/nature/sustainable-agriculture', icon: '🌾' },
  { name: 'Wildlife Migration', href: '/nature/wildlife-migration', icon: '🦒' },
];

const Nature: React.FC = () => {
  return (
    <div>
      <h2>Nature Subcategories</h2>
      <div className="category-grid">
        {natureSubcategories.map((subcategory) => (
          <Link key={subcategory.name} to={subcategory.href} className="category-button">
            <span className="category-icon">{subcategory.icon}</span>
            <span className="category-name">{subcategory.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Nature;
