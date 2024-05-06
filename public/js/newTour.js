//! elements and variables

const newTourForm = document.querySelector('.new-tour-form');
const comboBox = document.querySelector('.select-box');
let latitude;
let longitude;
//! elements and variables

//! helper functions

//! helper functions

//! event handlers

navigator.geolocation.getCurrentPosition((position) => {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  var map = L.map('map', {
    center: [latitude, longitude],
    zoom: 13,
  });
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
  map.invalidateSize();
  var marker;
  var customMarker = L.icon({
    iconUrl: './img/pin.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });
  let tourLat;
  let tourLong;
  map.on('click', (e) => {
    if (marker) {
      map.removeLayer(marker);
    }
    // Add marker at clicked location
    marker = L.marker(e.latlng, { icon: customMarker }).addTo(map);
    // Retrieve coordinates of the marker
    tourLat = e.latlng.lat;
    tourLong = e.latlng.lng;
  });

  newTourForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!tourLat || !tourLong) return; //!Guard clause
    const formData = new FormData(newTourForm);
    const locations = [
      {
        day: formData.get('duration'),
        description: formData.get('name'),
        coordinates: [tourLat, tourLong],
      },
    ];
    formData.append('locations', JSON.stringify(locations));
    //! get the time and inject it into date

    try {
      fetch('/newTour', {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          console.log('gg good');
        })
        .catch((err) => {
          console.log('imbatakum' + err);
        });
    } catch (err) {
      console.log('imbatakum' + err);
    }
  });
});

//! event handlers

/*
#name
#diffucuilty
#duraation
#maxgroupsize
#price
#summary
#description
#cover image
#startdates
#startlocation
*/
