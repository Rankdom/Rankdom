import React, { useState } from 'react';


import Question from "../Question.tsx";

const sportsSubcategories = [
  { name: 'Soccer', href: '/sport/soccer', icon: '⚽', questions: [
    { name: 'Messi', imageUrl: 'https://cdn.britannica.com/35/238335-050-2CB2EB8A/Lionel-Messi-Argentina-Netherlands-World-Cup-Qatar-2022.jpg'  },
    { name: 'Ronaldo', imageUrl: 'https://editorial.uefa.com/resources/027c-16d30c80a3e5-8717973e3fb0-1000/portugal_v_france_-_uefa_euro_2020_group_f.jpeg' },
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
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);

  const handleSportClick = (sportName: string) => {
    setSelectedSport(sportName); // Set sport
    setSelectedQuestion(null); // Reset question ud fra sport.
  };

  const handleQuestionSelect = (questionName: string) => {
    setSelectedQuestion(questionName); // Set the selected card-question opponent.
  };

  const currentSport = sportsSubcategories.find((sport) => sport.name === selectedSport);

  return (
    <div>
      <h2>{selectedSport}</h2>
      {!selectedSport ? (
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
        <div>
          <h3> Which one do you prefer?</h3>
          {currentSport && currentSport.questions.length > 0 ? (
            <div className="category-grid">
              {currentSport.questions.map((question) => (
                <div key={question.name} className="relative">
                  <Question
                    title={question.name}
                    imageUrl={question.imageUrl}
                    disabled={!!selectedQuestion && selectedQuestion !== question.name} // Boolean går igang og deaktivere andet kort.
                    onClick={() => handleQuestionSelect(question.name)}
                  />
                  {selectedQuestion && selectedQuestion !== question.name && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 text-white text-5xl">

                    </div>
                  )}
                </div>
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