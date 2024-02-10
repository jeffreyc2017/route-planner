import { config } from './config.js';
import { loadGoogleMapsAPI } from './google_maps_api.js';
import { drawPointsOnMap, clearDrawnCircles } from './query_circles.js';
import { generateCSV, downloadCSV } from './utils_csv.js';
import { showDeliverableAddresses } from './deliverables.js';
import { createDropdownMenu } from './marker.js';
import { addressDetails, generateCoordinateMatrix, fetchAddresses, promptUserBeforeFetching } from './addresses.js';


let map;
let geocoder;
let drawnPolygon = null;

function initMap() {
    console.log('Initializing map...');
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: config.zoom,
        center: { lat: config.lat, lng: config.lng },
    });
    
    geocoder = new google.maps.Geocoder();

    map.addListener("click", (mapsMouseEvent) => {
        const {x, y} = mapsMouseEvent.pixel;

        geocoder.geocode({ 'location': mapsMouseEvent.latLng }, function(results, status) {
            if (status === 'OK') {
                if (results[0]) {
                    const address = results[0].formatted_address;
                    const geocodedLatLng = results[0].geometry.location; // The precise latitude and longitude returned by geocoding

                    createDropdownMenu(map, address, geocodedLatLng, x, y);
                } else {
                    window.alert('No results found');
                }
            } else {
                window.alert('Geocoder failed due to: ' + status);
            }
        });
    });

    const drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.POLYGON,
        drawingControl: true,
        drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: ['polygon']
        },
        polygonOptions: {
            strokeColor: '#FF0000', // Boundary line color
            strokeOpacity: 0.8,     // Boundary line transparency
            strokeWeight: 2,        // Boundary line width
            fillColor: '#FF0000',   // Fill color
            fillOpacity: 0,         // Fill transparency, set to 0 to make polygon unfilled
            clickable: false,
            editable: true,
            zIndex: 1
        }
    });
    drawingManager.setMap(map);

    google.maps.event.addListener(drawingManager, 'polygoncomplete', function(polygon) {
        // Handle the event after the polygon is completed
        console.log(polygon.getPath().getArray());

        drawnPolygon = polygon;

        // Optional: If you want to disable drawing immediately after the polygon is completed, you can set the drawingManager's drawingMode to null
        drawingManager.setDrawingMode(null);
    });
}

window.initMap = initMap;

document.addEventListener("DOMContentLoaded", loadGoogleMapsAPI);

const deletePolygonsBtn = document.getElementById('deletePolygons');
if (deletePolygonsBtn) {
    deletePolygonsBtn.addEventListener('click', function() {
        drawnPolygon.setMap(null);
        drawnPolygon = null;
    });
}

// Example function to display addresses
function displayAddresses(addresses) {
    const addressListElement = document.getElementById('addressList');
    addressListElement.innerHTML = ''; // Clear existing list
    addresses.forEach(address => {
        const listItem = document.createElement('li');
        listItem.textContent = `${address.key} ${address.value.latLng} ${address.value.property}`;
        addressListElement.appendChild(listItem);
    });
}

// Button click event handlers
const generateAddressListBtn = document.getElementById('generateAddressList');
if (generateAddressListBtn) {
    generateAddressListBtn.addEventListener('click', function() {
        if (!drawnPolygon) {
            alert("Please define an area first.");
            return;
        }

        let points = generateCoordinateMatrix(drawnPolygon);

        // Assuming points is the array of coordinates generated earlier
        // Assuming map is the instance of Google Maps

        drawPointsOnMap(points, map);

        if (promptUserBeforeFetching(points)) {
            // User chooses to continue, start batch querying addresses
            fetchAddresses(geocoder, points).then(addresses => {
                // Process the queried addresses
                displayAddresses(addresses); // Display the address list
            });
        } else {
            // User chooses to cancel
            console.log('User cancelled the query.');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const showCirclesButton = document.getElementById('showCirclesButton');
    if (showCirclesButton) {
        showCirclesButton.addEventListener('click', function() {
            if (!drawnPolygon) {
                alert("Please define an area first.");
                return;
            }
        
            let points = generateCoordinateMatrix(drawnPolygon);
            drawPointsOnMap(points, map);
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const clearCirclesButton = document.getElementById('clearCirclesButton');
    if (clearCirclesButton) {
        clearCirclesButton.addEventListener('click', function() {
            clearDrawnCircles();
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const downloadDataButton = document.getElementById('downloadDataButton');
    if (downloadDataButton) {
        downloadDataButton.addEventListener('click', async function() {
            // Assuming data is the data you need to download, here you need to get or generate these data according to the actual situation
            const csvContent = generateCSV(addressDetails);
            downloadCSV(csvContent);
        });
    }
});

// Set button click event listeners
document.addEventListener('DOMContentLoaded', () => {
    const showButton = document.getElementById('showDeliverableAddressesButton');
    if (showButton) {
        showButton.addEventListener('click', function() {
            showDeliverableAddresses(map, addressDetails);
        });
    }
});
