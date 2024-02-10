import { config } from "./config.dev.js";

let addressDetails = new Map(); // Used to store addresses and their related information
let failedPoints = [];

// Assuming polygon is the polygon drawn by the user
function generateCoordinateMatrix(polygon) {
    const bounds = new google.maps.LatLngBounds();
    polygon.getPath().forEach(function(element) {
        bounds.extend(element);
    });
    const ne = bounds.getNorthEast();
    const sw = bounds.getSouthWest();

    // Calculate latitude and longitude intervals
    const latIncrement = config.pointIntervalMeters / 111320; // Approximate increase per x meters in latitude
    const lngIncrement = config.pointIntervalMeters / (111320 * Math.cos(sw.lat() * (Math.PI / 180))); // Approximate increase per x meters in longitude, considering the impact of latitude

    const points = [];

    for (let lat = sw.lat(); lat <= ne.lat(); lat += latIncrement) {
        for (let lng = sw.lng(); lng <= ne.lng(); lng += lngIncrement) {
            const point = new google.maps.LatLng(lat, lng);
            if (google.maps.geometry.poly.containsLocation(point, polygon)) {
                points.push(point);
            }
        }
    }

    return points;
}

// Prompt the user before starting the query
function promptUserBeforeFetching(points) {
    const totalPoints = points.length;
    const confirmMessage = `About to query ${totalPoints} coordinates for addresses. This may take some time. Do you want to continue?`;
    
    return confirm(confirmMessage);
}

// Function for querying an address of a single point
function geocodePoint(geocoder, point) {
    return new Promise((resolve, reject) => {
        geocoder.geocode({ 'location': point }, (results, status) => {
            if (status === google.maps.GeocoderStatus.OK && results[0]) {
                // Extract the unique coordinates corresponding to the address from the results
                const accurateLocation = results[0].geometry.location;
                // Construct the returned data structure
                const data = {
                    address: results[0].formatted_address,
                    latLng: accurateLocation, // Use the accurate coordinates returned by the API
                    property: 1
                };
                resolve(data);
            } else {
                reject('Geocoder failed due to: ' + status);
            }
        });
    });
}

async function fetchAddresses(geocoder, points) {
    addressDetails.clear();    
    const REQUEST_DELAY = 20;
    // If there are failed coordinates, query those first; otherwise, query all coordinates
    const pointsToQuery = failedPoints.length > 0 ? failedPoints : points;
    // Clear the list of failed coordinates, ready to re-record failed coordinates in this round
    failedPoints = [];

    // Set the maximum value for the progress bar
    let completedPoints = 0;
    const progressBar = document.getElementById('queryProgress');
    progressBar.max = pointsToQuery.length;
    progressBar.value = completedPoints;

    for (const point of pointsToQuery) {
        try {
            const data = await geocodePoint(geocoder, point);
            if (data) {
                // Use the address as the key to save related information into addressDetails
                addressDetails.set(data.address, { latLng: data.latLng, property: data.property });
            }
            console.log(data.address, data.LatLng, data.property);
        } catch (error) {
            console.error("Geocode failed for point", point, "with error", error);
            // Record the failed coordinates
            failedPoints.push(point);
        }

        completedPoints++;
        progressBar.value = completedPoints; // Update the progress bar
        await new Promise(resolve => setTimeout(resolve, REQUEST_DELAY));
    }

    // Convert the values of addressDetails into an array to return
    // return Array.from(addressDetails.values());
    return Array.from(addressDetails, ([key, value]) => ({ key, value }));
}

export { addressDetails, generateCoordinateMatrix, fetchAddresses, promptUserBeforeFetching };
