import { ThoughtCard } from "./ThoughtCard";

export const ThoughtList = ({ thoughts, onLike, newThoughtId }) => {
  return (
    <div className="space-y-4">
      {thoughts.map((thought) => (
        <ThoughtCard
          key={thought._id}
          thought={thought}
          onLike={onLike}
          isNew={thought._id === newThoughtId} />
      ))}
    </div>
  );
};
