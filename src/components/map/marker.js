import { addressDetails } from "./addresses.js";

let currentDropdown = null; // Used to track the current active dropdown menu
const no_junk_mail_icon_url = './resources/no_junk_mail.png';
const under_construction_icon_url = './resources/under_construction.png';

function handleSelection(map, geocodedAddress, geocodedLatLng, selectedIndex) {
    console.log(`Selected Property: ${geocodedAddress} ${geocodedLatLng} ${selectedIndex} `);

    let iconUrl;
    let lmap = null;
    if (selectedIndex === 1) {
        iconUrl = null;
    } else if (selectedIndex === 2) {
        lmap = map;
        iconUrl = no_junk_mail_icon_url;
    } else if (selectedIndex === 3) {
        lmap = map;
        iconUrl = under_construction_icon_url;
    } else {
        iconUrl = null;
    }

    if (addressDetails.has(geocodedAddress)) {
        const details = addressDetails.get(geocodedAddress);
        if (details.marker) {
            details.marker.setMap(null);
        }
    }

    const marker = new google.maps.Marker({
        position: geocodedLatLng,
        map: lmap,
        icon: iconUrl,
    });

    // Save the detailed information associated with the address
    addressDetails.set(geocodedAddress, { latLng: geocodedLatLng, property: selectedIndex, marker: marker });
}

function createDropdownMenu(map, address, latLng, x, y) {
    // If there is already a dropdown menu, remove it first
    if (currentDropdown) {
        document.body.removeChild(currentDropdown);
    }

    // Create a new dropdown menu
    const select = document.createElement("select");
    select.innerHTML = `
        <option value="" disabled selected>Select Property</option>
        <option value="Deliverable">Deliverable</option>
        <option value="No Junk Mail">No Junk Mail</option>
        <option value="Under Construction">Under Construction</option>
        <option value="Undeliverable">Undeliverable</option>
    `;
    select.className = "address-property-select";
    select.style.position = "absolute";
    select.style.left = `${x}px`;
    select.style.top = `${y}px`;

    select.onchange = function() {
        handleSelection(map, address, latLng, select.selectedIndex);
        document.body.removeChild(select);
        currentDropdown = null; // Reset the reference after the dropdown menu is removed
    };

    document.body.appendChild(select);
    currentDropdown = select; // Update the reference to the current active dropdown menu
}

export { createDropdownMenu };
