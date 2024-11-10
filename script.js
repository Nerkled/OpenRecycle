document.addEventListener('DOMContentLoaded', function () {
    const recyclableItems = ["plastic", "metal", "glass", "paper", "cardboard"];
    let latitude = 40.7128;  // Default to New York City coordinates
    let longitude = -74.0060;

    // Initialize the map
    const map = L.map('map').setView([latitude, longitude], 13);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Ask the user for location access via a browser confirm dialog
    if (confirm("We need access to your location to show nearby recycling centers. Would you like to share your location?")) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                latitude = position.coords.latitude;
                longitude = position.coords.longitude;
                map.setView([latitude, longitude], 13);
                L.marker([latitude, longitude]).addTo(map).bindPopup("<b>Your Location</b>").openPopup();
            }, (error) => {
                if (error.code === error.PERMISSION_DENIED) {
                    alert("You have denied location access. You can still search for recycling locations by entering a ZIP code.");
                } else {
                    alert("Error getting location. Please try again later.");
                }
            });
        } else {
            alert("Geolocation is not supported by your browser.");
        }
    } else {
        alert("You can still search for recycling locations by entering a ZIP code.");
    }

    // Autocomplete for recyclable items
    $("#itemInput").autocomplete({
        source: recyclableItems,
        minLength: 2,
        autoFocus: true
    });

    // Build Overpass API query
    function buildQuery(item, lat, lon, radius) {
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

                // Add marker to the map
                L.marker([lat, lon]).addTo(map)
                    .bindPopup(`<b>${name}</b><br>${description}`)
                    .openPopup();
            }
        });
    }

    // Handle "Fetch Data" button click
    document.getElementById("fetchDataBtn").addEventListener("click", function() {
        const itemInput = document.getElementById("itemInput").value.trim();
        const zipInput = document.getElementById("zipInput").value.trim();
        const radiusInput = document.getElementById("radiusInput").value.trim();
        if (itemInput && zipInput && radiusInput) {
            getCoorFromAddress(zipInput).then(({ lat, lon }) => {
                const query = buildQuery(itemInput, lat, lon, radiusInput);
                fetchData(query);
            }).catch(error => {
                console.error("Error fetching coordinates:", error);
                document.getElementById('results').innerHTML = "<p>Error fetching coordinates. Please try again later.</p>";
            });
        } else {
            document.getElementById('results').innerHTML = "<p>Please enter a recycling item, a ZIP code, and a radius to search for.</p>";
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
