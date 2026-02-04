export const Navbar = ({ user, likedThoughts, onLoginClick, onLogout, onShowLiked }) => {
  return (
    <nav
      className="
        w-full flex justify-between items-center
        px-6 py-4
        bg-linear-to-r from-[#FFC9C9] via-happy to-[#FF7B7B]
        backdrop-blur-md border-b border-pink-200
      "
    >
      <div className="flex items-center gap-4 sm:mr-16">
        {user && (
          <button
            onClick={onShowLiked}
            className="
              flex items-center gap-2
              bg-pink-50 border border-pink-200 text-pink-700
              px-3 py-1 rounded-full shadow-sm text-sm
              hover:bg-pink-100 transition
            "
          >
            <span>💗</span>
            <span>{likedThoughts.length} liked</span>
          </button>
        )}

        {user ? (
          <button
            onClick={onLogout}
            className="
              text-pink-800 font-semibold
              hover:underline
            "
          >
            Log out
          </button>
        ) : (
          <button
            onClick={onLoginClick}
            className="
              text-pink-800 font-semibold
              hover:underline
            "
          >
            Log in
          </button>
        )}
      </div>
    </nav>
  )
}