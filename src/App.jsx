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
    <>
      <div className="max-w-sm md:max-w-md lg:max-w-xl xl:max-w-2xl mx-auto p-4 md:p-8 lg:p-12">
        <ThoughtForm onSubmit={addThought} />
      </div>
    </>
  )
}
