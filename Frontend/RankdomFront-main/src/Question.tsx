import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import './Question.css';

interface VoteBlockProps {
  title: string;
  imageUrl?: string;
}

export default function Question({
  title = "placeholder Title",
  imageUrl = "/placeholder.svg?height=200&width=300",
}: VoteBlockProps) {
  const [upvotes, setUpvotes] = useState(0);
  const [downvotes, setDownvotes] = useState(0);
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isDownvoted, setIsDownvoted] = useState(false);

  const handleUpvote = () => {
    if (isUpvoted) {
      // Remove upvote if already upvoted
      setUpvotes((prev) => prev - 1);
      setIsUpvoted(false);
    } else {
      //Tilføj Upvote og hvis downvoted fjern downvote.
      setUpvotes((prev) => prev + 1);
      if (isDownvoted) {
        setDownvotes((prev) => prev - 1);
        setIsDownvoted(false);
      }
      setIsUpvoted(true);
    }
  };

  const handleDownvote = () => {
    if (isDownvoted) {
      // Remove downvote hvis allerede upvoted
      setDownvotes((prev) => prev - 1);
      setIsDownvoted(false);
    } else {
      // Adder downvote, og hvis upvoted fjern upvote
      setDownvotes((prev) => prev + 1);
      if (isUpvoted) {
        setUpvotes((prev) => prev - 1);
        setIsUpvoted(false);
      }
      setIsDownvoted(true);
    }
  };

  return (
    <Card className="vote-block">
      <CardHeader className="vote-block-header">
        <CardTitle className="vote-block-title">{title}</CardTitle>
      </CardHeader>
      <CardContent className="vote-block-content">
        <div className="vote-block-image">
          <img
            src={imageUrl}
            alt="Content image"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="vote-buttons">
          <div className="vote-button-container">
            <Button
              variant="outline"
              size="icon"
              onClick={handleUpvote}
              aria-label="Upvote"
              className={`vote-button ${isUpvoted ? 'active' : ''}`}
            >
              👍
            </Button>
            <span className="vote-count">{upvotes}</span>
          </div>
          <div className="vote-button-container">
            <Button
              variant="outline"
              size="icon"
              onClick={handleDownvote}
              aria-label="Downvote"
              className={`vote-button ${isDownvoted ? 'active' : ''}`}
            >
              👎
            </Button>
            <span className="vote-count">{downvotes}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
