document.addEventListener('DOMContentLoaded', function() {
    const recyclableItems = ["plastic", "metal", "glass", "paper", "cardboard"];
    let latitude = 40.7128; // Default to New York City coordinates
    let longitude = -74.0060;
    const radius = 5000;

    // Check if geolocation is available
    if (navigator.geolocation) {
        // Inform the user about location usage
        document.getElementById('locationInfo').innerHTML = "<p>We are requesting your location to show nearby recycling centers. Please allow location access.</p>";

        // Try to get the user's current position as soon as the page loads
        navigator.geolocation.getCurrentPosition(position => {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            console.log("User location:", latitude, longitude);
        }, (error) => {
            // Handle errors if the user denies geolocation access
            if (error.code === error.PERMISSION_DENIED) {
                alert("You have denied location access. You can still search for recycling locations by entering a ZIP code.");
            } else {
                alert("Error getting location. Please try again later.");
            }
        });
    } else {
        alert("Geolocation is not supported by your browser.");
    }

    // Autocomplete for recyclable items
    $("#itemInput").autocomplete({
        source: recyclableItems,
        minLength: 2,
        autoFocus: true
    });

    // Build Overpass API query
    function buildQuery(item, lat, lon) {
        const itemTag = `recycling:${item.toLowerCase()}`;
        return `
            [out:json];
            (
                way["${itemTag}"](around:${radius},${lat},${lon});
            );
            out center;
        `;
    }

    async function fetchData(query) {
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
            document.getElementById('results').innerHTML = "<p>Error fetching data. Please try again later.</p>";
        }
    }

    function displayData(data) {
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = "<h2>Recycling Locations</h2>";
        
        if (!data.elements || data.elements.length === 0) {
            resultsDiv.innerHTML = "<p>No recycling locations found for this item.</p>";
            return;
        }

        data.elements.forEach(element => {
            if (element.type === "way") {
                const name = element.tags && element.tags.name ? element.tags.name : "Unnamed Location";
                const description = element.tags && element.tags.description ? element.tags.description : "No description available";
                const lat = element.center ? element.center.lat : "Unknown Latitude";
                const lon = element.center ? element.center.lon : "Unknown Longitude";

                const listItem = document.createElement("div");
                listItem.classList.add("recycling-location");
                listItem.innerHTML = `
                    <h3>${name}</h3>
                    <p><strong>Description:</strong> ${description}</p>
                    <p><strong>Coordinates:</strong> Latitude: ${lat}, Longitude: ${lon}</p>
                `;
                resultsDiv.appendChild(listItem);
            }
        });
    }

    // Handle "Fetch Data" button click
    document.getElementById("fetchDataBtn").addEventListener("click", function() {
        const itemInput = document.getElementById("itemInput").value.trim();
        const zipInput = document.getElementById("zipInput").value.trim();
        if (itemInput && zipInput) {
            getCoorFromAddress(zipInput).then(({ lat, lon }) => {
                const query = buildQuery(itemInput, lat, lon);
                fetchData(query);
            }).catch(error => {
                console.error("Error fetching coordinates:", error);
                document.getElementById('results').innerHTML = "<p>Error fetching coordinates. Please try again later.</p>";
            });
        } else {
            document.getElementById('results').innerHTML = "<p>Please enter both a recycling item and a ZIP code to search for.</p>";
        }
    });

    // Handle "Use My Location" button click
    document.getElementById("useLocationBtn").addEventListener("click", function() {
        const itemInput = document.getElementById("itemInput").value.trim();
        if (itemInput) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    const query = buildQuery(itemInput, lat, lon);
                    fetchData(query);
                }, (error) => {
                    console.error("Error getting location:", error);
                    document.getElementById('results').innerHTML = "<p>Error getting location. Please try again later.</p>";
                });
            } else {
                document.getElementById('results').innerHTML = "<p>Geolocation is not supported by your browser.</p>";
            }
        } else {
            document.getElementById('results').innerHTML = "<p>Please enter a recycling item to search for.</p>";
        }
    });

    // Get coordinates from a ZIP code using Nominatim API
    async function getCoorFromAddress(address) {
        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.length > 0) {
            const { lat, lon } = data[0];
            return { lat, lon };
        } else {
            throw new Error("Address not found.");
        }
    }
});