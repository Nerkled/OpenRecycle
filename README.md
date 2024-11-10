# OpenRecycle

OpenRecycle is a front-end application that uses open-source APIs to display recycling information based on area code and item type. The app uses the Overpass API to retrieve recycling locations from OpenStreetMap and a basic html/ css frontend to display this data to users in an interactive, user-friendly way. The seacrh bar will have ollama3.2 built directly into it so it can figure out statements such as : "I need to get rid of scrapmetal". 

## Features

- Search recycling information by area code
- Filter locations by item type
- Interactive map using Overpass API (read-only)
- Simple and intuitive UI with Vue.js

## Technologies

- **Ollama** - LLM that allows for various models.
- **Llama3.1** - Generic model modified using prompts.
- **JavaScript** - Core language for app logic.
- **Flask** - Python based web framework for server querying.
- **OpenStreetMap, Overpass API, Nominatin** - API for retrieving map data, geocoding, and business data.
- **Python** - Backend for data manipulation. 
- **HTML/CSS** - Basic structure and styling.


## Project Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/username/OpenRecycle.git
   cd OpenRecycle


## Future Goals
- Fine tuning of LLM instead of prompt manipulation for better accuracy.
- Updating and cleanup of OSM Tag database.
- CLI to allow use of only specific functions such as prompt generation.
- Benchmark and improve server hardware.


# LICENSING CREDITS
OpenStreetMap(OSM, Overpass, Nominatin)     https://www.openstreetmap.org/copyright/
<br></br>
Ollama                                      https://github.com/ollama/ollama/blob/main/LICENSE
<br></br>
Llama3.1                                    https://www.llama.com/llama3_1/license/
<br></br>
