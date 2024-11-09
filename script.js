// Define the Overpass API query to fetch parks within a 500 meter radius
const latitude = 40.712776; // Latitude of the center point
const longitude = -74.005974; // Longitude of the center point
const radius = 10000; // Radius in meters

// Overpass query using the "around" filter for radius
const item = 'restaurant';
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
    // Construct the API URL with the encoded query
    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

    try {
        // Fetch data from the Overpass API
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

// Function to display the fetched data on the webpage
function displayData(data) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = "<h2>Restaurants in the 1000-meter Radius</h2>";
    // Loop through each element in the response data
    data.elements.forEach(element => {
        if (element.type === "way") {
            console.log(element);
            const city = element.tags && element.tags['addr:city'] ? element.tags['addr:city'] : "Unknown City";
            const houseNumber = element.tags && element.tags['addr:housenumber'] ? element.tags['addr:housenumber'] : "Unknown House Number";
            const street = element.tags && element.tags['addr:street'] ? element.tags['addr:street'] : "Unknown Street";
            const postcode = element.tags && element.tags['addr:postcode'] ? element.tags['addr:postcode'] : "Unknown Postcode";
            // Display the name and coordinates of each park
            const name = element.tags && element.tags.name ? element.tags.name : "Unnamed Park";
            const listItem = document.createElement("div");
            listItem.innerHTML = `<strong>${name}</strong> - ID: ${element.id}`;
            resultsDiv.appendChild(listItem);
        }
    });
}

// Attach event listener to the button
document.getElementById("fetchDataBtn").addEventListener("click", fetchData);
