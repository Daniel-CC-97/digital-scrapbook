import { useState } from "react";

const Lockscreen = ({ onUnlock }) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);

  const handleButtonClick = (value) => {
    if (code.length < 6) {
      setCode((prev) => prev + value);
      if (error) setError(false); // Clear error message when user clicks
    }
  };

  const handleClear = () => {
    setCode("");
    setError(false);
  };

  const handleUnlock = () => {
    if (code === "010424") {
      onUnlock();
    } else {
      setError(true);
      setCode("");
    }
  };

  return (
    <div className="fixed inset-0 bg-pastelPink flex items-center justify-center z-50">
      <div className="bg-pastelPink-dark border-2 border-pastelPink-light p-6 rounded-lg shadow-lg w-80 text-center">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-pastelPink-light">
            Enter Passcode
          </h2>
          <p className="text-pastelPink-light">
            <strong>Clue: </strong>Our first date
          </p>
        </div>
        <div className="mb-4">
          <div className="bg-gray-100 p-3 rounded-lg text-2xl tracking-widest text-center">
            {code.padEnd(6, "•")}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].map((num) => (
            <button
              key={num}
              onClick={() => handleButtonClick(num)}
              className="border-pastelPink-light border text-pastelPink-light text-xl font-bold p-4 rounded-full shadow-md hover:bg-pastelPink-light hover:text-pastelPink-dark"
            >
              {num}
            </button>
          ))}
        </div>
        <div className="flex justify-between gap-2">
          <button
            onClick={handleUnlock}
            className="flex-1 border border-pastelPink-light text-white py-2 rounded-lg shadow-md hover:bg-pastelPink-light hover:text-pastelPink-dark"
          >
            Unlock
          </button>
          <button
            onClick={handleClear}
            className="flex-1 border border-pastelPink-light text-white py-2 rounded-lg shadow-md hover:bg-pastelPink-light hover:text-pastelPink-dark"
          >
            Clear
          </button>
        </div>
        {error && (
          <p className="text-red-500 text-sm mt-4">
            Incorrect code. Please try again.
          </p>
        )}
      </div>
    </div>
  );
};

export default Lockscreen;
