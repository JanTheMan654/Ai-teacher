import React, { useState } from "react";
import { useCookies } from "react-cookie";

function LoginModal() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false); // State to track registration/login
  const [error, setError] = useState("");
  const [cookies, setCookie] = useCookies(["username"]); // State to manage cookies
  const [isModalOpen, setIsModalOpen] = useState(true); // State to manage modal open/close

  const toggleForm = () => {
    setIsRegistering((prevState) => !prevState); // Toggle between registration and login forms
    setError(""); // Clear any previous errors
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password");
      return;
    }
    if (isRegistering) {
      // Store user login information in cookies
      setCookie("username", username, { path: "/" });
      // Switch to login form after registration
      setIsRegistering(false);
      // Clear form fields
      setUsername("");
      setPassword("");
    } else {
      // Validate login credentials (replace with your actual validation logic)
      if (username !== "valid_username" || password !== "valid_password") {
        setError("Invalid username or password");
      } else {
        // Perform login logic here (e.g., set user as logged in)
        console.log("User logged in!");
        // Close modal after login
        closeModal();
      }
    }
  };

  const closeModal = () => {
    // Implement your modal closing logic here
    setIsModalOpen(false);
  };

  return (
    <div
      className={`flex items-center justify-center h-screen ${
        isModalOpen ? "" : "hidden"
      }`}
    >
      <div className="w-full max-w-md">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {isRegistering ? "Register an account" : "Sign in"}
        </h2>
        <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              required
              className="input input-bordered w-full"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <div className="flex justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <input
              id="password"
              type="password"
              required
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button type="submit" className="btn btn-primary btn-block">
            {isRegistering ? "Register" : "Sign in"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-500">
          {isRegistering ? (
            <span>
              Already have an account?{" "}
              <button
                onClick={toggleForm}
                className="text-indigo-600 hover:text-indigo-500"
              >
                Sign in here
              </button>
            </span>
          ) : (
            <span>
              Don't have an account?{" "}
              <button
                onClick={toggleForm}
                className="text-indigo-600 hover:text-indigo-500"
              >
                Register here
              </button>
            </span>
          )}
        </p>
      </div>
    </div>
  );
}

export default LoginModal;
