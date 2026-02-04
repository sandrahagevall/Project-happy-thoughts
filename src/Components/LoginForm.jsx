import { useState } from "react";
import { API_BASE_URL } from "../constants";

export const LoginForm = ({ handleLogin, onClose }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [mode, setMode] = useState("login")

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please fill in both fields");
      return;
    }

    setError("");

    try {
      const endpoint = mode === "login" ? `${API_BASE_URL}/users/login` : `${API_BASE_URL}/users/signup`;

      const response = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
        headers: {
          "Content-type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json()

      handleLogin(data.response)

    } catch (error) {
      setError("Invalid email or password");
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="
          absolute top-3 right-3
          w-8 h-8
          flex items-center justify-center
          rounded-full
          text-gray-500 hover:text-gray-700
          hover:bg-gray-100
          text-xl
        "
        >
          ×
        </button>

        <h2 className="text-2xl font-bold text-center text-pink-600 mb-4">
          {mode === "login" ? "Log in" : "Create account"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          {error && (
            <p className="text-sm text-red-500 text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 rounded-lg transition"
          >
            {mode === "login" ? "Log in" : "Register"}
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600">
          {mode === "login" ? (
            <>
              No account?{" "}
              <button
                onClick={() => setMode("signup")}
                className="text-pink-600 hover:underline"
              >
                Register
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setMode("login")}
                className="text-pink-600 hover:underline"
              >
                Log in
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  )
}