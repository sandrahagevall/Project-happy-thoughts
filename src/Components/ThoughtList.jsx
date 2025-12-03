import { ThoughtCard } from "./ThoughtCard";

export const ThoughtList = ({ thoughts }) => {
  return (
    <div className="space-y-4">
      {thoughts.map((thought) => (
        <ThoughtCard key={thought.id} thought={thought} />
      ))}
    </div>
  );
};
