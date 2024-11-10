# OpenRecycle

OpenRecycle is a front-end application that uses open-source APIs to display recycling information based on area code and item type. The app uses the Overpass API to retrieve recycling locations from OpenStreetMap and a Vue.js frontend to display this data to users in an interactive, user-friendly way.

## Features

- Search recycling information by area code
- Filter locations by item type
- Interactive map using Overpass API (read-only)
- Simple and intuitive UI with Vue.js

## Technologies

- **Vue.js** - Frontend framework for a reactive user interface.
- **JavaScript** - Core language for app logic.
- **Overpass API** - API for retrieving recycling-related location data.
- **HTML/CSS** - Basic structure and styling.

# Dependencies
- Flask, Flask_cors for Python
- Ollama, Llama3.1

## Project Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/username/OpenRecycle.git
   cd OpenRecycle
2. Ensure dependencies are installed and working
3.Run the flask server backend
   '''bash
   python serverCalling.py
5. Run a live server and open index.html with your browser
