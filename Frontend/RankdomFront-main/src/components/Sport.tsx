import React, { useState, useEffect } from 'react';
import Question from "../Question.tsx";

// Define interfaces for the data structures
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
}


const Sport: React.FC = () => {
  const [sportsSubcategories, setSportsSubcategories] = useState<SportCategory[]>([]);
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
    .then((data: ApiResponseItem[]) => { // Use ApiResponseItem[] instead of any
      const formattedData: SportCategory[] = data.map((item) => ({
        name: item.category,
        href: `/sport/${item.category.toLowerCase()}`,
        icon: '⚽', // Default icon, modify as needed
        questions: item.content_array.map((player: Player) => ({ // Use Player instead of any
          name: player.name,
          imageUrl: player.image_url
        }))
      }));

      setSportsSubcategories(formattedData);
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
