export const Navbar = ({ likedThoughts }) => {
  return (
    <nav className="w-full flex justify-end px-6 py-4
            bg-linear-to-r from-[#FFC9C9] via-happy to-[#FF7B7B]
            backdrop-blur-md border-b border-pink-200">
      <div className="flex items-center sm:mr-16 gap-2 bg-pink-50 border border-pink-200 text-pink-700 px-3 py-1 rounded-full shadow-sm text-sm">
        <span>💗</span>
        <span>{likedThoughts.length} liked</span>
      </div>
    </nav>
  );
};
