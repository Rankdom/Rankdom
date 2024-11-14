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
  emoji: string;
}

const defaultSportsSubcategories: SportCategory[] = [
  { name: 'Soccer', href: '/sport/soccer', icon: '⚽', questions: [] },
  { name: 'Basketball', href: '/sport/basketball', icon: '🏀', questions: [] },
];

const Sport: React.FC = () => {
  const [sportsSubcategories, setSportsSubcategories] = useState<SportCategory[]>(defaultSportsSubcategories);
  const [selectedSport, setSelectedSport] = useState<string | null>(null);
  const [currentQuestions, setCurrentQuestions] = useState<QuestionType[]>([]);
  const [selectedChoices, setSelectedChoices] = useState<string[]>([]);

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
    loadRandomQuestions(sportName);
  };

  const loadRandomQuestions = (sportName: string) => {
    const sport = sportsSubcategories.find((sport) => sport.name === sportName);
    if (sport && sport.questions.length >= 2) {
      const randomQuestions = [...sport.questions].sort(() => 0.5 - Math.random()).slice(0, 2);
      setCurrentQuestions(randomQuestions);
    }
  };

  const handleQuestionSelect = (questionName: string) => {
    setSelectedChoices((prevChoices) => [...prevChoices, questionName]);
    loadRandomQuestions(selectedSport!);  // Load new random questions after selecting a player
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
              href={subcategory.href}
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
          <h3>Which one do you prefer?</h3>
          {currentQuestions.length > 0 ? (
            <div className="category-grid">
              {currentQuestions.map((question) => (
                <div key={question.name} className="relative">
                  <Question
                    title={question.name}
                    imageUrl={question.imageUrl}
                    disabled={false} // Make sure both questions are always clickable
                    onClick={() => handleQuestionSelect(question.name)}
                  />
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
