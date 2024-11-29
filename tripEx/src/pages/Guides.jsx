import { useState, useEffect } from "react";
import facade from "../util/apiFacade";
("../util/apiFacade");
import "../styles/App.css";

function Guides() {
  const [guides, setGuides] = useState([]);

  useEffect(() => {
    const token = facade.getToken(); 
    if (!token) {
      console.log("No token found. Please log in.");
      return;
    }

    fetch("https://tripapi.cphbusinessapps.dk/api/guides", {
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
        setGuides(data);
      })
      .catch((error) => console.error("Error fetching guides:", error));
  }, []);

  return (
    <div>
      <h1>Guides</h1>
      {guides.length > 0 ? (
        <ul>
          {guides.map((guide) => (
            <li key={guide.id}>
              <div>
                <strong>
                  {guide.firstname} {guide.lastname}
                </strong>
                <ul>
                  <li>Email: {guide.email}</li>
                  <li>Phone: {guide.phone}</li>
                </ul>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No guides available.</p>
      )}
    </div>
  );
}

export default Guides;
