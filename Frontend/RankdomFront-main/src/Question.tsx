import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import './Question.css';

interface VoteBlockProps {
  title: string;
  imageUrl: string;
  disabled: boolean;
  onClick: () => void;
}

export default function Question({
  title = "Sample Title",
  imageUrl = "/placeholder.svg?height=200&width=300",
  disabled,
  onClick
}: VoteBlockProps) {
  return (
    <Card className={`vote-block ${disabled ? 'disabled' : ''}`} onClick={disabled ? undefined : onClick}>
      <CardHeader className="vote-block-header">
        <CardTitle className="vote-block-title">{title}</CardTitle>
      </CardHeader>
      <CardContent className="vote-block-content relative">
        <div className="vote-block-image">
          <img
            src={imageUrl}
            alt="Content image"
            className="w-full h-full object-cover"
          />
        </div>
        {disabled && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 text-white text-5xl">
          </div>

        )}

      </CardContent>

    </Card>
  );
}