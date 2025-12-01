import { useState } from "react";
import { ThoughtForm } from "./Components/ThoughtForm";

export const App = () => {
  const [thoughts, setThoughts] = useState([]);

  const addThought = (newMessage) => {
    const newThought = {
      id: Date.now(),
      message: newMessage,
    };
    setThoughts([newThought, ...thoughts]);
  };

  return (
    <div className="mx-w-x1 mx-auto p-6">
      <ThoughtForm onSubmit={addThought} />
    </div>
  )
}
