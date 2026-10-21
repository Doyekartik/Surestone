# The Astittva Estates

A responsive real estate marketplace concept built with plain HTML, CSS and JavaScript. The site has dedicated pages for the homepage, property search, property details, Raipur neighbourhoods, selling a property, the account centre, and the company promise. It includes property search and filters, favourites, a local account centre, visit requests, neighbourhood browsing, an OpenStreetMap view, and room-by-room immersive tour placeholders.

## Run locally

Open a PowerShell window in this folder and run:

```powershell
py -m http.server 8000
```

Then visit <http://localhost:8000>. Running on localhost enables the browser location request used by **Use my location**. Images and web fonts load from Unsplash and Google Fonts; the map loads from OpenStreetMap.

## About this prototype

The sample homes are illustrative listings. Saved homes, profile details, home preferences, visit requests, and enquiry submissions are stored in this browser using local storage. Enquiry submissions are not sent to a business inbox, and accounts are not authenticated against a server. The tour viewer is an interactive room-by-room placeholder; replace its sample scenes with property-specific 360° captures or a hosted 3D tour when those assets are available.
