let drawnDeliverableCircles = []; // Used to store all drawn circles

function clearDrawnDeliverableCircles() {
    drawnDeliverableCircles.forEach(circle => circle.setMap(null));
    drawnDeliverableCircles = [];
}

function getDeliverableAddresses(addressDetails) {
    const deliverableAddresses = [];
    addressDetails.forEach((details, address) => {
        if (details.property === 1) { // Assuming property 1 represents "Deliverable"
            deliverableAddresses.push({ address, latLng: details.latLng });
        }
    });
    return deliverableAddresses;
}

// Function to display "Deliverable" addresses
function showDeliverableAddresses(map, addressDetails) {
    clearDrawnDeliverableCircles();
    let deliverableAddresses = getDeliverableAddresses(addressDetails);
    console.log(deliverableAddresses);
    deliverableAddresses.forEach(address => {
        // Create a green circle to represent "Deliverable" addresses
        const circle = new google.maps.Circle({
            strokeColor: '#00FF00',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#00FF00',
            fillOpacity: 0.35,
            map: map,
            center: address.latLng,
            radius: 2.5 // Circle size, can be adjusted as needed
        });

        drawnDeliverableCircles.push(circle);
    });
}

export { showDeliverableAddresses };
