import { useState } from "react";
import { API_BASE_URL } from "../constants";

export const ThoughtForm = ({ onThoughtAdded }) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const maxLength = 140;
  const minLength = 5;

  const handleInputChange = (event) => {
    const value = event.target.value;
    setMessage(value);

    //Shows error if you type more than 140 characters
    if (value.length > maxLength) {
      setError(`Your message are too long. Please keep it under ${maxLength} characters`);
      return;
    }

    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    //Show error if you have less than 5 characters
    if (message.trim().length < minLength) {
      setError(`You must have at least ${minLength} characters.`);
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        setError("You must be logged in to post a thought");
        setIsSubmitting(false);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/thoughts`, {
        method: "POST",
        body: JSON.stringify({ message }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Could not create thought");
        return;
      }

      onThoughtAdded(data.response);
      event.target.reset();
    } catch (error) {
      setError("Could not create thought. Try again later");
    } finally {
      setIsSubmitting(false);
    }

    setMessage("");

  };

  const charactersTyped = message.length;
  const isOverLimit = charactersTyped > maxLength;


  return (
    <form
      onSubmit={handleSubmit}
      className="
        flex flex-col gap-4 bg-gray p-6 rounded-xs border border-black 
        shadow-[8px_8px_0px_0px_#000]
      "
    >
      <label htmlFor="message" className="text-lg">
        What's making you happy right now?
      </label>

      <textarea
        id="message"
        name="message"
        value={message}
        onChange={handleInputChange}
        rows={2}
        placeholder="Write a happy thought..."
        className="
          w-full bg-white border border-gray-400 p-3 text-black
          focus:outline-none focus:ring-2 focus:ring-red-200 
          focus:border-red-200 resize-none rounded-xs
        "
        disabled={isSubmitting}
      />

      <div
        id="character-counter"
        aria-live="polite"
        className={`text-sm ${isOverLimit ? "text-red-500" : "text-gray-700"}`}
      >
        {charactersTyped} / {maxLength}
      </div>

      {error && (
        <div className="mb-4 p-2 bg-red-50 text-red-600 rounded-md text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="
          inline-flex items-center gap-2 px-3 py-3 rounded-full bg-happy 
          hover:bg-happy-hover text-black font-medium font-sans
          transition-colors text-sm md:text-base cursor-pointer self-start
        "
      >
        ❤️ Send Happy Thought ❤️
      </button>
    </form>
  );
};