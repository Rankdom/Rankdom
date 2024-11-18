import React from 'react';
import CategoryGrid from './CategoryGrid.tsx';
import QuestionDisplay from './QuestionDisplay.tsx';
import useFetchCategories from './useFetchCategories.tsx';
import useCategoryLogic from './useCategoryLogic.tsx';

const defaultMovieCategories = [
  { name: 'Action', href: '/movies/action', icon: '🎬', questions: [] },
  { name: 'Comedy', href: '/movies/comedy', icon: '😂', questions: [] },
];

const Movies: React.FC = () => {
  const { categories: movieCategories, loading, error } = useFetchCategories(
    'movies',
    defaultMovieCategories
  );

  const {
    selectedCategory: selectedMovie,
    currentQuestions,
    pairCount,
    handleCategoryClick,
    handleQuestionSelect,
    goToScorePage,
  } = useCategoryLogic(movieCategories);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {!selectedMovie ? (
        <CategoryGrid
          title="Choose a Movie Genre"
          categories={movieCategories}
          onCategoryClick={handleCategoryClick}
        />
      ) : (
        <div>
          <h3>{selectedMovie}</h3>
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
            <p>No Questions available for {selectedMovie}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Movies;
