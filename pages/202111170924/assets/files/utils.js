//https://help.openstreetmap.org/questions/75611/transform-xy-pixel-values-into-lat-and-long

class Mercator{
    constructor(mapWidth, mapHeight){
        this.mapWidth = typeof mapWidth === "number" ? mapWidth : 256;
        this.mapHeight = typeof mapHeight === "number" ? mapHeight : 256;

        this.TILE_SIZE = 256;
        this._pixelOrigin = {x: (TILE_SIZE/2.0), y: (TILE_SIZE/2.0)};
        this._pixelsPerLonDegree = TILE_SIZE / 360.0;
        this._pixelsPerLonRadian = TILE_SIZE / (2 * Math.PI);
    }

    static bound(val, valMin, valMax){
        return Math.min(Math.max(val, valMin), valMax);
    }

    static degreesToRadians(deg){
        return deg * (Math.PI / 180);
    }

    static radiansToDegrees(rad){
        return rad / (Math.PI / 180);
    }

    fromLatLngToPoint(lat, lng){
        var point = {x: 0, y: 0};
        point.x = this._pixelOrigin.x + lng * this._pixelsPerLonDegree;

        var siny = Mercator.bound(Math.sin(Mercator.degreesToRadians(lat)), -0.9999,0.9999);

        point.y = this._pixelOrigin.y + 0.5 * Math.log((1 + siny) / (1 - siny)) *- this._pixelsPerLonRadian;

        point.x = (point.x / this.TILE_SIZE) * this.mapWidth;
        point.y = (point.y / this.TILE_SIZE) * this.mapHeight;

        return [point.x, point.y];
    }

    fromPointToLatLng(x, y){
        x = ((x % this.mapWidth) / this.mapWidth) * this.TILE_SIZE;
        y = ((y % this.mapHeight) / this.mapHeight) * this.TILE_SIZE;

        var lng = (x - this._pixelOrigin.x) / this._pixelsPerLonDegree;

        var latRadians = (y - this._pixelOrigin.y) / - this._pixelsPerLonRadian;

        var lat = Mercator.radiansToDegrees(2 * Math.atan(Math.exp(latRadians)) - Math.PI / 2);

        return [lat, lng];
    }
}

var m = new Mercator();

var [x, y] = m.fromLatLngToPoint(41.145556, -73.995);
console.log(x, y);

var [lat, lon] = m.fromPointToLatLng();
console.log(lat, lon);