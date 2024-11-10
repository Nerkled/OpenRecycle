// Declare latitude and longitude variables globally
let latitude = 40.712776; // Default Latitude of the center point
let longitude = -74.005974; // Default Longitude of the center point
const radius = 100000; // Radius in meters

// Function to fetch data from Overpass API
async function fetchData() {
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
            if(name!="Unnamed Place"){
                console.log(element);
                const listItem = document.createElement("div");
                listItem.innerHTML = `<strong>${name}</strong> - ID: ${element.id}`;
                resultsDiv.appendChild(listItem);
            }
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
                console.log("Updated Latitude:", latitude, "Updated Longitude:", longitude);

                // Display the coordinates on the webpage
                displayCoordinates(lat, lon);


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
function displayCoordinates(latitude, longitude) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h3>Coordinates:</h3>
        <p>Latitude: ${latitude}</p>
        <p>Longitude: ${longitude}</p>
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

async function getFlaskData() {
    try {
        // Fetch data from the Flask server
        const response = await fetch('http://127.0.0.1:5000/fetch_data');  // Ensure the URL is correct
        // Check if the response is successful (status 200)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // Parse the JSON response from Flask
        const data = await response.json();

        // Get the results div
        const resultsDiv = document.getElementById('results');
        // Check if the data has a message
        if (data && data.message) {
            resultsDiv.innerHTML = `<h2>${data.message}</h2>`; // Show message from Flask
        } else {
            resultsDiv.innerHTML = "<p>No message received from the server.</p>";
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('results').innerHTML = "<p>Error fetching data from the server.</p>";
    }
}
// Attach the event listener to the "Get Coordinates" button
document.getElementById("fetchCoordinatesBtn").addEventListener("click", getFlaskData);

// Function to send user input to the backend
async function sendUserInputToBackend(item) {
    try {
        const response = await fetch('http://127.0.0.1:5000/fetch_data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ item })
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        document.getElementById('results').innerHTML = `<h2>${data.message}</h2>`;
    } catch (error) {
        console.error('Error sending user input to backend:', error);
        document.getElementById('results').innerHTML = "<p>Error sending user input to the server.</p>";
    }
}

// Modify event listener for the search button
document.getElementById("fetchDataBtn").addEventListener("click", function() {
    const item = document.getElementById("itemInput").value;
    if (item) {
        sendUserInputToBackend(item);
    } else {
        document.getElementById("results").innerHTML = "Please enter a recycling item.";
    }
});
