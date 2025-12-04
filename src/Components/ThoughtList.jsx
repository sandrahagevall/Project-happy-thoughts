import { ThoughtCard } from "./ThoughtCard";

export const ThoughtList = ({ thoughts, onLike, newThoughtId }) => {
  return (
    <div className="space-y-4">
      {thoughts.map((thought) => (
        <ThoughtCard
          key={thought.id}
          thought={thought}
          onLike={onLike}
          isNew={thought.id === newThoughtId} />
      ))}
    </div>
  );
};
