// pk.eyJ1Ijoia2F1bmd5YXJ6YXIiLCJhIjoiY2xwbXRnOG9xMDMyeTJqcHA5YmkzZXg1cSJ9.9EfBajjdESfl1Zn9eH5NvQ

mapboxgl.accessToken = 'pk.eyJ1Ijoia2F1bmd5YXJ6YXIiLCJhIjoiY2xwbXRnOG9xMDMyeTJqcHA5YmkzZXg1cSJ9.9EfBajjdESfl1Zn9eH5NvQ';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [28.29885817507065, -15.50317189965483], // starting position [lng, lat]
    zoom: 9, // starting zoom
});
map.addControl(new mapboxgl.FullscreenControl());

map.on('load', () => {
    map.loadImage(
        '/public/static/icon/custom_marker.png',
        (error, image) => {
            if (error) throw error;
            map.addImage('custom-marker', image);
            map.addSource('sites', {
                type: 'geojson',
                data: '/api/geoloc'
            });
            map.addLayer({
                id: 'sites',
                source: 'sites',
                type: 'symbol',
                layout: {
                    'icon-image': 'custom-marker',
                    'icon-allow-overlap': true,
                    'text-field': ['get', 'title'],
                    'text-font': [
                    'Open Sans Semibold',
                    'Arial Unicode MS Bold'
                    ],
                    'text-offset': [0, 1.25],
                    'text-anchor': 'top'
                    }
            });

            // When a click event occurs on a feature in the places layer, open a popup at the
            // location of the feature, with description HTML from its properties.
            map.on('click', 'sites', (e) => {
                // Copy coordinates array.
                const coordinates = e.features[0].geometry.coordinates.slice();
                const description = e.features[0].properties.description;
                
                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }
                
                new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML(description)
                .addTo(map);
            });

            // Change the cursor to a pointer when the mouse is over the places layer.
            map.on('mouseenter', 'sites', () => {
                map.getCanvas().style.cursor = 'pointer';
            });
                
            // Change it back to a pointer when it leaves.
            map.on('mouseleave', 'sites', () => {
                map.getCanvas().style.cursor = '';
            });
        }
    );
});  