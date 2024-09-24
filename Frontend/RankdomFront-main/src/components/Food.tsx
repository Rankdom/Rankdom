import React from 'react';
import { Link } from 'react-router-dom';

const foodSubcategories = [
  { name: 'Vegan Cuisine', href: '/food/vegan-cuisine', icon: '🥕' },
  { name: 'Mediterranean Diet', href: '/food/mediterranean-diet', icon: '🍇' },
  { name: 'Street Food', href: '/food/street-food', icon: '🍜' },
  { name: 'Regional Specialties', href: '/food/regional-specialties', icon: '🍲' },
  { name: 'Culinary Techniques', href: '/food/culinary-techniques', icon: '🍴' },
  { name: 'Farm-to-Table', href: '/food/farm-to-table', icon: '🥦' },
  { name: 'Global Cuisines', href: '/food/global-cuisines', icon: '🌍' },
  { name: 'Baking', href: '/food/baking', icon: '🍰' },
  { name: 'Fermentation', href: '/food/fermentation', icon: '🍶' },
  { name: 'Food Sustainability', href: '/food/food-sustainability', icon: '🌱' },
  { name: 'Wine Pairing', href: '/food/wine-pairing', icon: '🍷' },
  { name: 'Comfort Food', href: '/food/comfort-food', icon: '🍲' },
  { name: 'Gourmet Cooking', href: '/food/gourmet-cooking', icon: '🍽️' },
  { name: 'Seasonal Recipes', href: '/food/seasonal-recipes', icon: '🎃' },
  { name: 'Food Allergies', href: '/food/food-allergies', icon: '⚠️' },
];

const Food: React.FC = () => {
  return (
    <div>
      <h2>Food Subcategories</h2>
      <div className="category-grid">
        {foodSubcategories.map((subcategory) => (
          <Link key={subcategory.name} to={subcategory.href} className="category-button">
            <span className="category-icon">{subcategory.icon}</span>
            <span className="category-name">{subcategory.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Food;
