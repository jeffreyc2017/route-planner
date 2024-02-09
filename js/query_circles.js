let drawnCircles = []; // Used to store all drawn circles

function clearDrawnCircles() {
    drawnCircles.forEach(circle => circle.setMap(null));
    drawnCircles = [];
}

function drawPointsOnMap(points, map) {
    clearDrawnCircles();

    points.forEach(point => {
        const circle = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: map,
            center: point,
            radius: 2.5 // Assuming a value from the configuration is used here
        });
        drawnCircles.push(circle);
    });
}

export { drawPointsOnMap, clearDrawnCircles };
