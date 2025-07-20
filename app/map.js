// Initialize Leaflet map
var map = L.map('map').setView([18.2208, -66.5901], 9); // Center on Puerto Rico

// Tile layer from local tiles directory
var offlineLayer = L.tileLayer('./tiles/{z}/{x}/{y}.png', {
    maxZoom: 18,
    minZoom: 5,
    errorTileUrl: '',
    attribution: 'Map data &copy; OpenStreetMap contributors'
}).addTo(map);

// Load saved points of interest from localStorage
var locations = JSON.parse(localStorage.getItem('locations') || '[]');
var markers = [];
locations.forEach(function(loc) {
    var m = L.marker([loc.lat, loc.lng]).addTo(map).bindPopup(loc.name);
    markers.push(m);
});

// Add marker on map click and store in localStorage
map.on('click', function(e) {
    var name = prompt('Name of location');
    if (!name) return;
    var marker = L.marker(e.latlng).addTo(map).bindPopup(name);
    markers.push(marker);
    locations.push({ lat: e.latlng.lat, lng: e.latlng.lng, name: name });
    localStorage.setItem('locations', JSON.stringify(locations));
});

// Export locations as JSON file
document.getElementById('exportBtn').addEventListener('click', function() {
    var data = JSON.stringify(locations, null, 2);
    var blob = new Blob([data], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'locations.json';
    a.click();
    URL.revokeObjectURL(url);
});

// Import locations from JSON file
document.getElementById('importBtn').addEventListener('click', function() {
    document.getElementById('importFile').click();
});

document.getElementById('importFile').addEventListener('change', function(e) {
    var file = e.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function(evt) {
        try {
            var data = JSON.parse(evt.target.result);
            if (Array.isArray(data)) {
                // Remove existing markers
                markers.forEach(function(m) { map.removeLayer(m); });
                markers = [];
                locations = data;
                locations.forEach(function(loc) {
                    var m = L.marker([loc.lat, loc.lng]).addTo(map).bindPopup(loc.name);
                    markers.push(m);
                });
                localStorage.setItem('locations', JSON.stringify(locations));
            } else {
                alert('Invalid file');
            }
        } catch (err) {
            alert('Failed to read file');
        }
    };
    reader.readAsText(file);
    e.target.value = '';
});
