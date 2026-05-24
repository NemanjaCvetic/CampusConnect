import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

function createIcon(color) {
  return L.divIcon({
    className: "",
    html: `
      <svg width="28" height="36" viewBox="0 0 28 36" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 0C6.27 0 0 6.27 0 14c0 9.625 14 22 14 22S28 23.625 28 14C28 6.27 21.73 0 14 0z"
              fill="${color}" stroke="white" stroke-width="2"/>
        <circle cx="14" cy="14" r="5" fill="white"/>
      </svg>
    `,
    iconSize: [28, 36],
    iconAnchor: [14, 36],
    popupAnchor: [0, -36],
  });
}

const lostIcon  = createIcon("#e05252");  // red for lost
const foundIcon = createIcon("#3a9e6e");  // green for found

function ItemsMap({ items }) {
  return (
    <MapContainer
      center={[45.5481, 13.7300]}
      zoom={16}
      style={{ height: "400px", width: "100%", borderRadius: "16px" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {items.map((item) => (
        <Marker
          key={item.id}
          position={[item.lat, item.lng]}
          icon={item.status === "Lost" ? lostIcon : foundIcon}
        >
          <Popup>
            <strong>{item.title}</strong><br />
            {item.status}<br />
            {item.location}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default ItemsMap;