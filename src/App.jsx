import { useState } from "react";
import { ThoughtForm } from "./Components/ThoughtForm";
import { ThoughtList } from "./Components/ThoughtList";

export const App = () => {
  const [thoughts, setThoughts] = useState([]);

  const addThought = (newMessage) => {
    const newThought = {
      id: Date.now(),
      message: newMessage,
      createdAt: new Date().toISOString(),
    };
    setThoughts((prev) => [newThought, ...prev]);
  };

  return (
    <>
      <div className="max-w-sm md:max-w-md lg:max-w-xl mx-auto p-4 md:p-8 lg:p-12">
        <ThoughtForm onSubmit={addThought} />
        <div className="mt-8">
          <ThoughtList thoughts={thoughts} />
        </div>
      </div>
    </>
  )
}
