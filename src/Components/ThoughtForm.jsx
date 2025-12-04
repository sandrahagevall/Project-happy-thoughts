import { useState } from "react";

export const ThoughtForm = ({ onSubmit }) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const maxLength = 140;
  const minLength = 5;

  const handleInputChange = (event) => {
    const value = event.target.value;
    setMessage(value);

    //Shows error if you type more than 140 characters
    if (value.length > maxLength) {
      setError(`Your message are too long. Please keep it under ${maxLength} characters`)
      return
    }
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    //Shows error if you have less than 5 characters
    if (message.trim().length < minLength) {
      setError(`You must have at least ${minLength} characters.`)
      return;
    };

    onSubmit(message);
    setMessage("");
  };

  const charactersLeft = maxLength - message.length
  const isOverLimit = charactersLeft < 0

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-gray-100 p-6 rounded-xs border border-black shadow-[8px_8px_0px_0px_#000]">
      <label htmlFor="message" className="text-md">
        What's making you happy right now?
      </label>

      <textarea
        id="message"
        name="message"
        onChange={handleInputChange}
        value={message}
        rows={2}
        placeholder="Write a happy thought.."
        className=" w-full bg-white border border-gray-400 p-3 text-black focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-200 resize-none rounded-xs" />

      <div
        id="character-counter"
        className={`text-sm ${isOverLimit ? "text-red-500" : "text-gray-700"
          }`}
        aria-live="polite"
      >
        {charactersLeft} / {maxLength}
      </div>

      {error && (
        <div className="mb-4 p-2 bg-red-50 text-red-600 rounded-md text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        className="inline-flex items-center gap-2 self-start px-3 py-3 rounded-full bg-red-300 hover:bg-red-400 text-black font-medium transition-colors text-sm sm:text-base cursor-pointer">
        ❤️ Send Happy Thought ❤️
      </button>
    </form>
  );
};