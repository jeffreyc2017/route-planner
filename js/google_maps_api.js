import { config } from "./config.js";

function loadGoogleMapsAPI() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${config.googleMapsApiKey}&callback=initMap&loading=async&libraries=drawing`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
}

export { loadGoogleMapsAPI };
