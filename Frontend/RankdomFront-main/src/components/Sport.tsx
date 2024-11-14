import React, { useState, useEffect } from 'react';
import Question from "../Question.tsx";

interface QuestionType {
  name: string;
  imageUrl: string;
}

interface SportCategory {
  name: string;
  href: string;
  icon: string;
  questions: QuestionType[];
}

interface Player {
  name: string;
  image_url: string;
}

interface ApiResponseItem {
  supercategory: string;
  category: string;
  description: string;
  content_array: Player[];
  emoji :string
}

const defaultSportsSubcategories: SportCategory[] = [
  { name: 'Soccer', href: '/sport/soccer', icon: '⚽', questions: [] },
  { name: 'Basketball', href: '/sport/basketball', icon: '🏀', questions: [] },
  { name: 'Baseball', href: '/sport/baseball', icon: '⚾', questions: [] },
  { name: 'Tennis', href: '/sport/tennis', icon: '🎾', questions: [] },
  { name: 'Cricket', href: '/sport/cricket', icon: '🏏', questions: [] },
  { name: 'American Football', href: '/sport/american-football', icon: '🏈', questions: [] },
  { name: 'Rugby', href: '/sport/rugby', icon: '🏉', questions: [] },
  { name: 'Hockey', href: '/sport/hockey', icon: '🏒', questions: [] },
  { name: 'Golf', href: '/sport/golf', icon: '⛳', questions: [] },
  { name: 'Boxing', href: '/sport/boxing', icon: '🥊', questions: [] },
  { name: 'Swimming', href: '/sport/swimming', icon: '🏊', questions: [] },
  { name: 'Athletics', href: '/sport/athletics', icon: '🏃', questions: [] },
  { name: 'Cycling', href: '/sport/cycling', icon: '🚴', questions: [] },
  { name: 'Martial Arts', href: '/sport/martial-arts', icon: '🥋', questions: [] },
  { name: 'Esports', href: '/sport/esports', icon: '🎮', questions: [] },
];

const Sport: React.FC = () => {
  const [sportsSubcategories, setSportsSubcategories] = useState<SportCategory[]>(defaultSportsSubcategories);
  const [selectedSport, setSelectedSport] = useState<string | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/Questions/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data: ApiResponseItem[]) => {
        const formattedData: SportCategory[] = data.map((item) => ({
          name: item.category,
          href: `/sport/${item.category.toLowerCase()}`,
          icon: item.emoji,
          questions: item.content_array.map((player: Player) => ({
            name: player.name,
            imageUrl: player.image_url,
          })),
        }));

        // Update sports subcategories, merging with default array
        const updatedSports = defaultSportsSubcategories.map((defaultSport) => {
          const apiSport = formattedData.find((sport) => sport.name === defaultSport.name);
          return apiSport ? apiSport : defaultSport;
        });

        setSportsSubcategories(updatedSports);
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
  }, []);

  const handleSportClick = (sportName: string) => {
    setSelectedSport(sportName);
    setSelectedQuestion(null);
  };

  const handleQuestionSelect = (questionName: string) => {
    setSelectedQuestion(questionName);
  };

  const currentSport = sportsSubcategories.find((sport) => sport.name === selectedSport);

  return (
    <div>
      <h2>{selectedSport}</h2>
      {!selectedSport ? (
        <div className="category-grid">
          {sportsSubcategories.map((subcategory) => (
            <a
              key={subcategory.name}
              href={subcategory.href} // Route link for each sport
              className="category-button"
              onClick={(e) => {
                e.preventDefault();
                handleSportClick(subcategory.name);
              }}
            >
              <span className="category-icon">{subcategory.icon}</span>
              <span className="category-name">{subcategory.name}</span>
            </a>
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
                    disabled={!!selectedQuestion && selectedQuestion !== question.name}
                    onClick={() => handleQuestionSelect(question.name)}
                  />
                  {selectedQuestion && selectedQuestion !== question.name && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 text-white text-5xl">
                      {/* Overlay */}
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
