import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";


const customIcon = new L.Icon({
  iconUrl: "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/2/29/GEN_Lehends_2024_Split_1.png/revision/latest/scale-to-width-down/250?cb=20240305182640", // put image in public folder
  iconSize: [30, 40],
  iconAnchor: [15, 40],
  popupAnchor: [0, -35],
});

function ItemsMap({ items }) {
  return (
    <MapContainer
      center={[45.5481, 13.7300]}
      zoom={16}
      style={{ height: "400px", width: "100%", borderRadius: "16px" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {items.map((item) => (
        <Marker key={item.id} position={[item.lat, item.lng]} icon = {customIcon}>
          <Popup>
            <strong>{item.title}</strong>
            <br />
            {item.status}
            <br />
            {item.location}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default ItemsMap;