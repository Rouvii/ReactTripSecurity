import { useState, useEffect } from "react";


function Trips() {
  const [trips, setTrips] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const clickHandler = (event) => {
    const clickedTrip = event.target.closest(".trip-box");
    if (clickedTrip) {
      clickedTrip.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  useEffect(() => {
    fetch("https://tripapi.cphbusinessapps.dk/api/trips")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setTrips(data);

        const uniqueCategories = Array.from(
          new Set(data.map((trip) => trip.category))
        );
        setCategories(uniqueCategories);
      })
      .catch((error) => console.error("Error fetching trips:", error));
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredTrips = selectedCategory
    ? trips.filter((trip) => trip.category === selectedCategory)
    : trips;

  return (
    <div>
      <h1>Trips</h1>

      {}
      <label htmlFor="categoryFilter">Filter by Category:</label>
      <select
        id="categoryFilter"
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      {}
      {filteredTrips.length > 0 ? (
        <div className="trip-list" onClick={clickHandler}>
          <ul>
            {filteredTrips.map((trip) => (
              <li key={trip.id}>
                <div className="trip-box">
                  <strong>{trip.name}</strong>
                  <ul>
                    <li>Start Time: {trip.starttime}</li>
                    <li>End Time: {trip.endtime}</li>
                    <li>Price: ${trip.price}</li>
                    <li>Category: {trip.category}</li>
                    {trip.guide && (
                      <li>
                        Guide: {trip.guide.firstname} {trip.guide.lastname}
                      </li>
                    )}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No trips found for the selected category.</p>
      )}
    </div>
  );
}

export default Trips;
