import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/App.css";

function Trip() {
  const { tripId } = useParams(); 
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    fetch(`https://tripapi.cphbusinessapps.dk/api/trips/${tripId}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
        "Content-type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setTrip(data);
      })
      .catch((error) => console.error("Error fetching trip:", error));
  }, [tripId]);

  if (!trip) {
    return <p>Loading trip details...</p>;
  }

  return (
    <div>
      <h1>{trip.name}</h1>
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
        {trip.packingList && trip.packingList.length > 0 && (
          <div>
            <h2>Packing List</h2>
            <ul>
              {trip.packingList.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </ul>
    </div>
  );
}

export default Trip;
