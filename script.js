// Declare latitude and longitude variables globally
let latitude = 40.712776; // Default Latitude of the center point
let longitude = -74.005974; // Default Longitude of the center point
const radius = 10000; // Radius in meters

const query = `
    [out:json];
    (
        way["recycling"](around:${radius},${latitude},${longitude});
        way["recycling:glass_bottles"](around:${radius},${latitude},${longitude});
        way["recycling:paper"](around:${radius},${latitude},${longitude});
        way["recycling:glass"](around:${radius},${latitude},${longitude});
        way["recycling:plastic"](around:${radius},${latitude},${longitude});
        way["recycling:clothes"](around:${radius},${latitude},${longitude});
        way["recycling:cans"](around:${radius},${latitude},${longitude});
        way["recycling:plastic_bottles"](around:${radius},${latitude},${longitude});
        way["recycling:plastic_packaging"](around:${radius},${latitude},${longitude});
        way["recycling:waste"](around:${radius},${latitude},${longitude});
        way["recycling:cardboard"](around:${radius},${latitude},${longitude});
        way["recycling:shoes"](around:${radius},${latitude},${longitude});
        way["recycling:green_waste"](around:${radius},${latitude},${longitude});
        way["recycling:paper_packaging"](around:${radius},${latitude},${longitude});
    );
    out body;
`;

// Function to fetch data from Overpass API
async function fetchData() {
    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }
        const data = await response.json();
        displayData(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        document.getElementById('results').innerText = "Error fetching data. Please try again.";
    }
}

// Function to display the fetched Overpass data
function displayData(data) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = "<h2>Recycling places in the 10000-meter Radius</h2>";
    
    data.elements.forEach(element => {
        if (element.type === "way") {
            const name = element.tags && element.tags.name ? element.tags.name : "Unnamed Place";
            const listItem = document.createElement("div");
            listItem.innerHTML = `<strong>${name}</strong> - ID: ${element.id}`;
            resultsDiv.appendChild(listItem);
        }
    });
}

// Function to get coordinates from an address
function getCoorFromAddress(address) {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const { lat, lon } = data[0];
                console.log("Latitude:", lat, "Longitude:", lon);

                // Update the global latitude and longitude variables
                latitude = lat;
                longitude = lon;

                // Display the coordinates on the webpage
                displayCoordinates(lat, lon);

                // Re-fetch the Overpass data with the new coordinates
                fetchData();
            } else {
                console.log("Address not found.");
                document.getElementById("results").innerHTML = "Address not found.";
            }
        })
        .catch(error => {
            console.error("Error:", error);
            document.getElementById("results").innerHTML = "Error fetching coordinates. Please try again.";
        });
}

// Function to display coordinates on the webpage
function displayCoordinates(lat, lon) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h3>Coordinates:</h3>
        <p>Latitude: ${lat}</p>
        <p>Longitude: ${lon}</p>
        <a href="https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}" target="_blank">View on Map</a>
    `;
}

// Event listener for the Overpass data fetch button
document.getElementById("fetchDataBtn").addEventListener("click", fetchData);

// Event listener for the address input button
document.getElementById("fetchCoordinatesBtn").addEventListener("click", function() {
    const address = document.getElementById("addressInput").value;
    if (address) {
        getCoorFromAddress(address);
    } else {
        document.getElementById("results").innerHTML = "Please enter an address.";
    }
});
