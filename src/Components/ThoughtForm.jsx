export const ThoughtForm = ({ onSubmit }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const message = event.target.message.value;
    onSubmit(message);
    event.target.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white p-6 shadow-md">
      <label htmlFor="message" className="text-lg font-semibold">
        What's making you happy right now?
      </label>
      <input type="text" id="message" name="message" placeholder="Write a happy thought.." className="border border-gray-300 p-3 text-gray-700 focus: outline-none focus: ring-2 focus: ring-pink-400" />
      <button type="submit" className="bg-pink-500 hover:bg-pink-600 text-black font-semibold py-2 px-4 rounded-lg transition-colors">
        ❤️ Send Happy Thoughts ❤️
      </button>
    </form>
  );
};