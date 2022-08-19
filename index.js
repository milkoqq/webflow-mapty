
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
    _markers = []
    _markerStart;
    _markerInit;
    _userLng;
    _userLat

    constructor() {
        this._init()

    }

    async _init() {
        try {
            const pos = await this._getPosition()
            const { longitude: lng, latitude: lat } = pos.coords
            this._userLng = lng;
            this._userLat = lat;
            await this._loadMap(lng, lat)
            this._setInitMarker(lng, lat)
            this._map.on('click', this._setInitRoutes.bind(this))
            selectPos.addEventListener('change', this._setInitMarkerToDrag.bind(this))
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
        this._markerInit = new mapboxgl.Marker()
            .setLngLat([lng, lat])
            .setPopup(new mapboxgl.Popup({ offset: 25 }).setText('Current Position'))
            .addTo(this._map);
        const lngLat = this._markerInit.getLngLat();
        this._markers.push(this._markerInit)
        // Print the marker's longitude and latitude values in the console
        console.log(`Longitude: ${lngLat.lng}, Latitude: ${lngLat.lat}`);
    }

    _setInitRoutes(e) {

        // Get Lng/Lat positions from click on map
        let lng = e.lngLat.lng
        let lat = e.lngLat.lat

        // Set First Marker
        if (!this._markerStart) {

            this._markerStart = new mapboxgl.Marker({
                color: "#FFFFFF",
                draggable: true
            }).setLngLat([lng, lat])
                .addTo(this._map)

            inputPosEnding.value = `${lng}, ${lat.toFixed(4)}`
            this._markers.push(this._markerStart)
        }

        document.querySelector('.form').classList.remove('hidden')

        function onDragEnd() {
            // Function fires when dragging of 2nd marker stops.
            // Get Lng/Lat from Marker
            const lngLat = this._markerStart.getLngLat();
            inputPosEnding.value = `${lngLat.lng.toFixed(4)}, ${lngLat.lat.toFixed(4)}`;
        }
        this._markerStart.on('drag', onDragEnd.bind(this))

    }

    _setInitMarkerToDrag() {
        if (selectPos.value === 'dragToPos') {
            this._markerInit.setDraggable(true)
            console.log(this._markerInit.isDraggable())
        }

        if (selectPos.value === 'currentPos') {
            this._markerInit.remove()
            this._setInitMarker(this._userLng, this._userLat)
        }
    }
}

const app = new App()


