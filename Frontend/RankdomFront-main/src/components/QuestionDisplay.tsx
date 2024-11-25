import React from 'react';
import Question from '../Question.tsx';

interface QuestionType {
  name: string;
  imageUrl: string;
}

interface QuestionDisplayProps {
  questions: QuestionType[];
  onQuestionSelect: (questionName: string) => void;
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({ questions, onQuestionSelect }) => {
  return (
    <div className="category-grid">
      {questions.map((question) => (
        <div key={question.name} className="relative">
          <Question
            title={question.name}
            imageUrl={question.imageUrl}
            disabled={false}
            onClick={() => onQuestionSelect(question.name)}
          />
        </div>
      ))}
    </div>
  );
};

export default QuestionDisplay;
