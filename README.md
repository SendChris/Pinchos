# Pinchos

A simple offline-first PWA to map food stands and other points of interest in Puerto Rico.

## Features

- Map view centered on Puerto Rico using Leaflet.
- Add markers by tapping on the map. Locations are stored in `localStorage` for offline use.
- Service worker caches the application shell, Leaflet library, and any map tiles you view for true offline access.
- Designed to work with locally stored map tiles placed in the `app/tiles` directory.

## Getting Started

1. Install a local HTTP server. For example, with Python:

   ```bash
   python3 -m http.server -b 0.0.0.0 -d app 8000
   ```

2. Open `http://localhost:8000` in your browser. The first load requires internet
   access to fetch Leaflet from the CDN. After that, the service worker caches
   everything for offline use.

3. To add offline map tiles, create a `tiles/{z}/{x}/{y}.png` structure inside
   the `app` directory. You can generate MBTiles for Puerto Rico and export them
   as PNG tiles using tools like [TileMill](https://tilemill-project.github.io/)
   or [MBUtil](https://github.com/mapbox/mbutil).

## Data Import/Export

Use the **Export** button to download your saved locations as `locations.json`.
You can load a file created this way with the **Import** button on another
device. The imported locations replace your current list and are saved back to
`localStorage`.

## License

This project is licensed under the Apache 2.0 License. See the `LICENSE` file
for details.
