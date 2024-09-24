import React from 'react';
import { Link } from 'react-router-dom';

const jobSubcategories = [
  { name: 'Information Technology', href: '/jobs/information-technology', icon: '💻' },
  { name: 'Healthcare', href: '/jobs/healthcare', icon: '🩺' },
  { name: 'Finance', href: '/jobs/finance', icon: '💰' },
  { name: 'Education', href: '/jobs/education', icon: '📚' },
  { name: 'Engineering', href: '/jobs/engineering', icon: '⚙️' },
  { name: 'Marketing', href: '/jobs/marketing', icon: '📈' },
  { name: 'Human Resources', href: '/jobs/human-resources', icon: '👥' },
  { name: 'Legal', href: '/jobs/legal', icon: '⚖️' },
  { name: 'Sales', href: '/jobs/sales', icon: '💼' },
  { name: 'Construction', href: '/jobs/construction', icon: '🏗️' },
  { name: 'Manufacturing', href: '/jobs/manufacturing', icon: '🏭' },
  { name: 'Arts and Design', href: '/jobs/arts-and-design', icon: '🎨' },
  { name: 'Public Relations', href: '/jobs/public-relations', icon: '📢' },
  { name: 'Research and Development', href: '/jobs/research-and-development', icon: '🔬' },
  { name: 'Customer Service', href: '/jobs/customer-service', icon: '☎️' },
];

const Jobs: React.FC = () => {
  return (
    <div>
      <h2>Job Subcategories</h2>
      <div className="category-grid">
        {jobSubcategories.map((subcategory) => (
          <Link key={subcategory.name} to={subcategory.href} className="category-button">
            <span className="category-icon">{subcategory.icon}</span>
            <span className="category-name">{subcategory.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
