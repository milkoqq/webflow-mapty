console.log('connected')

class App {
    _map;
    _mapZoomLevel = 10

    constructor() {
        this._init()
    }

    async _init() {
        try {
            const pos = await this._getPosition()
            const { longitude: lng, latitude: lat } = pos.coords
            await this._loadMap(lng, lat)

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
}

const app = new App()


