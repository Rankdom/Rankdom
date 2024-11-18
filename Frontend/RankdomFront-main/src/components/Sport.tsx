import React from 'react';
import CategoryGrid from './CategoryGrid.tsx';
import QuestionDisplay from './QuestionDisplay.tsx';
import './Sport.css';
import useFetchCategories from './useFetchCategories.tsx';
import useCategoryLogic from './useCategoryLogic.tsx';

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

const defaultSportsSubcategories: SportCategory[] = [
  { name: 'Soccer', href: '/sport/soccer', icon: '⚽', questions: [] },
  { name: 'Basketball', href: '/sport/basketball', icon: '🏀', questions: [] },
];

const Sport: React.FC = () => {
  const { categories: sportsSubcategories, loading, error } = useFetchCategories(
    'sport',
    defaultSportsSubcategories
  );

  const {
    selectedCategory: selectedSport,
    currentQuestions,
    pairCount,
    handleCategoryClick,
    handleQuestionSelect,
    goToScorePage,
  } = useCategoryLogic(sportsSubcategories);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {!selectedSport ? (
        <CategoryGrid
          title="Choose a Sport"
          categories={sportsSubcategories}
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
