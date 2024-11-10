# OpenRecycle

OpenRecycle is a front-end application that uses open-source APIs to display recycling information based on area code and item type. The app uses the Overpass API to retrieve recycling locations from OpenStreetMap and a basic html/ css frontend to display this data to users in an interactive, user-friendly way. The seacrh bar will have ollama3.2 built directly into it so it can figure out statements such as : "I need to get rid of scrapmetal". 

## Features

- Search recycling information by area code
- Filter locations by item type
- Interactive map using Overpass API (read-only)
- Simple and intuitive UI with Vue.js

## Technologies

- **Ollama3.1** - Allows for a dynamic input that can span over several types of recycking materials.
- **JavaScript** - Core language for app logic.
  **Flask** - Lets you use python on the web
- **Overpass API** - API for retrieving recycling-related location data.
- **HTML/CSS** - Basic structure and styling.

## Project Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/username/OpenRecycle.git
   cd OpenRecycle

# LICENSING CREDITS
OpenStreetMap(OSM, Overpass, Nominatin)     https://www.openstreetmap.org/copyright/
<br></br>
Ollama                                      https://github.com/ollama/ollama/blob/main/LICENSE
<br></br>
Llama3.1                                    https://www.llama.com/llama3_1/license/
<br></br>
