import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import './Map.css';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';

const Map = () => {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);
  const [location, setLocation] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!location.trim()) return;

    const geoRes = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        location
      )}&format=json`
    );
    const geoData = await geoRes.json();

    if (geoData.length === 0) {
      alert('Ubicación no encontrada');
      return;
    }

    const { lat, lon } = geoData[0];
    const latFloat = parseFloat(lat);
    const lonFloat = parseFloat(lon);

    map.setCenter([lonFloat, latFloat]);
    map.setZoom(15);

    const latOffset = 0.01;
    const lonOffset = 0.01;
    const south = latFloat - latOffset;
    const north = latFloat + latOffset;
    const west = lonFloat - lonOffset;
    const east = lonFloat + lonOffset;

    const overpassQuery = `
      [out:json];
      (
        node["shop"="supermarket"](${south},${west},${north},${east});
        node["amenity"="marketplace"](${south},${west},${north},${east});
      );
      out center;
    `;

    const response = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `data=${encodeURIComponent(overpassQuery)}`,
    });

    const data = await response.json();
    setResults(data.elements);

    data.elements.forEach((place) => {
      new maplibregl.Marker()
        .setLngLat([place.lon, place.lat])
        .setPopup(
          new maplibregl.Popup().setText(place.tags?.name || 'Sin nombre')
        )
        .addTo(map);
    });
  };

  useEffect(() => {
    const mapInstance = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
      center: [-90.5133, 14.6349],
      zoom: 12,
    });
    setMap(mapInstance);
  }, []);

  return (
    <div className="page-wrapper">
      <Navbar />
      <main className="map-wrapper">
        <h2>Buscar Huertos y Supermercados</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Ingresa una ubicación (ej. zona 1, Guatemala)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button onClick={handleSearch}>Buscar</button>
        </div>
        <div ref={mapContainer} className="map-box" />
        <section className="map-results">
          <h3>Lugares encontrados</h3>
          {results.map((item, idx) => (
            <div key={idx} className="result-card">
              <p><strong>{item.tags?.name || 'Sin nombre'}</strong></p>
              <p>Tipo: {item.tags?.shop || item.tags?.amenity}</p>
              <p>Coordenadas: {item.lat.toFixed(5)}, {item.lon.toFixed(5)}</p>
              <a
                href={`https://www.google.com/maps?q=${item.lat},${item.lon}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver en Google Maps
              </a>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Map;
