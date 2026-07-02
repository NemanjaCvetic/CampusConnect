import { Link } from "react-router-dom";
import ItemsMap from "./ItemsMap";
import { useEffect, useState } from "react";
import { fetchItems } from "../api/items";
import "./MapPage.css";

const locationCoordinates = {
  FAMNIT: { lat: 45.5481, lng: 13.73 },
  Library: { lat: 45.5485, lng: 13.7295 },
  Brolo: { lat: 45.5479, lng: 13.7288 },
  Trg: { lat: 45.5487, lng: 13.7307 },
  Beach: { lat: 45.5468, lng: 13.7259 },
  Other: { lat: 45.5481, lng: 13.73 },
};

function MapPage() {
   const [items, setItems] = useState([]);
   useEffect(() => {
    fetchItems()
      .then((data) => {
        const mapItems = data
          .map((item) => ({
            ...item,
            status: item.type === "lost" ? "Lost" : "Found",
            lat: locationCoordinates[item.location]?.lat,
            lng: locationCoordinates[item.location]?.lng,
          }))
          .filter((item) => item.lat && item.lng);

        setItems(mapItems);
      })
      .catch((err) => {
        console.error("Failed to load map items:", err);
      });
  }, []);

  return (
    <div className="map-page">
      <section className="map-info">
        <h1>Campus Map</h1>

        <p>
          This is a special feature of CampusConnect that allows lost and found
          items to be displayed directly on the campus map.
        </p>

        <p>
          If you want your item to appear on the map, choose a location when
          submitting a lost or found item.
        </p>

        <div className="coordinates-box">
          <h3>Example locations</h3>
          <p><strong>FAMNIT:</strong> 45.5481, 13.7300</p>
          <p><strong>Library:</strong> 45.5485, 13.7295</p>
          <p><strong>Beach:</strong> 45.5468, 13.7259</p>
        </div>

        <p>
          For more information about reporting items, claims, messaging and map
          usage, visit the manual page.
        </p>

        <Link to="/manual" className="manual-map-link">
          Open User Manual
        </Link>
      </section>

      <section className="map-box">
        <ItemsMap items={items} />
      </section>
    </div>
  );
}

export default MapPage;