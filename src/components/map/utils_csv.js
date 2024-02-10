function generateCSV(addressDetails) {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Address,Coordinates,Property\n"; // CSV header

    addressDetails.forEach((value, key) => {
        // Note: Here it is assumed that the property value is a number, it should be converted to the corresponding string according to the actual situation
        const propertyMap = {1: "Deliverable", 2: "No Junk Mail", 3: "Under Construction", 4: "Undeliverable"};
        const propertyString = propertyMap[value.property] || "NA";
        const row = `"${key}","${value.latLng}",${propertyString}`;
        csvContent += row + "\n";
    });

    return csvContent;
}

function downloadCSV(csvContent, fileName = "report.csv") {
    // Convert CSV string to Blob
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    // Create a hidden download link
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.setAttribute("download", fileName);
    document.body.appendChild(downloadLink);

    // Trigger download
    downloadLink.click();

    // Cleanup
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);
}

export { generateCSV, downloadCSV };
