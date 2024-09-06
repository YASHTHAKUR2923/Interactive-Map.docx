// Initialize the map and set the view to a starting location and zoom level
const map = L.map('map').setView([51.505, -0.09], 13);

// Load and display map tiles from OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Define marker categories
const markers = {
  'restaurants': [
    { lat: 51.505, lon: -0.09, name: 'Restaurant 1', description: 'Nice restaurant.' },
    { lat: 51.515, lon: -0.1, name: 'Restaurant 2', description: 'Great food.' }
  ],
  'parks': [
    { lat: 51.525, lon: -0.09, name: 'Park 1', description: 'Beautiful park.' },
    { lat: 51.535, lon: -0.08, name: 'Park 2', description: 'Relaxing atmosphere.' }
  ]
};

// Function to create markers for each category
function createMarkers(category) {
  map.eachLayer(function(layer) {
    if (layer instanceof L.Marker) {
      map.removeLayer(layer); // Remove existing markers
    }
  });

  if (category === 'all') {
    Object.keys(markers).forEach(cat => {
      markers[cat].forEach(location => {
        const marker = L.marker([location.lat, location.lon]).addTo(map);
        marker.bindPopup(`<b>${location.name}</b><br>${location.description}`).openPopup();
      });
    });
  } else {
    markers[category].forEach(location => {
      const marker = L.marker([location.lat, location.lon]).addTo(map);
      marker.bindPopup(`<b>${location.name}</b><br>${location.description}`).openPopup();
    });
  }
}

// Initialize markers with "all" category
createMarkers('all');

// Event listener for category selection
document.getElementById('categorySelect').addEventListener('change', function () {
  const category = this.value;
  createMarkers(category);
});

// Geolocation functionality to find the user's location
document.getElementById('geoLocationBtn').addEventListener('click', function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      const userLocation = [position.coords.latitude, position.coords.longitude];
      L.marker(userLocation).addTo(map).bindPopup("You are here").openPopup();
      map.setView(userLocation, 13);
    }, function(error) {
      alert('Unable to retrieve your location');
    });
  } else {
    alert('Geolocation is not supported by your browser');
  }
});
