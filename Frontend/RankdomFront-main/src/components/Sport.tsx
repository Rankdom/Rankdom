import React from 'react';
import CategoryGrid from './CategoryGrid.tsx';
import QuestionDisplay from './QuestionDisplay.tsx';
import useFetchCategories from './useFetchCategories.tsx';
import useCategoryLogic from './useCategoryLogic.tsx';
import './Score.css';

const defaultSportsCategories = [
  { name: 'Soccer', href: '/sport/soccer', icon: '⚽', questions: [] },
  { name: 'Basketball', href: '/sport/basketball', icon: '🏀', questions: [] },
];

const Sport: React.FC = () => {
  const { categories: sportsCategories, loading, error } = useFetchCategories(
    'sport',
    defaultSportsCategories
  );

  //  logic hook to manage selected category, current questions
  const {
    selectedCategory: selectedSport,
    currentQuestions,
    pairCount,
    handleCategoryClick,
    handleQuestionSelect,
    goToScorePage,
  } = useCategoryLogic(sportsCategories);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {!selectedSport ? (
        <CategoryGrid
          title="Choose a Sport"
          categories={sportsCategories}
          onCategoryClick={handleCategoryClick}
        />
      ) : (
        <div>
          <h3>{selectedSport}</h3>
          {currentQuestions.length > 0 && pairCount < 10 ? (
            <QuestionDisplay
              questions={currentQuestions}
              onQuestionSelect={handleQuestionSelect}
            />
          ) : pairCount >= 10 ? (
            <button className="proceed-to-score-button" onClick={goToScorePage}>
              Proceed to Score
            </button>
          ) : (
            <p>No Questions available for {selectedSport}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Sport;
