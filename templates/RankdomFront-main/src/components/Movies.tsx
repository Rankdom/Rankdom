import React from 'react';
import { Link } from 'react-router-dom';

const movieSubcategories = [
  { name: 'Action', href: '/movies/action', icon: '🎬' },
  { name: 'Comedy', href: '/movies/comedy', icon: '😂' },
  { name: 'Drama', href: '/movies/drama', icon: '🎭' },
  { name: 'Horror', href: '/movies/horror', icon: '👻' },
  { name: 'Science Fiction', href: '/movies/science-fiction', icon: '👽' },
  { name: 'Fantasy', href: '/movies/fantasy', icon: '🧙‍♂️' },
  { name: 'Romance', href: '/movies/romance', icon: '❤️' },
  { name: 'Thriller', href: '/movies/thriller', icon: '😱' },
  { name: 'Mystery', href: '/movies/mystery', icon: '🕵️' },
  { name: 'Adventure', href: '/movies/adventure', icon: '🧭' },
  { name: 'Documentary', href: '/movies/documentary', icon: '🎥' },
  { name: 'Animation', href: '/movies/animation', icon: '🎨' },
  { name: 'Musical', href: '/movies/musical', icon: '🎵' },
  { name: 'Historical', href: '/movies/historical', icon: '📜' },
  { name: 'Western', href: '/movies/western', icon: '🤠' },
];

const Movies: React.FC = () => {
  return (
    <div>
      <h2>Movie Subcategories</h2>
      <div className="category-grid">
        {movieSubcategories.map((subcategory) => (
          <Link key={subcategory.name} to={subcategory.href} className="category-button">
            <span className="category-icon">{subcategory.icon}</span>
            <span className="category-name">{subcategory.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Movies;
