import React, {useState} from 'react';

interface QuestionsMenuProps {
  playerName: string;
  playerImage: string;
}

const QuestionsMenu: React.FC<QuestionsMenuProps> = ({ playerName, playerImage }) => {
  const [votes, setVotes] = useState(0);

  const handleUpvote = () => setVotes(votes + 1);
  const handleDownvote = () => setVotes(votes - 1);

  return (
    <div>
      <h2>{playerName}</h2>
      <img src={playerImage} alt={playerName} />
      <textarea placeholder="Add your comment here..." />
      <div>
        <button onClick={handleUpvote}>👍</button>
        <button onClick={handleDownvote}>👎</button>
        <p>Votes: {votes}</p>
      </div>
    </div>
  );
};

export default QuestionsMenu;
