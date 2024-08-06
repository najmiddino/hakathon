document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const files = document.getElementById('fileInput').files;
    const preview = document.getElementById('preview');
    preview.innerHTML = '';

    for (const file of files) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            if (file.type.startsWith('image/')) {
                const img = document.createElement('img');
                img.src = e.target.result;
                preview.appendChild(img);
            } else if (file.type.startsWith('video/')) {
                const video = document.createElement('video');
                video.src = e.target.result;
                video.controls = true;
                preview.appendChild(video);
            }
        }

        reader.readAsDataURL(file);
    }
});
document.getElementById('sendLocationBtn').addEventListener('click', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        document.getElementById('locationOutput').innerText = "Geolocation is not supported by this browser.";
    }
});

function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Display the location coordinates
    document.getElementById('locationOutput').innerText = 
        `Latitude: ${latitude}, Longitude: ${longitude}`;

    // You can send this location to a server or another service here
    // Example: sendLocationToServer(latitude, longitude);
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById('locationOutput').innerText = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById('locationOutput').innerText = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            document.getElementById('locationOutput').innerText = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById('locationOutput').innerText = "An unknown error occurred.";
            break;
    }
}
