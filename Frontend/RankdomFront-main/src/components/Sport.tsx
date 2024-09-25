import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const sportsSubcategories = [
  { name: 'Soccer', href: '/sport/soccer', icon: '⚽', questions: [
    { name: 'Messi', href: '/sport/soccer/Messi' },
    { name: 'Ronaldo', href: '/sport/soccer/Ronaldo' },
  ] },
  { name: 'Basketball', href: '/sport/basketball', icon: '🏀', questions: [] },
  { name: 'Baseball', href: '/sport/baseball', icon: '⚾', questions: [] },
  { name: 'Tennis', href: '/sport/tennis', icon: '🎾' , questions: [] },
  { name: 'Cricket', href: '/sport/cricket', icon: '🏏' , questions: [] },
  { name: 'American Football', href: '/sport/american-football', icon: '🏈' , questions: [] },
  { name: 'Rugby', href: '/sport/rugby', icon: '🏉' , questions: [] },
  { name: 'Hockey', href: '/sport/hockey', icon: '🏒' , questions: [] },
  { name: 'Golf', href: '/sport/golf', icon: '⛳' , questions: [] },
  { name: 'Boxing', href: '/sport/boxing', icon: '🥊', questions: [] },
  { name: 'Swimming', href: '/sport/swimming', icon: '🏊' , questions: [] },
  { name: 'Athletics', href: '/sport/athletics', icon: '🏃' , questions: []},
  { name: 'Cycling', href: '/sport/cycling', icon: '🚴' , questions: []},
  { name: 'Martial Arts', href: '/sport/martial-arts', icon: '🥋' , questions: []},
  { name: 'Esports', href: '/sport/esports', icon: '🎮' , questions: []},
];

const Sport: React.FC = () => {
  const [selectedSport, setSelectedSport] = useState<string | null>(null);

  const handleSportClick = (sportName: string) => {
    setSelectedSport(sportName); // Set the selected sport
  };

  const currentSport = sportsSubcategories.find((sport) => sport.name === selectedSport);

  return (
    <div>
      <h2>Sport Subcategories</h2>
      {!selectedSport ? (
        // Show main sport categories when no sport is selected
        <div className="category-grid">
          {sportsSubcategories.map((subcategory) => (
            <button
              key={subcategory.name}
              className="category-button"
              onClick={() => handleSportClick(subcategory.name)}
            >
              <span className="category-icon">{subcategory.icon}</span>
              <span className="category-name">{subcategory.name}</span>
            </button>
          ))}
        </div>
      ) : (
        // Show subcategories (like players) if a sport is selected
        <div>
          <h3>{selectedSport}</h3>
          {currentSport && currentSport.questions.length > 0 ? (
            <div className="category-grid">
              {currentSport.questions.map((questions) => (
                <Link key={questions.name} to={questions.href} className="category-button">
                  {questions.name}
                </Link>
              ))}
            </div>
          ) : (
            <p>No Questions available for {selectedSport}</p>
          )}
          <button onClick={() => setSelectedSport(null)}>Back</button>
        </div>
      )}
    </div>
  );
};

export default Sport;
