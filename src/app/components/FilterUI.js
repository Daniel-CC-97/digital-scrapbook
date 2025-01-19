import { useState } from "react";

const FilterUI = ({ filters, setFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      dateRange: { ...prev.dateRange, [name]: value },
    }));
  };

  return (
    <div className="bg-pastelPink-light p-3 mb-4 rounded-lg shadow-md border border-pastelPink">
      {/* Header */}
      <h3
        className="font-bold text-lg text-pastelBlue-dark cursor-pointer flex justify-between items-center"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        Filter Posts
        <span className="text-pastelBlue-darker">{isExpanded ? "▲" : "▼"}</span>
      </h3>

      {/* Expandable Content with animation */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isExpanded ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mt-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Author Filter */}
            <div>
              <label className="block text-sm font-medium text-pastelBlue-darker mb-1">
                Author:
              </label>
              <select
                name="author"
                value={filters.author}
                onChange={handleInputChange}
                className="w-full p-2 border border-pastelBlue rounded bg-white text-sm text-gray-800"
              >
                <option value="">All Authors</option>
                <option value="Daniel">Daniel</option>
                <option value="Tara">Tara</option>
              </select>
            </div>

            {/* Post Type Filter */}
            <div>
              <label className="block text-sm font-medium text-pastelBlue-darker mb-1">
                Post Type:
              </label>
              <select
                name="type"
                value={filters.type}
                onChange={handleInputChange}
                className="w-full p-2 border border-pastelBlue rounded bg-white text-sm text-gray-800"
              >
                <option value="">All Types</option>
                <option value="TextPost">Text Posts</option>
                <option value="ImagePost">Image Posts</option>
              </select>
            </div>

            {/* Date Range Filter */}
            <div className="col-span-1 sm:col-span-2">
              <label className="block text-sm font-medium text-pastelBlue-darker mb-1">
                Date Range:
              </label>
              <div className="flex space-x-2">
                <input
                  type="date"
                  name="start"
                  value={filters.dateRange.start || ""}
                  onChange={handleDateChange}
                  className="w-full p-2 border border-pastelBlue rounded bg-white text-sm text-gray-800"
                />
                <input
                  type="date"
                  name="end"
                  value={filters.dateRange.end || ""}
                  onChange={handleDateChange}
                  className="w-full p-2 border border-pastelBlue rounded bg-white text-sm text-gray-800"
                />
              </div>
            </div>

            {/* Keyword Search */}
            <div className="col-span-1 sm:col-span-2">
              <label className="block text-sm font-medium text-pastelBlue-darker mb-1">
                Keyword:
              </label>
              <input
                type="text"
                name="keyword"
                value={filters.keyword}
                onChange={handleInputChange}
                placeholder="Search by keyword..."
                className="w-full p-2 border border-pastelBlue rounded bg-white text-sm text-gray-800"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterUI;
