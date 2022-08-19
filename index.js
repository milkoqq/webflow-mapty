
// DOM Elements
const selectPos = document.querySelector('.select-position')
const selectType = document.querySelector('.select-workout')
const inputPosEnding = document.querySelector('.position-ending')
const inputDistance = document.querySelector('.input-distance')
const inputDuration = document.querySelector('.input-duration')

// App Class
class App {
    _map;
    _mapZoomLevel = 15

    constructor() {
        this._init()
    }

    async _init() {
        try {
            const pos = await this._getPosition()
            const { longitude: lng, latitude: lat } = pos.coords
            await this._loadMap(lng, lat)
            this._setInitMarker(lng, lat)

        }
        catch (e) {
            console.log(e)
        }
    }

    _getPosition() {
        // Get User Coords
        return new Promise(function (resolve, reject) {
            navigator.geolocation.getCurrentPosition(resolve, reject);

        });
    };

    async _loadMap(lng, lat) {
        try {
            // Get Map with position coords.
            this._map = new mapboxgl.Map({
                accessToken: 'pk.eyJ1IjoibWlsa29xcSIsImEiOiJjbDZtZTY3encwMzM3M2JubDFncjgzM2x1In0.LnjZPWDRE_YiImykL9OeMw',
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [lng, lat], // starting position
                zoom: this._mapZoomLevel
            });

        }
        catch {
            throw new Error('Could not Initialize Map')
        }

    }

    _setInitMarker(lng, lat) {
        const marker = new mapboxgl.Marker()
            .setLngLat([lng, lat])
            .setPopup(new mapboxgl.Popup({ offset: 25 }).setText('Current Position'))
            .addTo(this._map);
        const lngLat = marker.getLngLat();
        // Print the marker's longitude and latitude values in the console
        console.log(`Longitude: ${lngLat.lng}, Latitude: ${lngLat.lat}`);
    }
}

const app = new App()


