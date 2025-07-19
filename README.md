# Pinchos
Tool to map where to find Pinchos in Puerto Rico 🇵🇷.

## Offline Usage
The service worker caches map tiles under the `/tiles/` path. When a tile is requested,
`sw.js` checks if it exists in the `tiles-cache`. Missing tiles are fetched from the
network, stored in the cache, and then returned. Subsequent requests for the same tile
are served directly from the cache so basic map browsing continues to work offline.
