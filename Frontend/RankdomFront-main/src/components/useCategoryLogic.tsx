import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface QuestionType {
  name: string;
  imageUrl: string;
}

interface Category {
  name: string;
  href: string;
  icon: string;
  questions: QuestionType[];
}

const useCategoryLogic = (categories: Category[]) => {

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentQuestions, setCurrentQuestions] = useState<QuestionType[]>([]);
  const [selectedChoices, setSelectedChoices] = useState<string[]>([]);
  const [pairCount, setPairCount] = useState<number>(0);
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName: string) => {
    console.log(`Category selected: ${categoryName}`);
    setSelectedCategory(categoryName);
    loadRandomQuestions(categoryName);
  };

  const loadRandomQuestions = (categoryName: string) => {
    const category = categories.find((cat) => cat.name === categoryName);
    if (category && category.questions.length >= 2) {
      const randomQuestions = [...category.questions]
        .sort(() => 0.5 - Math.random())
        .slice(0, 2);
      console.log('Loaded Questions:', randomQuestions);
      setCurrentQuestions(randomQuestions);
    }
  };

  const handleQuestionSelect = (questionName: string) => {
    setSelectedChoices((prevChoices) => [...prevChoices, questionName]);
    setPairCount((prevCount) => prevCount + 1);

    if (pairCount + 1 < 10) {
      loadRandomQuestions(selectedCategory!);
    }
  };

  const goToScorePage = () => {
    console.log('Navigating to Score Page with:', { selectedChoices, selectedCategory });
    navigate('/score', { state: { selectedChoices, selectedCategory } });
  };

  return {

    selectedCategory,
    currentQuestions,
    selectedChoices,
    pairCount,
    handleCategoryClick,
    handleQuestionSelect,
    goToScorePage,
  };
};

export default useCategoryLogic;
