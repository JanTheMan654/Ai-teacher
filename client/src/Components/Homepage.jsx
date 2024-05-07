import React, { useState } from "react";
import axios from "axios";
import "../App.css";
import { CookiesProvider, useCookies } from "react-cookie";
import LoginModal from "./LoginModal";

function Homepage() {
  const [title, setTitle] = useState("");
  const [description, setDesctiption] = useState("");
  const [cookies, setCookie] = useCookies(["user"]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/predict", {
        title: title,
        description: description,
      });
      const prediction = response.data.prediction;

      if (prediction === 0) {
        console.log("This news is likely not factual.");
      } else {
        console.log("This news is likely factual.");
      }
    } catch (error) {
      console.error("Error:", error.message);
      // Handle error (e.g., display an error message to the user)
    }
  };

  function handleLogin(user) {
    setCookie("user", user, { path: "/" });
  }

  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/homepage_bg.jpg)`,
      }}
    >
      <div className="hero-overlay bg-opacity-60">
        <div className="login-modal">
          <header>
            <div className="my-modal">
              <button
                className="btn"
                onClick={() => {
                  document.getElementById("my_modal_3").showModal();
                }}
              >
                Login/Register
              </button>
              <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                  <LoginModal onLogin={handleLogin} />
                </div>
              </dialog>
            </div>
          </header>
        </div>
        <div className="hero-content text-center text-neutral-content">
          <div className="min-h-screen flex items-center justify-center">
            <div className="card w-96 bg-gray p-8 shadow-md">
              <div className="card-body">
                <h1 className="card-title">News Title: </h1>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="Bigfoot sighting..."
                    className="input input-bordered w-full max-w-xs"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <h2 className="card-title">News Description: </h2>
                  <input
                    type="text"
                    placeholder="Is bigfoot real?..."
                    className="input input-bordered w-full max-w-xs p-4"
                    value={description}
                    onChange={(e) => setDesctiption(e.target.value)}
                  />
                  <button className="btn btn-primary">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
