## OpenRecycle

OpenRecycle is a front-end application that uses open-source APIs to display recycling information based on area code and item type. The app uses the Overpass API to retrieve recycling locations from OpenStreetMap and a basic HTML/CSS frontend to display this data to users in an interactive, user-friendly way. The search bar will have Ollama 3.2 built directly into it so it can figure out statements such as: "I need to get rid of scrap metal."

## Dependencies

- Flask
- Flask-CORS for Python

## Features

- Search recycling information by area code
- Filter locations by item type
- Interactive map using Overpass API (read-only)
- Simple and intuitive UI with Vue.js

## Technologies

- Ollama - LLM that allows for various models.
- Llama 3.1 - Generic model modified using prompts.
- JavaScript - Core language for app logic.
- Flask - Python-based web framework for server querying.
- OpenStreetMap, Overpass API, Nominatim - APIs for retrieving map data, geocoding, and business data.
- Python - Backend for data manipulation.
- HTML/CSS - Basic structure and styling.

## Project Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/username/OpenRecycle.git
   cd OpenRecycle
   ```
2. Ensure dependencies are installed and working.
3. Run the Flask server backend:
   ```bash
   python serverCalling.py
   ```
4. Run a live server and open `index.html` with your browser.

## Future Goals

- Fine-tuning of LLM instead of prompt manipulation for better accuracy.
- Updating and cleanup of OSM Tag database.
- CLI to allow use of only specific functions such as prompt generation.
- Benchmark and improve server hardware.

## Project Diagram

![Project Diagram](/OpenRecycleD.jpg)

## Licensing Credits

- OpenStreetMap (OSM, Overpass, Nominatim): [OpenStreetMap Copyright](https://www.openstreetmap.org/copyright/)
- Ollama: [Ollama License](https://github.com/ollama/ollama/blob/main/LICENSE)
- Llama 3.1: [Llama 3.1 License](https://www.llama.com/llama3_1/license/)
