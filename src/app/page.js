"use client";

import { useState, useEffect } from "react";
import Feed from "./components/Feed";
import Lockscreen from "./components/Lockscreen";

export default function Home() {
  const [unlocked, setUnlocked] = useState(false); // Tracks if the lockscreen is unlocked
  const [showWelcome, setShowWelcome] = useState(false); // Tracks if the welcome message is showing
  const [feedLoaded, setFeedLoaded] = useState(false); // Tracks if the feed has fully rendered

  const handleUnlock = () => {
    setShowWelcome(true); // Show the welcome message
    setUnlocked(true); // Start rendering the feed
  };

  // When feed finishes loading, hide the welcome message after a short delay
  useEffect(() => {
    if (feedLoaded) {
      setTimeout(() => {
        setShowWelcome(false); // Hide the welcome message
      }, 2000); // Keep the welcome message visible for 2 seconds after feed loads
    }
  }, [feedLoaded]);

  return (
    <div className="w-screen h-screen relative">
      {/* Lockscreen */}
      {!unlocked && <Lockscreen onUnlock={handleUnlock} />}

      {/* Welcome message while feed renders */}
      {unlocked && showWelcome && (
        <div className="fixed inset-0 bg-pastelPink-light flex items-center justify-center z-50">
          <div className="bg-pastelPink-dark p-6 rounded-lg shadow-lg text-center">
            <h1 className="text-3xl font-bold text-pastelPink-light mb-2">
              Opening scrapbook...
            </h1>
            <p className="text-pastelPink-light">Please wait a moment.</p>
          </div>
        </div>
      )}

      {/* Feed (hidden behind welcome message until fully rendered) */}
      {unlocked && (
        <div
          className={
            showWelcome
              ? "opacity-0"
              : "opacity-100 transition-opacity duration-500"
          }
        >
          <Feed onFeedLoaded={() => setFeedLoaded(true)} />
        </div>
      )}
    </div>
  );
}
